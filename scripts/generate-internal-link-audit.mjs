import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const outputFile = path.join(process.cwd(), "docs", "internal-link-audit-2026-08-19.csv");
const powerPages = new Set(["kosten-verkoop-huis", "woning-verkopen", "huis-verkopen-verplichtingen"]);
const moneyPages = new Set(["", "kantoor", "kosten-vastgoedmakelaar", "huis-laten-schatten", "woning-verkopen"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(file);
    return entry.name.endsWith(".mdx") ? [file] : [];
  });
}

function slugFor(file) {
  return path.relative(contentDir, file).replaceAll("\\", "/").replace(/\.mdx$/, "").replace(/\/index$/, "");
}

function csv(value) {
  return `"${String(value ?? "").replaceAll('"', '""').replace(/[\r\n]+/g, " ").trim()}"`;
}

function sentenceAt(body, index) {
  const start = Math.max(body.lastIndexOf(". ", index), body.lastIndexOf("\n", index), 0);
  const endCandidates = [body.indexOf(". ", index), body.indexOf("\n", index)].filter((value) => value >= 0);
  const end = endCandidates.length ? Math.min(...endCandidates) + 1 : body.length;
  return body.slice(start, end).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function targetType(target) {
  if (moneyPages.has(target)) return "money";
  if (["kennisbank", "huis-verkopen-verplichtingen"].includes(target)) return "hub";
  return "child";
}

const rows = [];
const duplicates = [];

for (const file of walk(contentDir)) {
  const source = slugFor(file);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const seenTargets = new Set();
  const linkPattern = /\[([^\]]+)\]\((\/[^)\s#]*)(?:#[^)]+)?\)/g;
  let match;
  while ((match = linkPattern.exec(content))) {
    const target = match[2].replace(/^\//, "").replace(/\/$/, "");
    if (seenTargets.has(target)) duplicates.push(`${source || "/"} -> /${target}`);
    seenTargets.add(target);
    const ratio = match.index / Math.max(content.length, 1);
    rows.push([
      `/${source}`.replace("//", "/"),
      `/${target}`.replace("//", "/"),
      match[1],
      sentenceAt(content, match.index),
      ratio < 0.25 ? "intro" : ratio > 0.75 ? "einde" : "midden",
      powerPages.has(source) ? "power page" : data.intent === "core" || data.type === "Service" ? "money" : "support",
      targetType(target),
      "houden",
    ]);
  }
}

const header = ["Source URL", "Target URL", "Anchor", "Context", "Plaats", "Source type", "Target type", "Actie"];
const csvBody = [header, ...rows].map((row) => row.map(csv).join(",")).join("\n") + "\n";
fs.writeFileSync(outputFile, csvBody, "utf8");

console.log(`Interne-linkaudit: ${rows.length} contextuele links in ${outputFile}`);
console.log(`Dubbele targets op dezelfde bronpagina: ${duplicates.length}`);
for (const duplicate of duplicates) console.log(`  ${duplicate}`);
