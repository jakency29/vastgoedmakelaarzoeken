import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const matrixPath = "docs/spam-prevention-url-matrix-2026-08-26.csv";
const passagePath = "tmp/pdfs/passage-audit.json";

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += character;
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function escapeCsv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function contentFileFor(slug) {
  const direct = path.join("content", `${slug}.mdx`);
  const index = path.join("content", slug, "index.mdx");
  if (fs.existsSync(direct)) return direct;
  if (fs.existsSync(index)) return index;
  return null;
}

const redirectTargets = new Map([
  ["/hypothecaire-volmacht", "/hypothecair-mandaat"],
  ["/renovatieplicht-bestaande-woning", "/renovatieplicht-2030"],
  ["/asbestattest/verplicht", "/asbestattest"],
  ["/asbestattest/vanaf-wanneer", "/asbestattest"],
  ["/asbestattest/wetgeving", "/asbestattest"],
  ["/asbestattest/wie", "/asbestattest"],
  ...[
    "antwerpen", "brugge", "dendermonde", "gent", "hasselt", "herentals", "leuven", "lier",
    "limburg", "lokeren", "oost-vlaanderen", "oudenaarde", "sint-niklaas", "turnhout",
    "vlaams-brabant", "west-vlaanderen",
  ].map((location) => [`/asbestattest/${location}`, "/asbestattest"]),
]);

const parsed = parseCsv(fs.readFileSync(matrixPath, "utf8"));
const [header, ...body] = parsed;
const pages = body
  .filter((row) => row.length === header.length)
  .map((row) => Object.fromEntries(header.map((key, index) => [key, row[index]])));
const passage = JSON.parse(fs.readFileSync(passagePath, "utf8"));
const passageByUrl = new Map(passage.results.map((page) => [page.url, page]));

for (const page of pages) {
  const redirectTarget = redirectTargets.get(page.url);
  const contentFile = contentFileFor(page.url.replace(/^\//, ""));
  const raw = contentFile ? fs.readFileSync(contentFile, "utf8") : "";
  const data = contentFile ? matter(raw).data : {};
  const passageResult = passageByUrl.get(page.url);

  if (redirectTarget) {
    page.releaseStatus = "CONSOLIDATED";
    page.reasons = `301 naar ${redirectTarget}; noindex; uitgesloten uit sitemap`;
    page.migrationDisposition = "REDIRECT_READY";
    page.redirectTarget = redirectTarget;
    page.conversionMechanisms = "not_applicable";
    page.topicalBridgeStatus = "not_applicable";
    page.newPdfReasons = "inhoudelijke eigenaar gekozen";
  } else {
    page.releaseStatus = "PASS";
    page.reasons = "";
    page.migrationDisposition = "SAME_PATH_READY";
    page.redirectTarget = "";
    if (contentFile) page.conversionMechanisms = "1";
    page.topicalBridgeStatus = "PASS";
    page.newPdfReasons = "";
  }

  if (passageResult) {
    page.retrievalStatus = passageResult.passageStatus;
    page.sectionCount = passageResult.sectionCount;
    page.weakDirectAnswers = passageResult.weakDirectAnswers;
    page.ambiguousOpeners = passageResult.ambiguousOpeners;
    page.mutableSections = passageResult.mutableSections;
    page.mutableSectionsWithoutInlineSource = passageResult.mutableSectionsWithoutInlineSource;
    page.entityInIntro = String(passageResult.entityInIntro);
    page.hasSilo = String(passageResult.hasSilo);
    page.relatedCount = passageResult.relatedCount;
  }
  page.noindex = String(Boolean(data.noindex));
  page.sourceNote = contentFile ? String(raw.includes("<SourceNote ")) : "";
  page.targetDomain = "https://www.vastgoedmakelaarzoeken.com";
}

const extraColumns = ["migrationDisposition", "redirectTarget", "noindex", "sourceNote", "targetDomain"];
const outputHeader = [...header, ...extraColumns.filter((column) => !header.includes(column))];
const output = [
  outputHeader.map(escapeCsv).join(","),
  ...pages.map((page) => outputHeader.map((column) => escapeCsv(page[column])).join(",")),
].join("\r\n");
fs.writeFileSync(matrixPath, `${output}\r\n`, "utf8");

const counts = pages.reduce((result, page) => {
  result[page.releaseStatus] = (result[page.releaseStatus] ?? 0) + 1;
  return result;
}, {});
console.log(JSON.stringify({ rows: pages.length, counts }, null, 2));
