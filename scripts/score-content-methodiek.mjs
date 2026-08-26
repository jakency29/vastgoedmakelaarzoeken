import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const MINIMUM_SCORE = 9;
const showPassing = process.argv.includes("--all");
const showIntros = process.argv.includes("--intros");

const OFFICIAL_SOURCE_HOSTS = [
  "belgium.be",
  "biv.be",
  "codex.vlaanderen.be",
  "economie.fgov.be",
  "emploi.belgique.be",
  "financien.belgium.be",
  "notaris.be",
  "ovam.vlaanderen.be",
  "statbel.fgov.be",
  "vlaanderen.be",
  "wallonie.be",
  "wikifin.be",
];

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
  return String(value ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function openingParagraph(body) {
  const lines = body.trimStart().split(/\r?\n/);
  const boundary = lines.findIndex((line) => /^##\s|^<[A-Z]/.test(line.trim()));
  return lines.slice(0, boundary === -1 ? lines.length : boundary).join("\n").trim();
}

function bodyAfterIntro(body) {
  const intro = openingParagraph(body);
  return body.slice(body.indexOf(intro) + intro.length);
}

function h2Headings(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
}

function officialSourceUrls(page) {
  const urls = [
    page.data.editorial?.sourceUrl,
    ...[...page.body.matchAll(/https?:\/\/[^\s)"]+/g)].map((match) => match[0]),
  ].filter(Boolean);

  return urls.filter((value) => {
    try {
      const hostname = new URL(value).hostname.replace(/^www\./, "");
      return OFFICIAL_SOURCE_HOSTS.some(
        (officialHost) => hostname === officialHost || hostname.endsWith(`.${officialHost}`),
      );
    } catch {
      return false;
    }
  });
}

function informationGainSignals(body) {
  return [
    /^\|.+\|$/m.test(body) ? "table" : null,
    /^\d+\.\s/m.test(body) ? "steps" : null,
    /<DecisionBox\b/.test(body) ? "decision" : null,
    /<TipBlock\b/.test(body) ? "tip" : null,
    /<(?:[A-Za-z]+Calculator|[A-Za-z]+Checklist|ContentNav)\b/.test(body)
      ? "interactive"
      : null,
  ].filter(Boolean);
}

const pages = walk(CONTENT_DIR)
  .map((file) => {
    const parsed = matter(fs.readFileSync(file, "utf8"));
    return { file, slug: slugFor(file), data: parsed.data, body: parsed.content };
  })
  .filter((page) => !page.data.noindex && !page.slug.startsWith("vastgoedkantoren/"));

const results = pages.map((page) => {
  const intro = openingParagraph(page.body);
  const introWordCount = words(intro);
  const rest = bodyAfterIntro(page.body);
  const headings = h2Headings(page.body);
  const faq = Array.isArray(page.data.faq) ? page.data.faq : [];
  const informationGain = informationGainSignals(page.body);

  const checks = [
    {
      id: "page-role",
      pass: Boolean(page.data.intent && page.data.type),
      detail: "intentie en paginatype",
    },
    {
      id: "entities",
      pass:
        Array.isArray(page.data.about) &&
        page.data.about.length > 0 &&
        Array.isArray(page.data.mentions) &&
        page.data.mentions.length > 0,
      detail: "centrale en gerelateerde entiteiten",
    },
    {
      id: "editorial-proof",
      pass: Boolean(
        page.data.updated &&
          page.data.editorial?.author &&
          page.data.editorial?.sourceLabel &&
          page.data.editorial?.sourceUrl,
      ),
      detail: "auteur, datum en herleidbare controlebron",
    },
    {
      id: "direct-intro",
      pass:
        introWordCount >= 25 &&
        introWordCount <= 100 &&
        !/\b(op deze pagina|in dit artikel|in deze gids|hier lees je|hieronder lees je)\b/i.test(
          intro,
        ) &&
        !/\]\(\//.test(intro),
      detail: `directe intro van 25 tot 100 woorden (${introWordCount})`,
    },
    {
      id: "question-structure",
      pass: headings.length >= 4 && headings.every((heading) => heading.endsWith("?")),
      detail: "minstens vier vraaggestuurde H2-koppen",
    },
    {
      id: "context-links",
      pass: (rest.match(/\]\(\//g) ?? []).length >= 1,
      detail: "contextuele interne link buiten de intro",
    },
    {
      id: "primary-source",
      pass: officialSourceUrls(page).length >= 1,
      detail: "minstens één officiële of institutionele bron",
    },
    {
      id: "faq-quality",
      pass:
        faq.length >= 5 &&
        faq.every((item) => words(item.a ?? item.answer) >= 25),
      detail: "vijf FAQ-antwoorden van minstens 25 woorden",
    },
    {
      id: "decision-aid",
      pass:
        /^\|.+\|$/m.test(page.body) ||
        /^\d+\.\s/m.test(page.body) ||
        /<(?:DecisionBox|[A-Za-z]+Checklist|[A-Za-z]+Calculator)\b/.test(page.body),
      detail: "tabel, stappenplan, beslisblok of hulpmiddel",
    },
    {
      id: "information-gain",
      pass: informationGain.length >= 2,
      detail: `minstens twee informatiegain-elementen (${informationGain.join(", ") || "geen"})`,
    },
  ];

  const failed = checks.filter((check) => !check.pass);
  return {
    slug: page.slug,
    score: checks.length - failed.length,
    ...(showIntros ? { intro } : {}),
    failed: failed.map((check) => ({ id: check.id, detail: check.detail })),
  };
});

const failing = results.filter((result) => result.score < MINIMUM_SCORE);
const scoreDistribution = Object.fromEntries(
  [...new Set(results.map((result) => result.score))]
    .sort((left, right) => right - left)
    .map((score) => [score, results.filter((result) => result.score === score).length]),
);

console.log(
  JSON.stringify(
    {
      pages: results.length,
      minimumScore: MINIMUM_SCORE,
      scoreDistribution,
      passingPages: results.length - failing.length,
      failingPages: failing.length,
      results: showPassing ? results : failing,
    },
    null,
    2,
  ),
);

if (failing.length) process.exitCode = 1;
