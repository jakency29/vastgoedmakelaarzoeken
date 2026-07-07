// Datalaag voor woningen (listings). Data in src/data/woningen.json, gegenereerd door
// scripts/import-weinvest.py. Later te vervangen door een feed-import.

import raw from "@/data/woningen.json";

export type Woning = {
  id: string;
  kantoorSlug: string;
  transactie: string; // "te-koop" | "te-huur"
  type: string; // weergavenaam, bijv. "Huis"
  typeUID: string;
  titel: string;
  adres: string;
  gemeente: string;
  gemeenteSlug: string;
  postcode: string;
  provincie: string;
  provincieSlug: string;
  prijs: number | null;
  bewoonbaar: number | null;
  grond: number | null;
  slaapkamers: number | null;
  gevels: number | null;
  bouwjaar: number | null;
  staat: string;
  parkeerplaatsen: number;
  epcLabel: string | null;
  epcVerbruik: number | null;
  epcCode: string | null;
  renovatieplicht: boolean | null;
  kadastraalInkomen: number | null;
  bestemming: string;
  overstroming: string;
  vergunning: boolean;
  indeling: { label: string; aantal: number; opp: number | null }[];
  eigenschappen: string[];
  troeven: string[];
  geoLat: number | null;
  geoLng: number | null;
  beschrijving: string;
  fotos: string[];
  bron: string;
  slug: string;
};

export const woningen = raw as unknown as Woning[];

export function getWoningBySlug(slug: string): Woning | undefined {
  return woningen.find((w) => w.slug === slug);
}

export function woningenInProvincie(provincieSlug: string): Woning[] {
  return woningen.filter((w) => w.provincieSlug === provincieSlug);
}

export function woningenInGemeente(provincieSlug: string, gemeenteSlug: string): Woning[] {
  return woningen.filter((w) => w.provincieSlug === provincieSlug && w.gemeenteSlug === gemeenteSlug);
}

type Telling = { naam: string; slug: string; count: number };

export function provincies(): Telling[] {
  const m = new Map<string, Telling>();
  for (const w of woningen) {
    const e = m.get(w.provincieSlug) ?? { naam: w.provincie, slug: w.provincieSlug, count: 0 };
    e.count++;
    m.set(w.provincieSlug, e);
  }
  return [...m.values()].sort((a, b) => a.naam.localeCompare(b.naam));
}

export function gemeenten(provincieSlug: string): Telling[] {
  const m = new Map<string, Telling>();
  for (const w of woningenInProvincie(provincieSlug)) {
    const e = m.get(w.gemeenteSlug) ?? { naam: w.gemeente, slug: w.gemeenteSlug, count: 0 };
    e.count++;
    m.set(w.gemeenteSlug, e);
  }
  return [...m.values()].sort((a, b) => a.naam.localeCompare(b.naam));
}

// Categorieen: elk een eigen URL-tak (/huis-te-koop, /appartement-te-koop).
export const CATEGORIES = [
  { key: "huis", prefix: "huis-te-koop", label: "Huis te koop", meervoud: "Huizen", types: ["house"] as string[] },
  { key: "appartement", prefix: "appartement-te-koop", label: "Appartement te koop", meervoud: "Appartementen", types: ["apartment", "flat_studio"] as string[] },
] as const;
export type Categorie = (typeof CATEGORIES)[number];

export function getCategorie(prefix: string): Categorie | undefined {
  return CATEGORIES.find((c) => c.prefix === prefix);
}
export function woningenVoor(cat: Categorie): Woning[] {
  return woningen.filter((w) => cat.types.includes(w.typeUID));
}
// Categorieen die effectief panden bevatten (voor de dynamische navigatie).
export function actieveCategorieen(): Categorie[] {
  return CATEGORIES.filter((c) => woningenVoor(c).length > 0);
}
function tellingenVan(list: Woning[], slugKey: "provincieSlug" | "gemeenteSlug", naamKey: "provincie" | "gemeente"): Telling[] {
  const m = new Map<string, Telling>();
  for (const w of list) {
    const e = m.get(w[slugKey]) ?? { naam: w[naamKey], slug: w[slugKey], count: 0 };
    e.count++;
    m.set(w[slugKey], e);
  }
  return [...m.values()].sort((a, b) => a.naam.localeCompare(b.naam));
}
export function provinciesVoor(cat: Categorie): Telling[] {
  return tellingenVan(woningenVoor(cat), "provincieSlug", "provincie");
}
export function gemeentenVoor(cat: Categorie, provincieSlug: string): Telling[] {
  return tellingenVan(woningenVoor(cat).filter((w) => w.provincieSlug === provincieSlug), "gemeenteSlug", "gemeente");
}
export function woningenGemeenteVoor(cat: Categorie, provincieSlug: string, gemeenteSlug: string): Woning[] {
  return woningenVoor(cat).filter((w) => w.provincieSlug === provincieSlug && w.gemeenteSlug === gemeenteSlug);
}

export function formatPrijs(n: number | null): string {
  if (!n) return "Prijs op aanvraag";
  return "€ " + n.toLocaleString("nl-BE");
}

export function formatOpp(n: number | null): string {
  return n ? `${Math.round(n)} m2` : "";
}
