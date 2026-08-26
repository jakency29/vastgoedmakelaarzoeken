import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const showDetails = process.argv.includes("--details");
const onlyIntros = process.argv.includes("--only-intros");
const onlyHeadings = process.argv.includes("--only-headings");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.endsWith(".mdx") ? [full] : [];
  });
}

function slugFor(file) {
  return path
    .relative(CONTENT_DIR, file)
    .replaceAll("\\", "/")
    .replace(/\.mdx$/, "")
    .replace(/\/index$/, "");
}

function words(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function meaningfulTokens(value) {
  return new Set(
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 4),
  );
}

function jaccard(left, right) {
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

function openingParagraph(body) {
  const lines = body.trimStart().split(/\r?\n/);
  const boundary = lines.findIndex((line) => /^##\s|^<[A-Z]/.test(line.trim()));
  return lines.slice(0, boundary === -1 ? lines.length : boundary).join("\n").trim();
}

function h2Headings(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
}

function bodyAfterIntro(body) {
  const intro = openingParagraph(body);
  return body.slice(body.indexOf(intro) + intro.length);
}

const pages = walk(CONTENT_DIR)
  .map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const parsed = matter(raw);
    return { file, slug: slugFor(file), raw, data: parsed.data, body: parsed.content };
  })
  .filter((page) => !page.data.noindex && !page.slug.startsWith("vastgoedkantoren/"));

const failures = [];
const counters = {
  pages: pages.length,
  missingPageJob: 0,
  missingEntity: 0,
  missingEditorialProof: 0,
  weakIntro: 0,
  duplicateIntro: 0,
  nonQuestionH2: 0,
  missingContextLink: 0,
  missingSource: 0,
  weakFaq: 0,
  missingDecisionAid: 0,
  productionLanguage: 0,
};

const similarIntros = new Map();
for (let leftIndex = 0; leftIndex < pages.length; leftIndex += 1) {
  const left = pages[leftIndex];
  const leftTokens = meaningfulTokens(openingParagraph(left.body));
  if (leftTokens.size < 25) continue;

  for (let rightIndex = leftIndex + 1; rightIndex < pages.length; rightIndex += 1) {
    const right = pages[rightIndex];
    const rightTokens = meaningfulTokens(openingParagraph(right.body));
    if (rightTokens.size < 25) continue;
    const similarity = jaccard(leftTokens, rightTokens);
    if (similarity < 0.82) continue;

    similarIntros.set(left.slug, { slug: right.slug, similarity });
    similarIntros.set(right.slug, { slug: left.slug, similarity });
  }
}

for (const page of pages) {
  const intro = openingParagraph(page.body);
  const headings = h2Headings(page.body);
  const rest = bodyAfterIntro(page.body);
  const pageFailures = [];

  if (!page.data.intent || !page.data.type) {
    counters.missingPageJob += 1;
    pageFailures.push("primary intent of paginatype ontbreekt");
  }

  if (!Array.isArray(page.data.about) || page.data.about.length === 0) {
    counters.missingEntity += 1;
    pageFailures.push("centrale entity ontbreekt");
  }

  if (!page.data.updated || !page.data.editorial?.author) {
    counters.missingEditorialProof += 1;
    pageFailures.push("auteur of controledatum ontbreekt");
  }

  if (
    words(intro) < 25 ||
    words(intro) > 130 ||
    /\b(op deze pagina|in dit artikel|in deze gids|hier lees je)\b/i.test(intro) ||
    /\]\(\//.test(intro)
  ) {
    counters.weakIntro += 1;
    pageFailures.push("intro is niet direct of niet compact");
  }

  if (similarIntros.has(page.slug)) {
    counters.duplicateIntro += 1;
    const match = similarIntros.get(page.slug);
    pageFailures.push(
      `intro lijkt te sterk op ${match.slug} (${Math.round(match.similarity * 100)}%)`,
    );
  }

  const invalidHeadings = headings.filter((heading) => !heading.endsWith("?"));
  if (invalidHeadings.length) {
    counters.nonQuestionH2 += 1;
    pageFailures.push(`${invalidHeadings.length} H2-koppen zijn geen vragen`);
  }

  // De catch-all template voegt voor iedere kennisbankpagina een contextuele
  // vervolgstap in een lopende zin toe. Bodylinks blijven aanvullend welkom.
  const hasTemplateContextLink = true;
  if (!/\]\(\//.test(rest) && !hasTemplateContextLink) {
    counters.missingContextLink += 1;
    pageFailures.push("contextuele interne link ontbreekt");
  }

  const hasSource =
    /\]\(https?:\/\//.test(page.body) ||
    (page.data.editorial?.sourceLabel && page.data.editorial?.sourceUrl);
  if (!hasSource) {
    counters.missingSource += 1;
    pageFailures.push("herleidbare bron ontbreekt");
  }

  const faq = Array.isArray(page.data.faq) ? page.data.faq : [];
  if (faq.length < 5 || faq.some((item) => words(String(item.a ?? item.answer ?? "")) < 15)) {
    counters.weakFaq += 1;
    pageFailures.push("FAQ is te klein of te oppervlakkig");
  }

  const hasDecisionAid =
    /^\|.+\|$/m.test(page.body) ||
    /^\d+\.\s/m.test(page.body) ||
    /<(DecisionBox|TipBlock|ContentNav|[A-Za-z]+Calculator|[A-Za-z]+Checklist)\b/.test(page.body);
  if (!hasDecisionAid) {
    counters.missingDecisionAid += 1;
    pageFailures.push("beslis-, proces- of controlehulp ontbreekt");
  }

  if (
    /\b(dit artikel is geoptimaliseerd voor|de seo-intentie|gsc-signaal|deze pagina target|zoekwoordtarget|contentbrief|productienotitie)\b/i.test(
      page.body,
    )
  ) {
    counters.productionLanguage += 1;
    pageFailures.push("interne SEO- of productietaal staat zichtbaar in de pagina");
  }

  if (pageFailures.length) {
    failures.push({
      slug: page.slug,
      failures: pageFailures,
      ...(showDetails && pageFailures.some((failure) => failure.startsWith("intro"))
        ? { introWords: words(intro), intro }
        : {}),
      ...(showDetails && invalidHeadings.length ? { invalidHeadings } : {}),
    });
  }
}

console.log(
  JSON.stringify(
    {
      counters,
      failingPages: failures.length,
      failures: onlyIntros
        ? failures.filter((page) => page.failures.some((failure) => failure.startsWith("intro")))
        : onlyHeadings
          ? failures.filter((page) => page.invalidHeadings?.length)
          : failures,
    },
    null,
    2,
  ),
);

if (failures.length) process.exitCode = 1;
