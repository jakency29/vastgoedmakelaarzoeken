// JSON-LD builders. Globaal: Organization + WebSite. Per pagina: WebPage/Article/Service,
// BreadcrumbList en FAQPage. Volgt de structured-data-regels uit de SEO-playbook.

import { site, absoluteUrl } from "./site";
import type { ContentPage, Entity } from "./types";

const ORG_ID = `${site.domain}/#organization`;
const WEBSITE_ID = `${site.domain}/#website`;
const OWNER_ORG_ID = `${site.owner.url}/#organization`;
const AUTHOR_ID = `${absoluteUrl(site.author.path)}#person`;

export function ownerOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": OWNER_ORG_ID,
    name: site.owner.name,
    legalName: site.owner.legalName,
    url: site.owner.url,
    taxID: site.owner.enterpriseNumber,
    vatID: site.owner.vatID,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.owner.streetAddress,
      postalCode: site.owner.postalCode,
      addressLocality: site.owner.addressLocality,
      addressCountry: site.owner.addressCountry,
    },
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: site.author.name,
    url: absoluteUrl(site.author.path),
    image: absoluteUrl(site.author.image),
    sameAs: [site.author.profileUrl, site.author.linkedinUrl],
    jobTitle: site.author.jobTitle,
    worksFor: { "@id": OWNER_ORG_ID },
    knowsAbout: [
      "Zoekmachineoptimalisatie",
      "Generative Engine Optimization",
      "Websitearchitectuur",
      "Leadgeneratie",
      "Vastgoedcontent voor Belgische eigenaars",
    ],
  };
}

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
    email: site.email,
    parentOrganization: { "@id": OWNER_ORG_ID },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      availableLanguage: ["nl"],
      areaServed: ["BE"],
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Vlaanderen" },
      { "@type": "AdministrativeArea", name: "Brussels Hoofdstedelijk Gewest" },
    ],
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
    copyrightHolder: { "@id": OWNER_ORG_ID },
  };
}

// Globale graph in de root layout (1 script-tag site-wide).
export function globalGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ownerOrganizationSchema(),
      organizationSchema(),
      websiteSchema(),
      personSchema(),
    ],
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
      author: { "@id": AUTHOR_ID },
      publisher: { "@id": ORG_ID },
      ...(page.image ? { image: absoluteUrl(page.image) } : {}),
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

// Een uitgebreide gids kan tegelijk een zichtbare bemiddelingsdienst beschrijven.
// Het Article blijft dan de pagina-entiteit en de Service krijgt een eigen identiteit.
function supplementalServiceSchema(page: ContentPage) {
  if (page.type === "Service" || !page.serviceType) return null;
  const url = absoluteUrl(`/${page.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.serviceType,
    serviceType: page.serviceType,
    description: page.description,
    url,
    broker: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "België" },
    subjectOf: { "@id": `${url}#page` },
  };
}

// Volledige per-pagina graph.
export function pageGraph(page: ContentPage) {
  const graph = [
    mainSchema(page),
    supplementalServiceSchema(page),
    breadcrumbSchema(page),
    faqSchema(page),
  ].filter(Boolean);
  return { "@context": "https://schema.org", "@graph": graph };
}

export function authorProfilePageSchema() {
  const url = absoluteUrl(site.author.path);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#page`,
    url,
    name: `${site.author.name}, auteur van de kennisbank`,
    inLanguage: site.lang,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": AUTHOR_ID },
    about: { "@id": AUTHOR_ID },
  };
}

export function aboutPageSchema() {
  const url = absoluteUrl("/over-ons");
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#page`,
    url,
    name: "Over Vastgoedmakelaar Zoeken",
    description: `Vastgoedmakelaarzoeken.com is eigendom van ${site.owner.legalName} en helpt Belgische eigenaars vastgoedinformatie en vastgoedkantoren te vergelijken.`,
    inLanguage: site.lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: [
      { "@id": ORG_ID },
      { "@id": OWNER_ORG_ID },
      { "@id": AUTHOR_ID },
    ],
  };
}
