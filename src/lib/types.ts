// Types voor de content-registry. Elke MDX-pagina heeft frontmatter volgens dit schema.

// Entiteit voor JSON-LD about/mentions (Thing met sameAs naar Wikipedia/Wikidata).
export type Entity = {
  name: string;
  sameAs?: string[];
};

export type Breadcrumb = {
  name: string;
  slug: string; // pad zonder domein, bijv. "asbestattest" of "" voor home
};

export type FaqItem = {
  q: string;
  a: string;
};

export type RelatedLink = {
  label: string;
  slug: string;
};

// Zoekintentie van de pagina (bepaalt sectievolgorde en interne links).
export type Intent = "core" | "informational" | "local";

// JSON-LD hoofdtype van de pagina.
export type PageType = "WebPage" | "Article" | "Service";

export type PageFrontmatter = {
  title: string; // <title>, max ~60 tekens
  h1: string; // zichtbare H1
  description: string; // meta description, max ~155 tekens
  intent?: Intent;
  silo?: string; // hub-slug, bijv. "asbestattest"
  type?: PageType;
  updated?: string; // ISO datum (dateModified)
  published?: string; // ISO datum (datePublished, voor Article)
  about?: Entity[]; // hoofdentiteit(en)
  mentions?: Entity[]; // bijkomende entiteiten
  breadcrumbs?: Breadcrumb[];
  faq?: FaqItem[];
  related?: RelatedLink[];
  showLeadForm?: boolean; // default true
  serviceType?: string; // enkel voor type: "Service"
  noindex?: boolean;
};

// Volledige pagina zoals geladen uit de registry (frontmatter + slug + ruwe MDX-body).
export type ContentPage = PageFrontmatter & {
  slug: string; // pad zonder domein, bijv. "asbestattest/gent"
  body: string; // MDX-body zonder frontmatter
};
