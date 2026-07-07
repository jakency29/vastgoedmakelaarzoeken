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

export function formatPrijs(n: number | null): string {
  if (!n) return "Prijs op aanvraag";
  return "€ " + n.toLocaleString("nl-BE");
}

export function formatOpp(n: number | null): string {
  return n ? `${Math.round(n)} m2` : "";
}
