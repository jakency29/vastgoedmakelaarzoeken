// Datamodel + data voor makelaars (individuele vastgoedmakelaars, Zillow-agent-stijl).
// Elke makelaar hoort bij een kantoor (kantoorSlug). Uit te breiden per kantoor in fase 2.

export type Makelaar = {
  slug: string; // voor /makelaar/<slug>
  naam: string;
  kantoorSlug: string; // koppelt naar het kantoor in kantoren.ts
  functie: string; // bijv. "Zaakvoerder en vastgoedmakelaar"
  bio: string;
  foto?: string; // lokaal pad, bijv. de headshot
  bivNummer?: string;
  telefoon?: string;
  email?: string;
};

export const makelaars: Makelaar[] = [
  {
    slug: "niels-wouters",
    naam: "Niels Wouters",
    kantoorSlug: "we-invest-demervallei",
    functie: "Zaakvoerder en vastgoedmakelaar",
    bio: "Niels Wouters is zaakvoerder en erkend vastgoedmakelaar bij We Invest Demervallei. Hij begeleidt eigenaars en kopers bij de verkoop, verhuur en schatting van vastgoed in de Demervallei, met de gemeenten Halen, Herk-de-Stad, Lummen, Beringen en Diest.",
    foto: "/afbeeldingen/kantoren/we-invest-demervallei.jpg",
    bivNummer: "514218",
    telefoon: "0488 33 81 47",
    email: "niels.wouters@weinvest.be",
  },
];

export function getMakelaar(slug: string): Makelaar | undefined {
  return makelaars.find((m) => m.slug === slug);
}

export function getMakelaarSlugs(): string[] {
  return makelaars.map((m) => m.slug);
}

// De (eerste) makelaar van een kantoor, voor de koppeling kantoor -> makelaar.
export function getMakelaarByKantoor(kantoorSlug: string): Makelaar | undefined {
  return makelaars.find((m) => m.kantoorSlug === kantoorSlug);
}
