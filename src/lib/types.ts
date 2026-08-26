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

export type EditorialInfo = {
  author?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  note?: string;
};

// Zoekintentie van de pagina (bepaalt sectievolgorde en interne links).
export type Intent = "core" | "informational" | "local";

// Visuele pagina-opbouw. Deze staat los van schema.org en beschrijft welk
// pagina-element voor de bezoeker centraal moet staan.
export type VisualType =
  | "commercial"
  | "service"
  | "cost"
  | "legal"
  | "process"
  | "local"
  | "guide";

// JSON-LD hoofdtype van de pagina.
export type PageType = "WebPage" | "Article" | "Service";

export type PageFrontmatter = {
  title: string; // <title>, max ~60 tekens
  h1: string; // zichtbare H1
  description: string; // meta description, max ~155 tekens
  intent?: Intent;
  visualType?: VisualType; // optionele override voor de intentiegestuurde template
  introInHeader?: boolean; // toon de vrije openingsalinea's direct onder de H1
  descriptionInHeader?: boolean; // toon de meta description onder de H1, standaard true
  answerNote?: string; // belangrijke uitzondering of toepassingscontext bij het directe antwoord
  editorial?: EditorialInfo; // zichtbare uitgever, controlebasis en redactionele toelichting
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
  showTopCta?: boolean; // default true, kan uit bij een zichtbaar zijbalkformulier
  leadFormTitle?: string; // contextuele titel voor het algemene makelaarsformulier
  leadFormDescription?: string; // contextuele uitleg boven de formuliervelden
  serviceType?: string; // enkel voor type: "Service"
  image?: string; // hoofdafbeelding voor Article/OpenGraph-schema
  headerImage?: string; // optionele illustratie rechts van H1 en intro
  headerImageAlt?: string;
  noindex?: boolean;
};

// Volledige pagina zoals geladen uit de registry (frontmatter + slug + ruwe MDX-body).
export type ContentPage = PageFrontmatter & {
  slug: string; // pad zonder domein, bijv. "asbestattest/gent"
  body: string; // MDX-body zonder frontmatter
};
