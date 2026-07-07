// Datamodel voor vastgoedkantoren (fase 2). Flexibel gehouden zodat echte kantoor-/makelaar-
// data er later in past (uit CMS, feed of database). De paginastructuur (overzicht + detail)
// werkt op deze lijst.
//
// VOORLOPIG: onderstaande entries zijn VOORBEELDEN (example: true) om de structuur te tonen.
// Vervang ze door echte kantoren zodra het makelaar/kantoor-datamodel is bepaald. Voor
// example-kantoren wordt bewust GEEN LocalBusiness/RealEstateAgent structured data uitgestuurd.

export type Kantoor = {
  slug: string; // voor /vastgoedkantoor/<slug>
  naam: string;
  gemeente: string;
  provincie: string; // weergavenaam, bijv. "Limburg"
  provincieSlug?: string; // koppelt naar /vastgoedkantoren/<provincie> indien die pagina bestaat
  intro: string;
  diensten: string[];
  regios: string[]; // gemeenten waar het kantoor actief is
  adres?: string;
  telefoon?: string;
  email?: string;
  website?: string;
  example?: boolean;
};

export const kantoren: Kantoor[] = [
  {
    slug: "voorbeeldkantoor-hasselt",
    naam: "Voorbeeldkantoor Hasselt",
    gemeente: "Hasselt",
    provincie: "Limburg",
    provincieSlug: "limburg",
    intro:
      "Voorbeeldkantoor Hasselt begeleidt eigenaars bij de verkoop, verhuur en schatting van hun woning in de regio Hasselt. Dit is een voorbeeldprofiel dat de structuur van een kantoorpagina toont.",
    diensten: ["Woning verkopen", "Woning verhuren", "Schatting", "Aankoopbegeleiding"],
    regios: ["Hasselt", "Diepenbeek", "Zonhoven", "Kortessem"],
    example: true,
  },
  {
    slug: "voorbeeldkantoor-antwerpen",
    naam: "Voorbeeldkantoor Antwerpen",
    gemeente: "Antwerpen",
    provincie: "Antwerpen",
    intro:
      "Voorbeeldkantoor Antwerpen is actief in de stad Antwerpen en de rand. Dit voorbeeldprofiel illustreert hoe een vastgoedkantoor zich op het platform presenteert.",
    diensten: ["Woning verkopen", "Appartement verhuren", "Schatting"],
    regios: ["Antwerpen", "Berchem", "Deurne", "Mortsel"],
    example: true,
  },
  {
    slug: "voorbeeldkantoor-gent",
    naam: "Voorbeeldkantoor Gent",
    gemeente: "Gent",
    provincie: "Oost-Vlaanderen",
    intro:
      "Voorbeeldkantoor Gent verkoopt en verhuurt woningen en appartementen in Gent en omgeving. Een voorbeeldprofiel ter illustratie van de kantoor-detailpagina.",
    diensten: ["Woning verkopen", "Woning verhuren", "Schatting", "Verhuurbeheer"],
    regios: ["Gent", "Merelbeke", "Destelbergen", "Sint-Martens-Latem"],
    example: true,
  },
];

export function getKantoor(slug: string): Kantoor | undefined {
  return kantoren.find((k) => k.slug === slug);
}

export function getKantoorSlugs(): string[] {
  return kantoren.map((k) => k.slug);
}
