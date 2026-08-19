// Site-brede configuratie. Pas domein/branding hier aan; alles verwijst hiernaar.

export const site = {
  name: "Vastgoedmakelaar Zoeken",
  shortName: "VastgoedmakelaarZoeken",
  domain: "https://www.vastgoedmakelaarzoeken.be",
  lang: "nl",
  locale: "nl_BE",
  region: "BE",
  email: "info@vastgoedmakelaarzoeken.be",
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
