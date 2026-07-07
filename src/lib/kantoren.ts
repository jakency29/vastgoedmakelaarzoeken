// Datamodel + data voor vastgoedkantoren. Gemigreerd van de live /kantoor/-pagina's
// (echte kantoren). Leads komen centraal binnen via het Elfsight-formulier, niet per kantoor.
// Uit te breiden met nieuwe kantoren of te koppelen aan een databron/CMS in fase 2.

export type Kantoor = {
  slug: string; // voor /kantoor/<slug>
  naam: string;
  gemeente: string;
  provincie: string;
  provincieSlug?: string; // koppelt naar /vastgoedkantoren/<provincie> indien die pagina bestaat
  intro: string;
  diensten: string[];
  regios: string[]; // gebieden/gemeenten waar het kantoor actief is
  adres?: string;
  postcode?: string;
  telefoon?: string;
  email?: string;
  website?: string;
  bivNummer?: string; // BIV-erkenningsnummer
  foto?: string; // lokaal pad onder /afbeeldingen/kantoren/
};

export const kantoren: Kantoor[] = [
  {
    slug: "hillewaere-vastgoed",
    naam: "Hillewaere Vastgoed",
    gemeente: "Turnhout",
    provincie: "Antwerpen",
    intro:
      "Hillewaere Vastgoed is een vastgoedkantoor gevestigd in Turnhout dat zich richt op de verkoop en verhuur van residentieel en professioneel vastgoed. Het kantoor is actief in de provincies Antwerpen, Limburg en Oost-Vlaanderen en biedt daarnaast nieuwbouwbegeleiding, gratis waardebepaling en advies rond investeringsvastgoed.",
    diensten: ["Verkoop en verhuur", "Nieuwbouw en ontwikkeling", "Investerings- en bedrijfsvastgoed", "Gratis waardebepaling", "Hippisch vastgoed en luxe segment"],
    regios: ["Antwerpen", "Limburg", "Oost-Vlaanderen"],
    adres: "Parklaan 46",
    postcode: "2300",
    telefoon: "014 45 10 11",
    email: "vastgoed@hillewaere.be",
    website: "https://www.hillewaere-vastgoed.be/",
    bivNummer: "501935",
    foto: "/afbeeldingen/kantoren/hillewaere-vastgoed.jpg",
  },
  {
    slug: "heylen-vastgoed",
    naam: "Heylen Vastgoed",
    gemeente: "Herentals",
    provincie: "Antwerpen",
    intro:
      "Heylen Vastgoed is een vastgoedkantoor met een vestiging aan de Grote Markt in Herentals, in de provincie Antwerpen. Het kantoor begeleidt klanten bij verkoop, verhuur, nieuwbouw, vastgoedbeheer en schatting en is actief in Vlaanderen.",
    diensten: ["Verkoop", "Verhuur", "Nieuwbouw", "Vastgoedbeheer", "Schatting", "Juridische ondersteuning"],
    regios: ["Herentals", "Antwerpen", "Vlaanderen"],
    adres: "Grote Markt 8-10",
    postcode: "2200",
    telefoon: "0800 29 223",
    email: "info@heylenvastgoed.be",
    website: "https://www.heylenvastgoed.be",
    bivNummer: "502895",
    foto: "/afbeeldingen/kantoren/heylen-vastgoed.jpg",
  },
  {
    slug: "vastgoed-michoel",
    naam: "Vastgoed Michoel",
    gemeente: "Puurs-Sint-Amands",
    provincie: "Antwerpen",
    intro:
      "Vastgoed Michoel is een erkend vastgoedkantoor in Puurs-Sint-Amands in de provincie Antwerpen. Het kantoor is actief in Puurs, Liezele, Hingene en de omliggende regio Klein-Brabant, met diensten voor verkoop, verhuur, nieuwbouw en advies.",
    diensten: ["Verkoop", "Verhuur", "Nieuwbouw", "Advies"],
    regios: ["Puurs", "Liezele", "Hingene", "Klein-Brabant", "Scheldeland"],
    adres: "Hoogstraat 35",
    postcode: "2870",
    website: "https://vastgoedmichoel.be/nl",
    bivNummer: "507422",
    foto: "/afbeeldingen/kantoren/vastgoed-michoel.jpg",
  },
  {
    slug: "immo-de-prins",
    naam: "Immo De Prins",
    gemeente: "Sint-Niklaas",
    provincie: "Oost-Vlaanderen",
    intro:
      "Immo De Prins is een vastgoedkantoor in Sint-Niklaas, in de provincie Oost-Vlaanderen. Het kantoor is actief in het Waasland met verkoop, verhuur, vastgoedbeheer en waardebepaling.",
    diensten: ["Verkoop", "Verhuur", "Vastgoedbeheer", "Advies op maat", "Waardebepaling", "Begeleiding notariele akte"],
    regios: ["Waasland", "Sint-Niklaas"],
    adres: "Mercatorstraat 64",
    postcode: "9100",
    telefoon: "03 776 06 55",
    email: "info@immodeprins.be",
    website: "https://immodeprins.be/",
    bivNummer: "200392",
    foto: "/afbeeldingen/kantoren/immo-de-prins.jpg",
  },
  {
    slug: "immo-plees",
    naam: "Immo Plees",
    gemeente: "Beringen",
    provincie: "Limburg",
    provincieSlug: "limburg",
    intro:
      "Immo Plees is een familiaal vastgoedkantoor dat actief is in de regio van Beringen tot Heusden-Zolder in de provincie Limburg. Het kantoor begeleidt klanten bij de verkoop en verhuur van woningen, appartementen en gronden en biedt een gratis waardebepaling aan.",
    diensten: ["Woning verkopen", "Verhuur", "Gratis waardebepaling", "Begeleiding projectontwikkelaars"],
    regios: ["Beringen", "Heusden-Zolder"],
    telefoon: "011 23 30 44",
    email: "info@immoplees.be",
    website: "https://immoplees.be/",
    foto: "/afbeeldingen/kantoren/immo-plees.jpg",
  },
  {
    slug: "living-stone-dilbeek",
    naam: "Living Stone Dilbeek",
    gemeente: "Dilbeek",
    provincie: "Vlaams-Brabant",
    provincieSlug: "vlaams-brabant",
    intro:
      "Living Stone Dilbeek is een vastgoedkantoor gevestigd in Dilbeek dat instaat voor de verkoop, verhuur, schatting en het beheer van vastgoed. Het kantoor is actief in Vlaams-Brabant, Brussel en het Pajottenland en begeleidt eigenaars en kopers doorheen het volledige verkoop- en verhuurtraject.",
    diensten: ["Woning verkopen", "Verhuur", "Schatting", "Rentmeesterschap", "Nieuwbouwprojecten"],
    regios: ["Dilbeek", "Vlaams-Brabant", "Brussel", "Pajottenland"],
    adres: "Astridlaan 1",
    postcode: "1700",
    telefoon: "02 466 05 75",
    website: "https://living-stone.be/nl",
    bivNummer: "509622",
  },
  {
    slug: "coga-vastgoed",
    naam: "COGA Vastgoed",
    gemeente: "Brecht",
    provincie: "Antwerpen",
    intro:
      "COGA Vastgoed is een erkend vastgoedkantoor in Brecht (Sint-Job-in-'t-Goor) in de provincie Antwerpen. Het kantoor verzorgt verkoop, verhuur en schatting van vastgoed in Brecht en de omliggende regio tussen Antwerpen en de Nederlandse grens.",
    diensten: ["Woning verkopen", "Verhuur", "Schatting", "Nieuwbouwprojecten", "Projectbegeleiding", "Juridisch advies"],
    regios: ["Brecht", "Sint-Job-in-'t-Goor", "Regio Antwerpen"],
    adres: "Eikenlei 2 B",
    postcode: "2960",
    telefoon: "03 636 47 47",
    email: "info@coga.be",
    website: "https://coga.be/",
    foto: "/afbeeldingen/kantoren/coga-vastgoed.jpg",
  },
  {
    slug: "just-wonen",
    naam: "Just Wonen",
    gemeente: "Ravels",
    provincie: "Antwerpen",
    intro:
      "Just Wonen is een vastgoedkantoor gevestigd in de Kerkstraat in Ravels, dat verkoop en verhuur van woningen combineert met verzekeringen en financieel advies. Het kantoor is actief in Ravels en Poppel en begeleidt het volledige verhuurproces, inclusief kandidaatscreening en contractbeheer.",
    diensten: ["Woning verkopen", "Verhuur", "Schatting", "Kandidaatscreening", "Contractbeheer", "Verzekeringen", "Financieel advies"],
    regios: ["Ravels", "Poppel"],
    adres: "Kerkstraat 15",
    postcode: "2380",
    telefoon: "014 65 87 11",
    email: "info@justwonen.be",
    website: "https://www.justwonen.be/",
    bivNummer: "BE1016346006",
    foto: "/afbeeldingen/kantoren/just-wonen.jpg",
  },
  {
    slug: "homerun",
    naam: "Homerun Real Estate",
    gemeente: "Grimbergen",
    provincie: "Vlaams-Brabant",
    provincieSlug: "vlaams-brabant",
    intro:
      "Homerun Real Estate is een vastgoedkantoor gevestigd in Grimbergen in Vlaams-Brabant. Het kantoor begeleidt eigenaars bij de verkoop en schatting van woningen en verzorgt onder meer asbestattesten.",
    diensten: ["Woning verkopen", "Schatting", "Asbestattest"],
    regios: ["Grimbergen"],
    adres: "Molenstraat 93",
    postcode: "1851",
    telefoon: "02 445 10 00",
    email: "contact@homerun.immo",
    website: "https://www.homerun.immo/",
    foto: "/afbeeldingen/kantoren/homerun.jpg",
  },
];

export function getKantoor(slug: string): Kantoor | undefined {
  return kantoren.find((k) => k.slug === slug);
}

export function getKantoorSlugs(): string[] {
  return kantoren.map((k) => k.slug);
}
