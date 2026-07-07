// Build-time contentcontrole. Faalt (exit 1) bij overtreding van de harde regels:
//  1. Geen em-dashes (—) of en-dashes (–) in frontmatter of body.
//  2. Title max 60 tekens, meta description max 155 tekens; verplichte frontmatter aanwezig.
//  3. Geen gebroken interne links (related-slugs en body-links moeten naar een bestaande pagina wijzen).
// Draait als "prebuild" zodat een overtreding de Vercel-build tegenhoudt.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const TITLE_MAX = 60;
const DESC_MAX = 155;
const DASH_RE = /[–—]/; // en-dash, em-dash

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

function fileToSlug(file) {
  const rel = path.relative(CONTENT_DIR, file).replace(/\\/g, "/");
  return rel.replace(/\.mdx$/, "").replace(/\/index$/, "");
}

// Normaliseer een link/slug naar een kale slug ("" = home).
function toSlug(ref) {
  return String(ref).trim().replace(/^\//, "").replace(/\/$/, "").split("#")[0];
}

const files = walk(CONTENT_DIR);
const validSlugs = new Set(files.map(fileToSlug));
validSlugs.add(""); // homepage

const errors = [];

for (const file of files) {
  const rel = path.relative(process.cwd(), file);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  if (DASH_RE.test(raw)) {
    const line = raw.split("\n").findIndex((l) => DASH_RE.test(l)) + 1;
    errors.push(`${rel}:${line} bevat een em/en-dash (verboden).`);
  }
  if (!data.title) errors.push(`${rel} mist 'title' in frontmatter.`);
  else if (data.title.length > TITLE_MAX)
    errors.push(`${rel} title is ${data.title.length} tekens (max ${TITLE_MAX}).`);
  if (!data.description) errors.push(`${rel} mist 'description' in frontmatter.`);
  else if (data.description.length > DESC_MAX)
    errors.push(`${rel} description is ${data.description.length} tekens (max ${DESC_MAX}).`);
  if (!data.h1) errors.push(`${rel} mist 'h1' in frontmatter.`);
  if (content.trim().length === 0) errors.push(`${rel} heeft een lege body.`);

  // Interne links valideren: frontmatter related + body-links naar /pad.
  const relatedSlugs = Array.isArray(data.related)
    ? data.related.map((r) => (typeof r === "string" ? r : r?.slug)).filter(Boolean)
    : [];
  for (const slug of relatedSlugs) {
    if (!validSlugs.has(toSlug(slug)))
      errors.push(`${rel} verwijst in 'related' naar onbestaande pagina '${slug}'.`);
  }
  // Markdown-links [..](/pad) en href="/pad" in de body.
  const linkRe = /\]\((\/[^)\s#]*)\)|href=["'](\/[^"'#]*)["']/g;
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    const target = toSlug(m[1] ?? m[2]);
    if (!validSlugs.has(target))
      errors.push(`${rel} bevat een gebroken interne link naar '/${target}'.`);
  }
}

if (errors.length) {
  console.error(`\nContentcontrole gefaald (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`Contentcontrole ok: ${files.length} pagina's, geen dashes, meta binnen limieten, interne links geldig.`);
