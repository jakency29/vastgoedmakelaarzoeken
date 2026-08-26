// Site-brede configuratie. De .be blijft standaard actief. Bij de domeinmigratie
// schakelt één publieke omgevingsvariabele canonicals, sitemap, robots en schema om.

const legacyDomain = "https://www.vastgoedmakelaarzoeken.be";
const configuredDomain = (process.env.NEXT_PUBLIC_SITE_URL || legacyDomain).replace(/\/+$/, "");
const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@vastgoedmakelaarzoeken.be";

if (!/^https:\/\/[^/]+$/.test(configuredDomain)) {
  throw new Error("NEXT_PUBLIC_SITE_URL moet een volledige HTTPS-oorsprong zonder pad zijn.");
}

export const site = {
  name: "Vastgoedmakelaar Zoeken",
  shortName: "VastgoedmakelaarZoeken",
  domain: configuredDomain,
  legacyDomain,
  lang: "nl",
  locale: "nl_BE",
  region: "BE",
  email: configuredEmail,
  // Korte omschrijving van de dienst. Beschrijft wat de bezoeker doet, geen beloftes.
  description:
    "Belgische vergelijkingsdienst voor eigenaars die vastgoedmakelaars in Vlaanderen en Brussel willen vergelijken voor verkoop, verhuur of waardebepaling.",
  tagline: "Vergelijk vastgoedmakelaars in jouw gemeente",
  // Officiële socialeprofielen (voedt Organization.sameAs in de structured data).
  socials: [
    "https://www.facebook.com/vastgoedmakelaarzoeken/",
    "https://www.instagram.com/vastgoedmakelaarzoeken/",
    "https://in.pinterest.com/Vastgoedmakelaarzoeken/",
  ],
  // Hoofdnavigatie (desktop + hamburger op mobiel).
  // Basis-navigatie. Listing-links worden in de layout achter deze kernroutes toegevoegd,
  // en alleen voor categorieen die effectief panden bevatten.
  nav: [
    { label: "Makelaar vergelijken", href: "/#leadform" },
    { label: "Kantoren", href: "/kantoor" },
    { label: "Woning schatten", href: "/huis-laten-schatten" },
    { label: "Woning verkopen", href: "/woning-verkopen" },
    { label: "Kennisbank", href: "/kennisbank" },
  ],
} as const;

// Absolute URL voor een intern pad ("/asbestattest" -> "https://.../asbestattest").
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.domain}${clean === "/" ? "" : clean}`;
}
