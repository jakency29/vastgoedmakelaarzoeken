// Content-registry: laadt alle MDX-pagina's onder /content en levert lookup-functies.
// Draait server-side op buildtijd (generateStaticParams, sitemap, generateMetadata).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ContentPage, PageFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Normaliseer frontmatter-varianten naar het canonieke schema. Migratie-agents schrijven
// soms faq als {question, answer}, related als {name, slug} of sameAs als string; dit
// vangt die varianten op zodat elke pagina correct rendert.
function normalize(data: Record<string, unknown>): Record<string, unknown> {
  const fm = { ...data };

  if (Array.isArray(fm.faq)) {
    fm.faq = fm.faq.map((f: Record<string, unknown>) => ({
      q: f.q ?? f.question ?? f.vraag,
      a: f.a ?? f.answer ?? f.antwoord,
    }));
  }

  if (Array.isArray(fm.related)) {
    fm.related = fm.related.map((r: unknown) =>
      typeof r === "string"
        ? { label: r, slug: r }
        : {
            label:
              (r as Record<string, unknown>).label ??
              (r as Record<string, unknown>).name ??
              (r as Record<string, unknown>).title,
            slug: (r as Record<string, unknown>).slug,
          },
    );
  }

  const fixEntities = (list: unknown) =>
    Array.isArray(list)
      ? list.map((e: Record<string, unknown>) => ({
          ...e,
          sameAs:
            typeof e.sameAs === "string" ? [e.sameAs] : e.sameAs,
        }))
      : list;
  fm.about = fixEntities(fm.about);
  fm.mentions = fixEntities(fm.mentions);

  return fm;
}

// Vind recursief alle .mdx-bestanden onder /content.
function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

// Bestandspad -> slug. content/asbestattest/gent.mdx -> "asbestattest/gent".
// content/asbestattest/index.mdx -> "asbestattest".
function fileToSlug(file: string): string {
  const rel = path.relative(CONTENT_DIR, file).replace(/\\/g, "/");
  const noExt = rel.replace(/\.mdx$/, "");
  return noExt.replace(/\/index$/, "");
}

let cache: ContentPage[] | null = null;

export function getAllPages(): ContentPage[] {
  if (cache) return cache;
  const pages = walk(CONTENT_DIR).map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const fm = normalize(data) as PageFrontmatter;
    if (!fm.title || !fm.description) {
      throw new Error(`Ontbrekende frontmatter (title/description) in ${file}`);
    }
    return { ...fm, slug: fileToSlug(file), body: content } satisfies ContentPage;
  });

  // Related-labels resolven: string-vorm related (label == slug) krijgt de titel van de
  // doelpagina als leesbare linktekst, in plaats van het ruwe slug-pad.
  const titleBySlug = new Map(pages.map((p) => [p.slug, p.title]));
  for (const p of pages) {
    if (Array.isArray(p.related)) {
      p.related = p.related.map((r) => ({
        slug: r.slug,
        label: r.label && r.label !== r.slug ? r.label : titleBySlug.get(r.slug) ?? r.label,
      }));
    }
  }

  cache = pages.sort((a, b) => a.slug.localeCompare(b.slug));
  return cache;
}

export function getPageBySlug(slug: string): ContentPage | undefined {
  return getAllPages().find((p) => p.slug === slug);
}

// Alle slugs als segment-arrays voor generateStaticParams van de catch-all route.
export function getAllSlugParams(): { slug: string[] }[] {
  return getAllPages().map((p) => ({ slug: p.slug.split("/") }));
}
