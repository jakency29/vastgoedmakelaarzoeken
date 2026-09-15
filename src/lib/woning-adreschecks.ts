import type { Woning } from "./woningen";

export type WaterScore = "A" | "B" | "C" | "D";
export type AdresCheck = {
  adres: string;
  postcode: string;
  gemeente: string;
  nagekekenOp: string;
  bron: string;
  pScore: WaterScore | null;
  gScore: WaterScore | null;
  waterToelichting: string;
  internet: {
    status: "niet-bevestigd";
    zoekinstructie: string;
    vraag: string;
  };
  vragen: { vraag: string; aanleiding: string }[];
};

export const ADRESCHECK_BRONNEN = {
  internet: "https://www.bipt-data.be/nl/projects/atlas/landline",
  waterinfo: "https://waterinfo.vlaanderen.be/informatieplicht",
  scores: "https://www.integraalwaterbeleid.be/nl/nieuws/vernieuwde-watertoets-en-informatieplicht",
};

// Bewuste proef op drie bestaande advertenties. Geen afgeleide scores of live claims.
// Internet blijft onbevestigd: de BIPT-voorwaarden zijn geen hergebruiklicentie.
export const woningAdreschecks: Record<string, AdresCheck> = {
  "170319": {
    adres: "Ulfortstraat 73",
    postcode: "3581",
    gemeente: "Beringen",
    nagekekenOp: "2026-09-15",
    bron: "https://weinvest.be/nl-BE/property/for-sale/beringen/house/170319",
    pScore: "B",
    gScore: "A",
    waterToelichting: "Het perceel en het gebouw hebben een verschillende score. De woningfiche biedt twee overstromingsrapporten aan voor de percelen 1247H en 1247K. Vraag beide op; de score van het huis beschrijft niet het volledige terrein.",
    internet: {
      status: "niet-bevestigd",
      zoekinstructie: "Zoek in de atlas op postcode 3581, kies Ulfortstraat en klik het kaartpunt bij huisnummer 73 aan.",
      vraag: "Waar komt de internetaansluiting binnen en is er bekabeling naar de ruimtes waar je wilt werken?",
    },
    vragen: [
      { vraag: "Welke delen van het terrein vallen onder elk overstromingsrapport?", aanleiding: "De fiche vermeldt een groot perceel met weiland en twee afzonderlijke rapporten. Laat de grenzen en de scores per perceel uitleggen." },
      { vraag: "Welke opbrengstgegevens en keuringsdocumenten krijg je bij de zonnepanelen?", aanleiding: "De aanbieder vermeldt 40 zonnepanelen. Vraag ook welke afspraken en documenten bij de overdracht horen." },
    ],
  },
  "170252": {
    adres: "Jeugdstraat 18",
    postcode: "3583",
    gemeente: "Beringen",
    nagekekenOp: "2026-09-15",
    bron: "https://weinvest.be/nl-BE/property/for-sale/beringen-paal/house/170252",
    pScore: "D",
    gScore: "D",
    waterToelichting: "Zowel het perceel als het gebouw staat in de woningfiche met score D. Vraag het volledige overstromingsrapport op. De aparte vermelding 'geen overstromingsgebied' in de fiche vervangt deze scores niet.",
    internet: {
      status: "niet-bevestigd",
      zoekinstructie: "Zoek in de atlas op postcode 3583, kies Jeugdstraat en klik het kaartpunt bij huisnummer 18 aan.",
      vraag: "Welke aansluiting is aanwezig en wat zijn de bevestigde upload- en downloadsnelheid op huisnummer 18?",
    },
    vragen: [
      { vraag: "Is er ooit water in de kelder gekomen en welke maatregelen zijn uitgevoerd?", aanleiding: "De aanbieder beschrijft een kelder op straatniveau. Bespreek de voorgeschiedenis en het rapport samen; een gemodelleerde kans bewijst geen eerdere waterschade." },
      { vraag: "Welke werken zijn afgerond en welke afwerking moet je nog begroten?", aanleiding: "De fiche noemt een vernieuwd dak, vloerverwarming en zonnepanelen, maar ook nog afwerking aan badkamer en toilet. Vraag facturen en keuringsverslagen op." },
    ],
  },
  "168856": {
    adres: "Guido Gezellelaan 131/1",
    postcode: "3550",
    gemeente: "Heusden-Zolder",
    nagekekenOp: "2026-09-15",
    bron: "https://weinvest.be/nl-BE/property/for-sale/heusden-zolder/apartment/168856",
    pScore: "A",
    gScore: "A",
    waterToelichting: "De woningfiche vermeldt voor perceel en gebouw score A. Dat betekent niet dat wateroverlast uitgesloten is. Laat bevestigen welke percelen en gebouwen bij het appartement en het gebruiksrecht van de tuin horen.",
    internet: {
      status: "niet-bevestigd",
      zoekinstructie: "Zoek in de atlas op postcode 3550 en Guido Gezellelaan. Controleer huisnummer 131 en laat de provider de aansluiting voor bus 1 afzonderlijk bevestigen.",
      vraag: "Heeft bus 1 een eigen aansluiting en moet een installatie via de gemeenschappelijke delen lopen?",
    },
    vragen: [
      { vraag: "Is er een nieuw EPC waarin de vernieuwde ramen en deuren zijn verwerkt?", aanleiding: "De fiche vermeldt EPC F en zegt dat latere raam- en deurwerken nog niet in dat attest staan. Een nieuw label of het effect van verdere werken is daarmee nog niet bevestigd." },
      { vraag: "Wat omvat het tuingebruiksrecht en waar loopt het recht van doorgang?", aanleiding: "De aanbieder noemt exclusief tuingebruik en doorgang voor de buur. Vraag de akte en het plan op; gebruiksrecht is niet hetzelfde als eigendom." },
    ],
  },
};

export function getWoningAdrescheck(w: Pick<Woning, "id" | "adres" | "postcode" | "gemeente">): AdresCheck | undefined {
  const check = woningAdreschecks[w.id];
  // Een gewijzigd adres of hergebruikt feed-id mag geen oud adresonderzoek krijgen.
  if (!check || check.adres !== w.adres || check.postcode !== w.postcode || check.gemeente !== w.gemeente) return undefined;
  return check;
}

export function waterScoreUitleg(score: WaterScore | null): string {
  const uitleg: Record<WaterScore, string> = {
    A: "Geen overstroming gemodelleerd.",
    B: "Kleine overstromingskans bij toekomstige klimaatverandering.",
    C: "Kleine overstromingskans in het huidige klimaat.",
    D: "Middelgrote overstromingskans in het huidige klimaat.",
  };
  return score ? uitleg[score] : "Niet bevestigd in de geraadpleegde bron.";
}

export function adrescheckDatum(datum: string): string {
  return new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${datum}T00:00:00Z`));
}
