# vastgoedmakelaarzoeken.be

Leadgeneratieplatform voor BIV-erkende vastgoedmakelaars in België, plus SEO-content over
kopen, verkopen en verhuren. Herbouw van WordPress naar Next.js (App Router), gehost op Vercel.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`, geen `tailwind.config.js`)
- Content als MDX via `next-mdx-remote`, statisch gegenereerd

## Commando's

```bash
npm run dev            # dev-server op http://localhost:3000
npm run build          # productiebuild (draait eerst check:content)
npm run check:content  # faalt op em/en-dashes en te lange title/description
npm run lint
```

## Hoe content werkt

Alle contentpagina's staan als MDX onder `content/`. Eén catch-all route
(`src/app/[...slug]/page.tsx`) rendert ze allemaal statisch; er zijn dus geen losse
pagina-bestanden per URL.

- Bestandspad bepaalt de URL: `content/asbestattest/gent.mdx` -> `/asbestattest/gent`,
  `content/asbestattest/index.mdx` -> `/asbestattest`.
- Frontmatter (zie `src/lib/types.ts`) bevat `title` (max 60), `description` (max 155),
  `h1`, breadcrumbs, faq, related en JSON-LD-velden (about/mentions/type).
- Body is MDX met custom blokken: `<TipBlock>`, `<DecisionBox>`, `<OfferteCheck>`
  (zie `src/components/mdx.tsx`).

### Nieuwe pagina toevoegen

1. Maak `content/<pad>.mdx` met volledige frontmatter en body.
2. `npm run check:content` (geen dashes, meta binnen limieten).
3. `npm run build` (de pagina verschijnt automatisch in de sitemap).

## SEO-infrastructuur

- `src/app/sitemap.ts` en `src/app/robots.ts` genereren sitemap.xml en robots.txt.
- `src/lib/jsonld.ts`: Organization + WebSite globaal, WebPage/Article/Service + breadcrumbs
  + FAQ per pagina.
- `next.config.ts`: 301-redirects voor de launch (WP -2 slugs, typo-slug).
- `scripts/check-content.mjs`: harde regels (geen dashes, meta-lengtes) die de build tegenhouden.

## Migratiestatus

Zie `content-inventory.md` voor de volledige inventaris van de 142 oude WP-URL's.
De foundation staat; de bulkmigratie van paginacontent volgt.
