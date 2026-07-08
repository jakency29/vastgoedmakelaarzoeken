// JSON-LD builders. Globaal: Organization + WebSite. Per pagina: WebPage/Article/Service,
// BreadcrumbList en FAQPage. Volgt de structured-data-regels uit de SEO-playbook.

import { site, absoluteUrl } from "./site";
import type { ContentPage, Entity } from "./types";

const ORG_ID = `${site.domain}/#organization`;
const WEBSITE_ID = `${site.domain}/#website`;

// Herbruikbare BreadcrumbList voor niet-MDX-pagina's (kantoren, overzichten).
export function breadcrumbListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: absoluteUrl(b.path),
    })),
  };
}

// Herbruikbare FAQPage (voor zichtbare FAQ op niet-MDX-pagina's).
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.domain,
    description: site.description,
    ...(site.socials?.length ? { sameAs: site.socials } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.domain,
    inLanguage: site.lang,
    publisher: { "@id": ORG_ID },
  };
}

// Globale graph in de root layout (1 script-tag site-wide).
export function globalGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  };
}

function thing(e: Entity) {
  return { "@type": "Thing", name: e.name, ...(e.sameAs ? { sameAs: e.sameAs } : {}) };
}

function breadcrumbSchema(page: ContentPage) {
  if (!page.breadcrumbs?.length) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: absoluteUrl(b.slug ? `/${b.slug}` : "/"),
    })),
  };
}

function faqSchema(page: ContentPage) {
  if (!page.faq?.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Hoofd-entiteit van de pagina (WebPage, Article of Service).
function mainSchema(page: ContentPage) {
  const url = absoluteUrl(`/${page.slug}`);
  const base = {
    "@id": `${url}#page`,
    url,
    name: page.h1 || page.title,
    description: page.description,
    inLanguage: site.lang,
    isPartOf: { "@id": WEBSITE_ID },
    ...(page.about?.length ? { about: page.about.map(thing) } : {}),
    ...(page.mentions?.length ? { mentions: page.mentions.map(thing) } : {}),
    ...(page.updated ? { dateModified: page.updated } : {}),
  };

  if (page.type === "Article") {
    return {
      "@type": "Article",
      ...base,
      mainEntityOfPage: url,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      ...(page.published ? { datePublished: page.published } : {}),
    };
  }

  if (page.type === "Service") {
    // Leadgen: het bedrijf verwijst aanvragen door -> broker, geen provider.
    return {
      "@type": "Service",
      ...base,
      ...(page.serviceType ? { serviceType: page.serviceType } : {}),
      broker: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "België" },
    };
  }

  return { "@type": "WebPage", ...base };
}

// Volledige per-pagina graph.
export function pageGraph(page: ContentPage) {
  const graph = [mainSchema(page), breadcrumbSchema(page), faqSchema(page)].filter(Boolean);
  return { "@context": "https://schema.org", "@graph": graph };
}
