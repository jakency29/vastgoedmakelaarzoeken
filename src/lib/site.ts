// Site-brede configuratie. Pas domein/branding hier aan; alles verwijst hiernaar.

export const site = {
  name: "Vastgoedmakelaar Zoeken",
  shortName: "VastgoedmakelaarZoeken",
  domain: "https://www.vastgoedmakelaarzoeken.be",
  lang: "nl",
  locale: "nl_BE",
  region: "BE",
  // Korte omschrijving van de dienst. Beschrijft wat de bezoeker doet, geen beloftes.
  description:
    "Vergelijk BIV-erkende vastgoedmakelaars in jouw gemeente. Vul je postcode in en vraag vrijblijvend offertes op.",
  tagline: "Vergelijk vastgoedmakelaars in jouw gemeente",
  // Hoofdnavigatie (desktop + hamburger op mobiel).
  nav: [
    { label: "Te koop", href: "/huis-te-koop" },
    { label: "Woning schatten", href: "/huis-laten-schatten" },
    { label: "Asbestattest", href: "/asbestattest" },
    { label: "Kantoren", href: "/kantoor" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

// Absolute URL voor een intern pad ("/asbestattest" -> "https://.../asbestattest").
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.domain}${clean === "/" ? "" : clean}`;
}
