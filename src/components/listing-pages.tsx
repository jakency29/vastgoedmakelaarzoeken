// Gedeelde render- en metadata-helpers voor de listing-takken (huis / appartement),
// zodat /huis-te-koop en /appartement-te-koop dezelfde logica delen.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  provinciesVoor,
  gemeentenVoor,
  woningenVoor,
  woningenGemeenteVoor,
  formatPrijs,
  formatOpp,
  woningHref,
  type Categorie,
  type Woning,
} from "@/lib/woningen";
import { kantoren, type Kantoor } from "@/lib/kantoren";
import { PremiumBadge } from "./PremiumBadge";
import { ListingView, type ListingFaqItem } from "./ListingView";

const HOME = { name: "Home", href: "/" };
const aantal = (n: number) => `${n} ${n === 1 ? "pand" : "panden"}`;
const slaapkamersTekst = (n: number) => `${n} ${n === 1 ? "slaapkamer" : "slaapkamers"}`;

// Enkelvoud/meervoud van een categorie ("huis"/"huizen", "appartement"/"appartementen").
function catWoord(cat: Categorie, meervoud: boolean): string {
  return meervoud ? cat.meervoud.toLowerCase() : cat.key;
}

// Natuurlijke Nederlandse opsomming: "a, b en c".
function lijstNL(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;
}

function prijsRange(lijst: Woning[]): { min: number; max: number } | null {
  const p = lijst.map((w) => w.prijs).filter((n): n is number => !!n).sort((a, b) => a - b);
  return p.length ? { min: p[0], max: p[p.length - 1] } : null;
}

function listingDescription(cat: Categorie, naam: string, lijst: Woning[]): string {
  const range = prijsRange(lijst);
  const aantalTekst = `${lijst.length} ${lijst.length === 1 ? cat.key : catWoord(cat, true)}`;
  const prijsTekst = range
    ? range.min === range.max
      ? ` met een vraagprijs van ${formatPrijs(range.min)}`
      : ` met vraagprijzen van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)}`
    : "";
  return `Bekijk ${aantalTekst} te koop in ${naam}${prijsTekst}. Vergelijk foto's, EPC, oppervlakte en aanbieder en vraag informatie aan.`.slice(0, 155);
}

function socialMetadata(title: string, description: string, path: string, lijst: Woning[]): Metadata["openGraph"] {
  return {
    type: "website",
    title,
    description,
    url: path,
    ...(lijst[0]?.fotos[0] ? { images: [{ url: lijst[0].fotos[0], alt: `${lijst[0].type} te koop in ${lijst[0].gemeente}` }] } : {}),
  };
}

// Stabiele hash op een string, voor deterministische maar per-pagina wisselende linkselectie.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

type Gids = { slug: string; anker: string };

type LocatieProfiel = {
  deelgemeenten: { naam: string; postcode: string }[];
  bron: { label: string; href: string };
  controles: { titel: string; tekst: string; label: string; href: string }[];
};

const ALGEMENE_KOOPCONTROLES: LocatieProfiel["controles"] = [
  {
    titel: "Perceel en omgeving",
    tekst: "Zoek het volledige adres in Geopunt op en bekijk het perceel en relevante kaartlagen rond de woning.",
    label: "Open Geopunt",
    href: "https://www.geopunt.be/",
  },
  {
    titel: "Overstromingsgevoeligheid",
    tekst: "Controleer op Waterinfo afzonderlijk de P-score van het perceel en de G-score van het gebouw. Beide lopen van A tot D.",
    label: "Open Waterinfo",
    href: "https://www.waterinfo.vlaanderen.be/",
  },
  {
    titel: "EPC en renovatieplicht",
    tekst: "Bij een residentiële woning met EPC-label E of F moet de nieuwe eigenaar in de regel binnen zes jaar minstens label D behalen.",
    label: "Lees de officiële renovatieregels",
    href: "https://www.vlaanderen.be/bouwen-wonen-en-energie/kopen-en-verkopen/een-huis-of-appartement-kopen/renovatieverplichting-voor-residentiele-gebouwen",
  },
];

const APPARTEMENT_KOOPCONTROLE: LocatieProfiel["controles"][number] = {
  titel: "Mede-eigendom en syndicus",
  tekst: "Vraag de basisakte, het reglement, recente notulen, gemeenschappelijke lasten en de stand van het reservefonds op.",
  label: "Bekijk de officiële uitleg over appartementsgebouwen",
  href: "https://www.vlaanderen.be/bouwen-wonen-en-energie/beheer-en-onderhoud-van-appartementsgebouwen",
};

const LOCATIEPROFIELEN: Record<string, LocatieProfiel> = {
  beringen: {
    deelgemeenten: [
      { naam: "Beringen", postcode: "3580" },
      { naam: "Beverlo", postcode: "3581" },
      { naam: "Koersel", postcode: "3582" },
      { naam: "Paal", postcode: "3583" },
    ],
    bron: {
      label: "Vlaamse overheid: Stad Beringen",
      href: "https://www.vlaanderen.be/organisaties/stad-beringen",
    },
    controles: [
      ...ALGEMENE_KOOPCONTROLES.slice(0, 2),
      {
        titel: "Vergunningen en bestemming",
        tekst: "Vraag na welke plannen, vergunningen, erfdienstbaarheden, heffingen en andere vastgoedinlichtingen bij het pand horen.",
        label: "Bekijk het VIP van Stad Beringen",
        href: "https://www.beringen.be/vastgoedinformatie-platform",
      },
      ALGEMENE_KOOPCONTROLES[2],
      {
        titel: "Sporen van mijnschade",
        tekst: "Zie je scheuren, barsten of verzakkingen, laat de oorzaak bouwkundig onderzoeken en vraag of er eerder een melding of dossier over mijnschade bestond.",
        label: "Bekijk het officiële meldpunt mijnschade",
        href: "https://www.vlaanderen.be/organisaties/administratieve-diensten-van-de-vlaamse-overheid/beleidsdomein-werk-economie-wetenschap-innovatie-landbouw-en-sociale-economie/limburgse-reconversiemaatschappij/mijnschade-en-bemaling-limburgs-mijngebied",
      },
    ],
  },
};

// Attest- en kostengidsen (voor de aankoopparagraaf). Ankertekst spiegelt de doelpagina.
const ATTEST_GIDSEN: Gids[] = [
  { slug: "huis-verkopen-verplichtingen/epc", anker: "het EPC" },
  { slug: "huis-verkopen-verplichtingen/elektriciteitskeuring", anker: "de elektrische keuring" },
  { slug: "huis-verkopen-verplichtingen/bodemattest", anker: "het bodemattest" },
  { slug: "huis-verkopen-verplichtingen/asbestattest", anker: "het asbestattest" },
  { slug: "registratierechten", anker: "de registratierechten" },
  { slug: "notariskosten-verkoop-huis", anker: "de notariskosten" },
];

// Bredere gidsen voor de "Lees ook"-sectie.
const LEESOOK_GIDSEN: Gids[] = [
  { slug: "bieden-op-een-huis", anker: "Bieden op een huis" },
  { slug: "hoeveel-spaargeld-voor-een-huis", anker: "Hoeveel spaargeld heb je nodig voor een huis?" },
  { slug: "registratierechten/eerste-woning", anker: "Registratierechten voor je eerste woning" },
  { slug: "kosten-vastgoedmakelaar", anker: "Kosten van een vastgoedmakelaar" },
  { slug: "huis-laten-schatten", anker: "Je woning laten schatten" },
  { slug: "waarde-woning-berekenen", anker: "De waarde van een woning berekenen" },
];

// Kies n gidsen uit een pool met een per-pagina offset (stride 5, coprime met 6 -> geen dubbels).
function kiesGidsen(pool: Gids[], seed: string, n: number): Gids[] {
  const start = hash(seed) % pool.length;
  return Array.from({ length: Math.min(n, pool.length) }, (_, i) => pool[(start + i * 5) % pool.length]);
}

function GidsLink({ gids }: { gids: Gids }) {
  return (
    <Link href={`/${gids.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
      {gids.anker}
    </Link>
  );
}

// Intro (macro-context) samengesteld uit de echte listings: aantal, prijzen, kenmerken, roadmap.
function introTekst(cat: Categorie, naam: string, lijst: Woning[], gemeenten?: string[]): string {
  const n = lijst.length;
  const range = prijsRange(lijst);
  const labels = [...new Set(lijst.map((w) => w.epcLabel).filter((l): l is string => !!l))].sort();
  const zinnen: string[] = [];

  if (gemeenten && gemeenten.length) {
    zinnen.push(
      `In ${naam} staan op dit moment ${n} ${catWoord(cat, true)} te koop op ons platform, verspreid over ${lijstNL(gemeenten)}.`,
    );
    if (range) {
      zinnen.push(
        range.min === range.max
          ? `De vraagprijs bedraagt ${formatPrijs(range.min)}.`
          : `De vraagprijzen lopen van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)}.`,
      );
    }
    zinnen.push(`Hieronder vind je het aanbod per gemeente, de vastgoedkantoren die actief zijn in ${naam} en waar je op let bij een aankoop.`);
    return zinnen.join(" ");
  }

  if (n === 1) {
    const w = lijst[0];
    zinnen.push(`In ${naam} staat op dit moment 1 ${catWoord(cat, false)} te koop op ons platform, met een vraagprijs van ${formatPrijs(w.prijs)}.`);
    const kenmerk: string[] = [];
    if (w.slaapkamers) kenmerk.push(slaapkamersTekst(w.slaapkamers));
    if (w.bewoonbaar) kenmerk.push(`${formatOpp(w.bewoonbaar)} bewoonbare oppervlakte`);
    if (w.epcLabel) kenmerk.push(`EPC-label ${w.epcLabel}`);
    if (kenmerk.length) zinnen.push(`De woning heeft ${lijstNL(kenmerk)}.`);
  } else {
    zinnen.push(
      range && range.min !== range.max
        ? `In ${naam} staan op dit moment ${n} ${catWoord(cat, true)} te koop op ons platform, met vraagprijzen van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)}.`
        : `In ${naam} staan op dit moment ${n} ${catWoord(cat, true)} te koop op ons platform.`,
    );
    if (labels.length) zinnen.push(`Het aanbod telt woningen met ${labels.length === 1 ? `EPC-label ${labels[0]}` : `EPC-labels ${lijstNL(labels)}`}.`);
  }
  zinnen.push(`Hieronder vind je het volledige aanbod, de vastgoedkantoren die actief zijn in ${naam} en waar je op let bij een aankoop.`);
  return zinnen.join(" ");
}

function deelgemeentenInAanbod(lijst: Woning[], profiel: LocatieProfiel): string[] {
  const postcodes = new Set(lijst.map((woning) => woning.postcode));
  return profiel.deelgemeenten.filter((deelgemeente) => postcodes.has(deelgemeente.postcode)).map((deelgemeente) => deelgemeente.naam);
}

function ruimteOppervlakte(woning: Woning, label: string): number | null {
  return woning.indeling.find((ruimte) => ruimte.label.toLowerCase() === label.toLowerCase())?.opp ?? null;
}

function maakGemeenteFaq(cat: Categorie, naam: string, lijst: Woning[], profiel?: LocatieProfiel): ListingFaqItem[] {
  const range = prijsRange(lijst);
  const deelgemeenten = profiel ? deelgemeentenInAanbod(lijst, profiel) : [];
  const renovatiepanden = lijst.filter((woning) => woning.renovatieplicht === true || woning.epcLabel === "E" || woning.epcLabel === "F");
  const aanbodWoord = lijst.length === 1 ? cat.key : catWoord(cat, true);
  const locatieAntwoord = profiel
    ? deelgemeenten.length
      ? `Het huidige aanbod op deze pagina ligt in ${lijstNL(deelgemeenten)}. De gemeente ${naam} omvat ${lijstNL(profiel.deelgemeenten.map((item) => item.naam))}. Controleer daarom op elk panddetail het volledige adres en niet alleen de gemeentenaam.`
      : `Controleer op elk panddetail het volledige adres en de postcode. Het aanbod op gemeenteniveau kan in verschillende deelgemeenten liggen.`
    : `De huidige resultaten liggen aan ${lijstNL(lijst.map((woning) => `${woning.adres}, postcode ${woning.postcode}`))}. Open het panddetail voor de volledige ligging en controleer de perceel- en omgevingsinformatie altijd op het specifieke adres.`;
  const prijsAntwoord = range
    ? range.min === range.max
      ? `De enige vermelde vraagprijs is momenteel ${formatPrijs(range.min)}. Dit is een vraagprijs van één pand en geen gemiddelde verkoopprijs voor heel ${naam}.`
      : `De actuele vraagprijzen op deze pagina lopen van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)}. Dat is de bandbreedte van het huidige platformaanbod, niet de gemiddelde woningprijs voor heel ${naam}.`
    : `Niet elk pand op deze pagina heeft een openbare vraagprijs. Open het panddetail om de beschikbare prijsinformatie te bekijken.`;
  const renovatieAntwoord = renovatiepanden.length
    ? `${renovatiepanden.map((woning) => `${woning.adres} met EPC-label ${woning.epcLabel}`).join(" en ")} vraagt extra aandacht. Voor een residentiële woning met EPC-label E of F geldt in de regel dat de nieuwe eigenaar binnen zes jaar minstens label D moet behalen. Laat de concrete toepassing vóór een bod bevestigen.`
    : `Het huidige aanbod bevat geen woning met EPC-label E of F. Controleer toch altijd het volledige EPC, de geldigheidsdatum en de overdrachtsvoorwaarden van het gekozen pand vóór je een bod doet.`;
  const documentVraag = cat.key === "appartement"
    ? `Welke documenten van de mede-eigendom vraag je op in ${naam}?`
    : `Voor welke woning in ${naam} geldt de renovatieplicht?`;
  const documentAntwoord = cat.key === "appartement"
    ? `Vraag vóór een bod minstens de basisakte, het reglement van mede-eigendom, recente notulen van de algemene vergadering, de afrekening van de gemeenschappelijke lasten en de stand van het werk- en reservekapitaal op. Controleer ook via de syndicus of er grote werken, geschillen of achterstallen zijn.`
    : renovatieAntwoord;

  return [
    {
      question: `Hoeveel ${catWoord(cat, true)} staan momenteel te koop in ${naam}?`,
      answer: `Op dit moment toont deze pagina ${lijst.length} ${aanbodWoord} te koop in ${naam}. Het aantal wordt rechtstreeks uit het beschikbare aanbod op het platform opgebouwd en kan wijzigen wanneer een pand wordt toegevoegd of verkocht.`,
    },
    { question: profiel ? `In welke deelgemeente ligt het huidige aanbod in ${naam}?` : `Op welke adressen ligt het huidige aanbod in ${naam}?`, answer: locatieAntwoord },
    { question: `Wat is de prijs van een ${cat.key} in ${naam}?`, answer: prijsAntwoord },
    { question: documentVraag, answer: documentAntwoord },
    {
      question: `Hoe vraag ik informatie of een bezoek aan voor een ${cat.key} in ${naam}?`,
      answer: cat.key === "appartement"
        ? `Open het detail van het appartement dat je interesseert. Daar vind je de aanbieder, alle beschikbare kenmerken en de knop om informatie of een bezoek aan te vragen. Vergelijk eerst prijs, EPC, woonoppervlakte, terras, gemeenschappelijke kosten en de toestand van het gebouw.`
        : `Open het detail van het pand dat je interesseert. Daar vind je de aanbieder, alle beschikbare kenmerken en de knop om informatie of een bezoek aan te vragen. Vergelijk eerst prijs, EPC, oppervlakte, perceel en staat van de woning.`,
    },
  ];
}

function maakBeringenFaq(lijst: Woning[]): ListingFaqItem[] {
  const geprijsd = lijst.filter((woning): woning is Woning & { prijs: number } => woning.prijs !== null);
  const laagste = [...geprijsd].sort((a, b) => a.prijs - b.prijs)[0];
  const hoogste = [...geprijsd].sort((a, b) => b.prijs - a.prijs)[0];
  const epcVolgorde = ["A+", "A", "B", "C", "D", "E", "F", "G"];
  const besteEpc = [...lijst]
    .filter((woning) => woning.epcLabel && epcVolgorde.includes(woning.epcLabel))
    .sort((a, b) => epcVolgorde.indexOf(a.epcLabel!) - epcVolgorde.indexOf(b.epcLabel!))[0];
  const renovatiepanden = lijst.filter((woning) => woning.renovatieplicht || woning.epcLabel === "E" || woning.epcLabel === "F");
  const paal = lijst.filter((woning) => woning.postcode === "3583").length;
  const koersel = lijst.filter((woning) => woning.postcode === "3582").length;

  return [
    {
      question: "Hoeveel huizen staan momenteel te koop in Beringen?",
      answer: `Deze pagina toont momenteel ${lijst.length} huizen te koop in Beringen. Daarvan liggen er ${paal} in Paal en ${koersel} in Koersel. Het aantal volgt het beschikbare aanbod op ons platform en kan wijzigen wanneer een woning wordt toegevoegd of verkocht.`,
    },
    {
      question: "Wat is het goedkoopste huis in Beringen op deze pagina?",
      answer: laagste
        ? `${laagste.adres} heeft momenteel de laagste vraagprijs: ${formatPrijs(laagste.prijs)}. Vergelijk die prijs wel met de staat, het EPC en de nodige werken. De laagste vraagprijs is niet automatisch de laagste totale aankoopkost.`
        : "Niet elke woning heeft een openbare vraagprijs. Open het panddetail voor de beschikbare prijsinformatie.",
    },
    {
      question: "Binnen welke prijsvork valt het huidige huizenaanbod in Beringen?",
      answer: laagste && hoogste
        ? `De actuele vraagprijzen op deze pagina lopen van ${formatPrijs(laagste.prijs)} tot ${formatPrijs(hoogste.prijs)}. Dit is de bandbreedte van deze ${lijst.length} panden en geen gemiddelde woningprijs voor de volledige gemeente Beringen.`
        : "De beschikbare panden hebben niet allemaal een openbare vraagprijs. Controleer de details per woning.",
    },
    {
      question: "Welk huis in Beringen heeft het beste EPC-label?",
      answer: besteEpc
        ? `${besteEpc.adres} heeft binnen het huidige aanbod het sterkste vermelde EPC-label: ${besteEpc.epcLabel}${besteEpc.epcVerbruik ? ` met ${besteEpc.epcVerbruik} kWh/m² per jaar` : ""}. Controleer naast het label ook het volledige attest, de installaties en het werkelijke gebruik.`
        : "Er is momenteel geen vergelijkbaar EPC-label voor de woningen op deze pagina vermeld.",
    },
    {
      question: "Voor welk huis in Beringen geldt de renovatieplicht?",
      answer: renovatiepanden.length
        ? `${renovatiepanden.map((woning) => `${woning.adres} met EPC-label ${woning.epcLabel}`).join(" en ")} valt op basis van het vermelde label onder de Vlaamse renovatieplicht. Laat de concrete verplichting, termijn en haalbare werken vóór een bod bevestigen.`
        : "Geen van de huidige woningen heeft een vermeld EPC-label E of F. Controleer het geldige EPC toch altijd vóór een bod.",
    },
    {
      question: "Hoe vraag ik een bezoek aan voor een huis in Beringen?",
      answer: "Open het panddetail van de woning die je interesseert. Daar vind je de aanbieder, foto’s, kenmerken en de contactmogelijkheid om informatie of een bezoek aan te vragen. Vraag meteen naar de beschikbaarheid en naar ontbrekende attesten of plannen.",
    },
  ];
}

function maakAanbodFaq(cat: Categorie, naam: string, lijst: Woning[], locaties: string[]): ListingFaqItem[] {
  const range = prijsRange(lijst);
  const slechteLabels = lijst.filter((woning) => woning.epcLabel === "E" || woning.epcLabel === "F");
  const aanbod = lijst.length === 1 ? cat.key : catWoord(cat, true);
  const prijsfactoren = cat.key === "appartement"
    ? "ligging, woonoppervlakte, slaapkamers, terras, verdieping, afwerking en gemeenschappelijke kosten"
    : "woningtype, ligging, woonoppervlakte, perceel, staat en EPC";
  return [
    {
      question: `Hoeveel ${catWoord(cat, true)} staan momenteel te koop in ${naam}?`,
      answer: `Op dit moment toont het platform ${lijst.length} ${aanbod} te koop in ${naam}. Dit is het beschikbare aanbod van aangesloten vastgoedkantoren en geen volledige telling van de vastgoedmarkt. Het aantal wordt automatisch aangepast wanneer woningen worden toegevoegd of niet langer beschikbaar zijn.`,
    },
    {
      question: `Wat kosten de huidige ${catWoord(cat, true)} in ${naam}?`,
      answer: range
        ? `De vraagprijzen van het huidige aanbod lopen van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)}. Deze bandbreedte beschrijft alleen de panden op deze pagina. Ze is geen gemiddelde verkoopprijs, omdat ${prijsfactoren} sterk kunnen verschillen.`
        : `Niet elk pand heeft een openbare vraagprijs. Open het panddetail voor de beschikbare prijsinformatie en controleer bij de aanbieder welke voorwaarden en bijkomende kosten bij de verkoop horen.`,
    },
    {
      question: `In welke locaties staat het huidige aanbod in ${naam}?`,
      answer: `De huidige ${catWoord(cat, true)} zijn verdeeld over ${lijstNL(locaties)}. Gebruik de locatiepagina’s om het aanbod per gebied te vergelijken. Controleer daarna op het panddetail het volledige adres, want bereikbaarheid, gebouwkenmerken en omgevingsinformatie verschillen per pand.`,
    },
    {
      question: `Welke rol speelt het EPC bij een woning in ${naam}?`,
      answer: slechteLabels.length
        ? `${slechteLabels.length} ${slechteLabels.length === 1 ? "woning heeft" : "woningen hebben"} momenteel EPC-label E of F. Bij een residentiële overdracht geldt dan in de regel de renovatieplicht tot minstens label D binnen zes jaar. Vergelijk naast het label ook het verbruik, de aanbevelingen en de geraamde werken.`
        : `Het EPC helpt om de energetische uitgangspositie van woningen te vergelijken. Bekijk naast het label ook het gemeten verbruik, de aanbevelingen en mogelijke investeringen. De afwezigheid van label E of F betekent niet dat er geen energiewerken nuttig kunnen zijn.`,
    },
    ...(cat.key === "appartement"
      ? [{
          question: `Welke informatie over de mede-eigendom heb je nodig?`,
          answer: `Vraag de basisakte, het reglement van mede-eigendom, recente notulen, de periodieke lasten en de stand van het werk- en reservekapitaal op. Informeer bij de syndicus ook naar geplande werken, lopende geschillen en eventuele achterstallen. Zo beoordeel je niet alleen het appartement, maar ook het gebouw en de gezamenlijke financiële verplichtingen.`,
        }]
      : []),
    {
      question: `Hoe vraag je informatie of een bezoek aan?`,
      answer: cat.key === "appartement"
        ? `Open het detail van het appartement dat je interesseert en gebruik daar de contactmogelijkheid van de aanbieder. Controleer vooraf prijs, EPC, woonoppervlakte, terras, gemeenschappelijke kosten en beschikbare documenten. Vraag ook of het pand nog beschikbaar is en welke bezoekmomenten mogelijk zijn.`
        : `Open het detail van de woning die je interesseert en gebruik daar de contactmogelijkheid van de aanbieder. Controleer vooraf prijs, EPC, oppervlakte, perceel, staat en beschikbare documenten. Vraag bij je bericht ook of het pand nog beschikbaar is en welke bezoekmomenten mogelijk zijn.`,
    },
  ];
}

function ListingFaq({ title, faq }: { title: string; faq?: ListingFaqItem[] }) {
  if (!faq?.length) return null;
  return (
    <section id="veelgestelde-vragen" aria-labelledby="veelgestelde-vragen-titel" className="mt-8 scroll-mt-24">
      <h2 id="veelgestelde-vragen-titel" className="text-2xl font-extrabold tracking-tight text-brand-900">{title}</h2>
      <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
        {faq.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="cursor-pointer list-none pr-6 font-bold text-brand-900 marker:content-none">{item.question}</summary>
            <p className="mt-3 leading-relaxed text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function OverzichtContent({ cat, lijst, faq }: { cat: Categorie; lijst: Woning[]; faq: ListingFaqItem[] }) {
  const provincies = provinciesVoor(cat);
  const gemeentenAantal = new Set(lijst.map((woning) => `${woning.provincieSlug}/${woning.gemeenteSlug}`)).size;
  const range = prijsRange(lijst);
  const laagste = lijst.filter((woning) => woning.prijs !== null).sort((a, b) => a.prijs! - b.prijs!)[0];
  const besteEpc = lijst
    .filter((woning) => woning.epcLabel)
    .sort((a, b) => ["A+", "A", "B", "C", "D", "E", "F", "G"].indexOf(a.epcLabel!) - ["A+", "A", "B", "C", "D", "E", "F", "G"].indexOf(b.epcLabel!))[0];
  const grootste = lijst.filter((woning) => woning.grond !== null).sort((a, b) => b.grond! - a.grond!)[0];
  const grootsteBewoonbaar = lijst.filter((woning) => woning.bewoonbaar !== null).sort((a, b) => b.bewoonbaar! - a.bewoonbaar!)[0];
  const ruimteVergelijking = cat.key === "appartement" ? grootsteBewoonbaar : grootste;

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Wat bevat het huidige {cat.key === "appartement" ? "appartementenaanbod" : "huizenaanbod"}?</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Het overzicht bevat {aantal(lijst.length)} in {gemeentenAantal} {gemeentenAantal === 1 ? "gemeente" : "gemeenten"} en {provincies.length} {provincies.length === 1 ? "provincie" : "provincies"}. De gegevens komen rechtstreeks uit de panden van de aangesloten vastgoedkantoren.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <dt className="text-sm font-bold text-slate-500">Vraagprijzen</dt>
          <dd className="mt-1 font-extrabold text-brand-900">{range ? `${formatPrijs(range.min)} tot ${formatPrijs(range.max)}` : "Niet volledig vermeld"}</dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <dt className="text-sm font-bold text-slate-500">Gemeenten met aanbod</dt>
          <dd className="mt-1 font-extrabold text-brand-900">{gemeentenAantal}</dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <dt className="text-sm font-bold text-slate-500">Provincies met aanbod</dt>
          <dd className="mt-1 font-extrabold text-brand-900">{provincies.length}</dd>
        </div>
      </dl>

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">In welke provincies staan {cat.meervoud.toLowerCase()} te koop?</h2>
      <p className="mt-3 leading-relaxed text-slate-700">Het huidige aanbod is verdeeld over de onderstaande provincies. Open een provincie om daarna per gemeente te vergelijken.</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {provincies.map((provincie) => (
          <li key={provincie.slug}>
            <Link href={`/${cat.prefix}/${provincie.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
              {cat.meervoud} in {provincie.naam}
            </Link>{" "}
            <span className="text-slate-500">({aantal(provincie.count)})</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welke {cat.key === "appartement" ? "appartementen" : "woningen"} vallen op in de huidige vergelijking?</h2>
      <p className="mt-3 leading-relaxed text-slate-700">Deze drie aanknopingspunten helpen je snel selecteren. Ze vergelijken alleen het actuele platformaanbod en vormen geen waardebepaling.</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {laagste && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-bold text-slate-500">Laagste vraagprijs</dt>
            <dd className="mt-1 font-extrabold text-brand-900"><Link href={woningHref(laagste)} className="underline underline-offset-2">{laagste.adres}</Link></dd>
            <dd className="mt-1 text-sm text-slate-700">{formatPrijs(laagste.prijs)} in {laagste.gemeente}</dd>
          </div>
        )}
        {besteEpc && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-bold text-slate-500">Sterkste EPC-label</dt>
            <dd className="mt-1 font-extrabold text-brand-900"><Link href={woningHref(besteEpc)} className="underline underline-offset-2">{besteEpc.adres}</Link></dd>
            <dd className="mt-1 text-sm text-slate-700">EPC-label {besteEpc.epcLabel} in {besteEpc.gemeente}</dd>
          </div>
        )}
        {ruimteVergelijking && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-bold text-slate-500">{cat.key === "appartement" ? "Grootste woonoppervlakte" : "Grootste perceel"}</dt>
            <dd className="mt-1 font-extrabold text-brand-900"><Link href={woningHref(ruimteVergelijking)} className="underline underline-offset-2">{ruimteVergelijking.adres}</Link></dd>
            <dd className="mt-1 text-sm text-slate-700">{formatOpp(cat.key === "appartement" ? ruimteVergelijking.bewoonbaar : ruimteVergelijking.grond)} in {ruimteVergelijking.gemeente}</dd>
          </div>
        )}
      </dl>

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Hoe vergelijk je {cat.meervoud.toLowerCase()} vóór je een bezoek aanvraagt?</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Vergelijk eerst dezelfde kenmerken en controleer daarna de officiële documenten. Gebruik het filter voor prijs, slaapkamers en EPC en lees vervolgens per pand de oppervlakte, staat en aanbieder.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
        <li>Bepaal je maximale aankoopbudget inclusief registratierechten, notariskosten en mogelijke werken.</li>
        <li>Vergelijk vraagprijs, bewoonbare oppervlakte, aantal slaapkamers en {cat.key === "appartement" ? "buitenruimte" : "perceel"}.</li>
        <li>Controleer EPC, elektrische keuring, bodemattest en, indien van toepassing, asbestattest.</li>
        {cat.key === "appartement" && <li>Vraag de basisakte, gemeenschappelijke kosten, recente notulen en informatie over het reservefonds op.</li>}
        <li>Open het panddetail en vraag de aanbieder naar beschikbaarheid en ontbrekende documenten.</li>
      </ol>
      <p className="mt-4 leading-relaxed text-slate-700">
        Bereid je budget voor met de gids over <Link href="/hoeveel-spaargeld-voor-een-huis" className="font-medium text-brand-700 underline underline-offset-2">spaargeld voor een woning</Link> en lees welke aandachtspunten bij <Link href="/bieden-op-een-huis" className="font-medium text-brand-700 underline underline-offset-2">een bod op vastgoed</Link> horen.
      </p>
      <ListingFaq title={`Welke vragen worden vaak gesteld over ${catWoord(cat, true)} te koop?`} faq={faq} />
    </>
  );
}

function mediaan(getallen: number[]): number | null {
  if (!getallen.length) return null;
  const gesorteerd = [...getallen].sort((a, b) => a - b);
  const midden = Math.floor(gesorteerd.length / 2);
  return gesorteerd.length % 2 === 0 ? (gesorteerd[midden - 1] + gesorteerd[midden]) / 2 : gesorteerd[midden];
}

function beringenKoopprofiel(woning: Woning): string {
  switch (woning.id) {
    case "167846":
      return "Instapklaar wonen met het laagste energieverbruik";
    case "167717":
      return "Veel woonruimte met EPC-label B";
    case "166222":
      return "Renoveren op het laagste instapbudget";
    case "164125":
      return "Groot perceel met extra comfort";
    default:
      return woning.renovatieplicht ? "Renovatiekans" : "Vergelijken op ligging en kenmerken";
  }
}

function BeringenHuisContent({
  lijst,
  kantorenLijst,
  profiel,
  alternatieven,
  faq,
}: {
  lijst: Woning[];
  kantorenLijst: Kantoor[];
  profiel: LocatieProfiel;
  alternatieven: { naam: string; slug: string; count: number }[];
  faq: ListingFaqItem[];
}) {
  const geprijsd = lijst.filter((woning): woning is Woning & { prijs: number } => woning.prijs !== null);
  const mediaanVraagprijs = mediaan(geprijsd.map((woning) => woning.prijs));
  const bekendeOppervlakte = lijst.filter(
    (woning): woning is Woning & { prijs: number; bewoonbaar: number } => woning.prijs !== null && woning.bewoonbaar !== null,
  );
  const energiezuinig = lijst.filter((woning) => woning.epcLabel === "A" || woning.epcLabel === "B");
  const renovatiepanden = lijst.filter((woning) => woning.renovatieplicht || woning.epcLabel === "E" || woning.epcLabel === "F");
  const deelgemeenten = profiel.deelgemeenten.map((deelgemeente) => ({
    ...deelgemeente,
    woningen: lijst.filter((woning) => woning.postcode === deelgemeente.postcode),
  }));

  return (
    <>
      <section aria-labelledby="actueel-aanbod-beringen">
        <h2 id="actueel-aanbod-beringen" className="text-2xl font-extrabold tracking-tight text-brand-900">Welke huizen staan nu te koop in Beringen?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Op deze pagina staan momenteel {aantal(lijst.length)} in Beringen: {lijstNL(lijst.map((woning) => woning.adres))}. Het aanbod ligt in Paal en Koersel en varieert van een te renoveren woning tot energiezuinige, instapklare huizen.
        </p>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <caption className="sr-only">Vergelijking van het actuele huizenaanbod in Beringen</caption>
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-4 py-3 font-extrabold">Woning</th>
                <th className="px-4 py-3 font-extrabold">Vraagprijs</th>
                <th className="px-4 py-3 font-extrabold">Woonoppervlakte</th>
                <th className="px-4 py-3 font-extrabold">Vraagprijs per m²</th>
                <th className="px-4 py-3 font-extrabold">Perceel</th>
                <th className="px-4 py-3 font-extrabold">EPC</th>
                <th className="px-4 py-3 font-extrabold">Sterkste match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              {lijst.map((woning) => {
                const vraagprijsPerM2 = woning.prijs && woning.bewoonbaar ? Math.round(woning.prijs / woning.bewoonbaar) : null;
                return (
                  <tr key={woning.id}>
                    <td className="px-4 py-3">
                      <Link href={woningHref(woning)} className="font-bold text-brand-800 underline decoration-brand-300 underline-offset-2 hover:text-brand-600">
                        {woning.adres}
                      </Link>
                      <span className="mt-1 block text-xs text-slate-500">{woning.postcode === "3583" ? "Paal" : woning.postcode === "3582" ? "Koersel" : "Beringen"}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{formatPrijs(woning.prijs)}</td>
                    <td className="whitespace-nowrap px-4 py-3">{woning.bewoonbaar ? formatOpp(woning.bewoonbaar) : "Niet vermeld"}</td>
                    <td className="whitespace-nowrap px-4 py-3">{vraagprijsPerM2 ? `${formatPrijs(vraagprijsPerM2)}/m²` : "Niet berekenbaar"}</td>
                    <td className="whitespace-nowrap px-4 py-3">{woning.grond ? formatOpp(woning.grond) : "Niet vermeld"}</td>
                    <td className="px-4 py-3">{woning.epcLabel ? `Label ${woning.epcLabel}` : "Niet vermeld"}</td>
                    <td className="min-w-52 px-4 py-3">{beringenKoopprofiel(woning)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          De prijs per m² is de vraagprijs gedeeld door de vermelde bewoonbare oppervlakte. Ze is niet berekend wanneer die oppervlakte ontbreekt en is geen schatting van de marktwaarde.
        </p>
      </section>

      <section aria-labelledby="marktbeeld-beringen">
        <h2 id="marktbeeld-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Wat leert het huidige aanbod over prijs, ruimte en energie?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          De vier woningen vormen geen volledige marktmeting, maar tonen wel duidelijke verschillen die je shortlist beïnvloeden. De vraagprijs, bruikbare ruimte, energieprestatie en renovatienood wijzen niet bij elk pand in dezelfde richting.
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mediaanVraagprijs !== null && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <dt className="text-sm font-bold text-slate-500">Mediaan vraagprijs</dt>
              <dd className="mt-1 text-xl font-extrabold text-brand-900">{formatPrijs(mediaanVraagprijs)}</dd>
              <dd className="mt-1 text-xs leading-relaxed text-slate-600">Midden van de vier actuele vraagprijzen, geen gemeentegemiddelde</dd>
            </div>
          )}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-bold text-slate-500">Bekende woonoppervlakte</dt>
            <dd className="mt-1 text-xl font-extrabold text-brand-900">
              {bekendeOppervlakte.length ? `${Math.min(...bekendeOppervlakte.map((woning) => woning.bewoonbaar))} tot ${Math.max(...bekendeOppervlakte.map((woning) => woning.bewoonbaar))} m²` : "Niet bekend"}
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-slate-600">Gebaseerd op {bekendeOppervlakte.length} van de {lijst.length} panden</dd>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-bold text-slate-500">EPC-label A of B</dt>
            <dd className="mt-1 text-xl font-extrabold text-brand-900">{energiezuinig.length} van {lijst.length}</dd>
            <dd className="mt-1 text-xs leading-relaxed text-slate-600">Vergelijk ook het verbruik en de installaties per woning</dd>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-bold text-slate-500">Renovatieplicht</dt>
            <dd className="mt-1 text-xl font-extrabold text-brand-900">{renovatiepanden.length} {renovatiepanden.length === 1 ? "woning" : "woningen"}</dd>
            <dd className="mt-1 text-xs leading-relaxed text-slate-600">Controleer budget, timing en haalbaarheid vóór een bod</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="kopersprofiel-beringen">
        <h2 id="kopersprofiel-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Welk huis in Beringen past bij welk kopersprofiel?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Voortstraat 36 past het duidelijkst bij wie energiezuinig en instapklaar wil wonen, terwijl Deurnestraat 84 vooral interessant is voor wie ruimte zoekt en bewust een renovatieproject aankan. De andere twee woningen liggen tussen die profielen in of leggen het accent op perceel en comfort.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {lijst.map((woning) => (
            <article key={woning.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-bold text-accent-700">{beringenKoopprofiel(woning)}</p>
              <h3 className="mt-1 text-lg font-extrabold text-brand-900">{woning.adres}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {formatPrijs(woning.prijs)}, {woning.slaapkamers ? slaapkamersTekst(woning.slaapkamers) : "slaapkamers niet vermeld"}
                {woning.bewoonbaar ? `, ${formatOpp(woning.bewoonbaar)} woonoppervlakte` : ""}
                {woning.grond ? ` en ${formatOpp(woning.grond)} perceel` : ""}. {woning.epcLabel ? `EPC-label ${woning.epcLabel}` : "EPC niet vermeld"}
                {woning.renovatieplicht ? " en renovatieplicht" : " zonder renovatieplicht op basis van het vermelde label"}.
              </p>
              <Link href={woningHref(woning)} className="mt-3 inline-flex font-bold text-brand-700 underline underline-offset-2">
                Bekijk dit huis
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="deelgemeenten-beringen">
        <h2 id="deelgemeenten-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Kies je voor Paal, Koersel, Beverlo of Beringen?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Je kiest niet alleen voor de gemeente Beringen, maar voor een concreet adres in een van de vier deelgemeenten. Het huidige aanbod ligt voor het grootste deel in Paal en voor een kleiner deel in Koersel, terwijl er nu geen woning uit Beringen-centrum of Beverlo op deze pagina staat.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-4 py-3 font-extrabold">Deelgemeente</th>
                <th className="px-4 py-3 font-extrabold">Postcode</th>
                <th className="px-4 py-3 font-extrabold">Actueel aanbod</th>
                <th className="px-4 py-3 font-extrabold">Wat je nog controleert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              {deelgemeenten.map((deelgemeente) => (
                <tr key={deelgemeente.postcode}>
                  <td className="px-4 py-3 font-semibold text-brand-800">{deelgemeente.naam}</td>
                  <td className="px-4 py-3">{deelgemeente.postcode}</td>
                  <td className="px-4 py-3">{deelgemeente.woningen.length ? aantal(deelgemeente.woningen.length) : "Geen pand op dit moment"}</td>
                  <td className="px-4 py-3">Route op het gewenste tijdstip, voorzieningen, omgevingsgeluid en plannen rond het exacte perceel</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          De officiële gemeente-indeling is gecontroleerd via <a href={profiel.bron.href} className="font-medium text-brand-700 underline underline-offset-2">{profiel.bron.label}</a>. Het woonbeleidsplan van Stad Beringen behandelt Paal en Koersel bovendien als dorpen met een eigen karakter. Beoordeel daarom het adres en de directe omgeving, niet alleen de gemeentenaam.
        </p>
      </section>

      <section aria-labelledby="bod-controle-beringen">
        <h2 id="bod-controle-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Welke lokale gegevens controleer je vóór een bod in Beringen?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Controleer elk adres afzonderlijk in officiële bronnen voordat je een bindend bod uitbrengt. De woningadvertentie helpt bij de eerste vergelijking, maar vervangt het vastgoedinformatiedossier, de attesten en een bouwkundige beoordeling niet.
        </p>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {profiel.controles.map((controle, index) => (
            <li key={controle.href} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-bold text-accent-700">Controle {index + 1}</p>
              <h3 className="mt-1 font-extrabold text-brand-900">{controle.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{controle.tekst}</p>
              <a href={controle.href} className="mt-3 inline-block text-sm font-bold text-brand-700 underline underline-offset-2">{controle.label}</a>
            </li>
          ))}
        </ol>
        <p className="mt-4 leading-relaxed text-slate-700">
          Vergelijk bij een woning met label E of F ook de <Link href="/huis-verkopen-verplichtingen/epc" className="font-medium text-brand-700 underline underline-offset-2">EPC-gegevens en renovatieplicht</Link>. Leg vervolgens vast welke documenten of voorwaarden je nog nodig hebt voordat je <Link href="/bieden-op-een-huis" className="font-medium text-brand-700 underline underline-offset-2">een bod op het huis</Link> doet.
        </p>
      </section>

      <section aria-labelledby="shortlist-beringen">
        <h2 id="shortlist-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Hoe maak je in tien minuten een shortlist?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Begin met je totale budget en schrap daarna alleen op harde eisen. Zo vergelijk je een goedkope renovatiewoning niet alsof ze hetzelfde woonproduct is als een energiezuinige instapklare woning.
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
          <li>Reserveer naast de vraagprijs ruimte voor registratierechten, notariskosten en eventuele werken.</li>
          <li>Kies eerst tussen instapklaar wonen en renoveren, want dat bepaalt je budget en timing.</li>
          <li>Vergelijk vervolgens woonoppervlakte, perceel, EPC en ligging op dezelfde manier voor elk pand.</li>
          <li>Open de twee beste panddetails en noteer welke attesten, plannen en antwoorden nog ontbreken.</li>
          <li>Rijd de route naar werk, school of familie op een realistisch tijdstip en plan pas daarna een bezoek.</li>
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Een ruimer huis met lagere vraagprijs kan na renovatie duurder uitvallen dan een kleiner instapklaar pand. Bereken daarom vooraf <Link href="/hoeveel-spaargeld-voor-een-huis" className="font-bold text-brand-700 underline underline-offset-2">hoeveel spaargeld je voor de aankoop nodig hebt</Link>.
        </p>
      </section>

      {kantorenLijst.length > 0 && (
        <section aria-labelledby="makelaars-beringen">
          <h2 id="makelaars-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Welke vastgoedkantoren bieden huizen aan in Beringen?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            De pandkaarten koppelen elk huis aan het kantoor dat het op ons platform aanbiedt. Bekijk het kantoorprofiel om het volledige aanbod, het werkingsgebied en beschikbare contactgegevens te controleren.
          </p>
          <ul className="mt-4 space-y-2">
            {kantorenLijst.slice(0, 6).map((kantoor) => (
              <li key={kantoor.slug} className="flex flex-wrap items-center gap-2">
                <Link href={`/kantoor/${kantoor.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{kantoor.naam} in {kantoor.gemeente}</Link>
                {kantoor.premium && <PremiumBadge />}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 rounded-2xl border border-accent-300 bg-accent-50 px-5 py-4">
        <p className="font-extrabold text-brand-900">Nog geen passende woning gevonden?</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          Bekijk <Link href="/huis-te-koop/limburg" className="font-bold text-brand-700 underline underline-offset-2">alle huizen te koop in Limburg</Link> of vergelijk het aanbod in een gemeente in de buurt.
        </p>
      </div>

      {alternatieven.length > 0 && (
        <section aria-labelledby="alternatieven-beringen">
          <h2 id="alternatieven-beringen" className="mt-10 text-2xl font-extrabold tracking-tight text-brand-900">Welke gemeenten rond Beringen kun je vergelijken?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Vergelijk de beschikbare huizen in andere Limburgse gemeenten wanneer het huidige aanbod in Beringen niet past bij je budget, woonruimte of gewenste ligging.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {alternatieven.map((alternatief) => (
              <li key={alternatief.slug}>
                <Link href={`/huis-te-koop/limburg/${alternatief.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
                  Huizen te koop in {alternatief.naam}
                </Link>{" "}
                <span className="text-slate-500">({aantal(alternatief.count)})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ListingFaq title="Welke vragen worden vaak gesteld over huizen te koop in Beringen?" faq={faq} />
    </>
  );
}

// Unieke, data-gedreven content onder de listings.
function LocatieContent({
  cat,
  naam,
  seed,
  lijst,
  kantorenLijst,
  gemeenten,
  bovenliggendAanbod,
  profiel,
  provincieSlug,
  alternatieven,
  faq,
}: {
  cat: Categorie;
  naam: string;
  seed: string;
  lijst: Woning[];
  kantorenLijst: Kantoor[];
  gemeenten?: { naam: string; slug: string; count: number }[];
  bovenliggendAanbod?: { naam: string; href: string };
  profiel?: LocatieProfiel;
  provincieSlug?: string;
  alternatieven?: { naam: string; slug: string; count: number }[];
  faq?: ListingFaqItem[];
}) {
  if (cat.key === "huis" && seed === "beringen" && profiel && alternatieven && faq) {
    return <BeringenHuisContent lijst={lijst} kantorenLijst={kantorenLijst} profiel={profiel} alternatieven={alternatieven} faq={faq} />;
  }

  const attest = kiesGidsen(ATTEST_GIDSEN, seed, 2);
  const leesook = kiesGidsen(LEESOOK_GIDSEN, `${seed}-lees`, 3);
  const teRenoveren = lijst.filter((w) => w.epcLabel && ["E", "F", "G"].includes(w.epcLabel));
  const geprijsdePanden = lijst.filter((woning): woning is Woning & { prijs: number } => woning.prijs !== null);
  const laagstePrijs = geprijsdePanden.reduce<(Woning & { prijs: number }) | undefined>(
    (laagste, woning) => (!laagste || woning.prijs < laagste.prijs ? woning : laagste),
    undefined,
  );
  const hoogstePrijs = geprijsdePanden.reduce<(Woning & { prijs: number }) | undefined>(
    (hoogste, woning) => (!hoogste || woning.prijs > hoogste.prijs ? woning : hoogste),
    undefined,
  );
  const epcVolgorde = ["A+", "A", "B", "C", "D", "E", "F", "G"];
  const besteEpc = lijst
    .filter((woning) => woning.epcLabel && epcVolgorde.includes(woning.epcLabel))
    .sort((a, b) => epcVolgorde.indexOf(a.epcLabel!) - epcVolgorde.indexOf(b.epcLabel!))[0];
  const grootstePerceel = lijst
    .filter((woning): woning is Woning & { grond: number } => woning.grond !== null)
    .sort((a, b) => b.grond - a.grond)[0];
  const grootsteWoonoppervlakte = lijst
    .filter((woning): woning is Woning & { bewoonbaar: number } => woning.bewoonbaar !== null)
    .sort((a, b) => b.bewoonbaar - a.bewoonbaar)[0];
  const grootsteTerras = lijst
    .map((woning) => ({ woning, oppervlakte: ruimteOppervlakte(woning, "Terras") }))
    .filter((item): item is { woning: Woning; oppervlakte: number } => item.oppervlakte !== null)
    .sort((a, b) => b.oppervlakte - a.oppervlakte)[0];
  const epcLabels = [...new Set(lijst.map((woning) => woning.epcLabel).filter((label): label is string => !!label))];
  const deelgemeenten = profiel ? deelgemeentenInAanbod(lijst, profiel) : [];
  const controles = profiel?.controles ?? (cat.key === "appartement" ? [...ALGEMENE_KOOPCONTROLES, APPARTEMENT_KOOPCONTROLE] : ALGEMENE_KOOPCONTROLES);

  return (
    <>
      {gemeenten && gemeenten.length ? (
        <>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">In welke gemeenten staan {cat.meervoud.toLowerCase()} te koop in {naam}?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Het aanbod in {naam} is verdeeld over {lijstNL(gemeenten.map((g) => g.naam))}. Kies een gemeente om het aanbod daar te bekijken.
          </p>
          <ul className="mt-3 space-y-2">
            {gemeenten.map((g) => (
              <li key={g.slug}>
                <Link href={`/${cat.prefix}/${seed}/${g.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
                  {cat.meervoud} te koop in {g.naam}
                </Link>{" "}
                <span className="text-slate-500">({aantal(g.count)})</span>
              </li>
            ))}
          </ul>

          {["huis", "appartement"].includes(cat.key) && (
            <>
              <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Hoe verschilt het huidige aanbod in {naam}?</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                Het aanbod verschilt in vraagprijs, EPC en perceeloppervlakte. Deze kernpunten zijn berekend uit de woningen die nu op deze pagina staan.
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {laagstePrijs && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-sm font-bold text-slate-500">Laagste vraagprijs</dt>
                <dd className="mt-1 font-extrabold text-brand-900">{formatPrijs(laagstePrijs.prijs)}</dd>
                <dd className="mt-1 text-sm text-slate-700">{laagstePrijs.adres} in {laagstePrijs.gemeente}</dd>
              </div>
            )}
            {hoogstePrijs && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-sm font-bold text-slate-500">Hoogste vraagprijs</dt>
                <dd className="mt-1 font-extrabold text-brand-900">{formatPrijs(hoogstePrijs.prijs)}</dd>
                <dd className="mt-1 text-sm text-slate-700">{hoogstePrijs.adres} in {hoogstePrijs.gemeente}</dd>
              </div>
            )}
            {besteEpc && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-sm font-bold text-slate-500">Sterkste EPC-label</dt>
                <dd className="mt-1 font-extrabold text-brand-900">{epcLabels.length === 1 ? `Alle panden: EPC ${besteEpc.epcLabel}` : `EPC-label ${besteEpc.epcLabel}`}</dd>
                <dd className="mt-1 text-sm text-slate-700">{epcLabels.length === 1 ? `Geldt voor het volledige huidige aanbod in ${naam}` : `${besteEpc.adres} in ${besteEpc.gemeente}`}</dd>
              </div>
            )}
            {grootstePerceel && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-sm font-bold text-slate-500">Grootste perceel</dt>
                <dd className="mt-1 font-extrabold text-brand-900">{formatOpp(grootstePerceel.grond)}</dd>
                <dd className="mt-1 text-sm text-slate-700">{grootstePerceel.adres} in {grootstePerceel.gemeente}</dd>
              </div>
            )}
            {cat.key === "appartement" && grootsteWoonoppervlakte && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-sm font-bold text-slate-500">Grootste woonoppervlakte</dt>
                <dd className="mt-1 font-extrabold text-brand-900">{formatOpp(grootsteWoonoppervlakte.bewoonbaar)}</dd>
                <dd className="mt-1 text-sm text-slate-700">{grootsteWoonoppervlakte.adres} in {grootsteWoonoppervlakte.gemeente}</dd>
              </div>
            )}
              </dl>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Deze uitersten zijn geen provinciale gemiddelden. Ze vergelijken alleen het actuele aanbod van het platform.</p>
            </>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Wat staat er momenteel te koop in {naam}?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {lijst.length === 1 ? (
              <>
                Het aanbod in {naam} bestaat uit{" "}
                <Link href={woningHref(lijst[0])} className="font-medium text-brand-700 underline underline-offset-2">
                  {lijst[0].type.toLowerCase()} aan de {lijst[0].adres}
                </Link>
                {lijst[0].bouwjaar ? ` uit ${lijst[0].bouwjaar}` : ""}. De vraagprijs bedraagt {formatPrijs(lijst[0].prijs)}
                {lijst[0].bewoonbaar ? ` voor ${formatOpp(lijst[0].bewoonbaar)} bewoonbare oppervlakte` : ""}.
                {teRenoveren.length
                  ? ` Door EPC-label ${lijst[0].epcLabel} valt de woning onder de Vlaamse renovatieplicht: een koper verbetert ze binnen zes jaar na de aankoop tot minstens label D.`
                  : ""}
              </>
            ) : (
              <>Het aanbod in {naam} omvat {aantal(lijst.length)}. {teRenoveren.length ? `Voor ${teRenoveren.length} daarvan geldt door het EPC-label de Vlaamse renovatieplicht.` : ""} Bekijk per pand de kenmerken, de energiescore en de bijkomende kosten.</>
            )}
          </p>

          {["huis", "appartement"].includes(cat.key) && lijst.length > 1 && (
            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead className="bg-brand-50 text-brand-900">
                  <tr>
                    <th className="px-4 py-3 font-extrabold">Woning</th>
                    <th className="px-4 py-3 font-extrabold">Vraagprijs</th>
                    <th className="px-4 py-3 font-extrabold">Slaapkamers</th>
                    <th className="px-4 py-3 font-extrabold">Bewoonbaar</th>
                    <th className="px-4 py-3 font-extrabold">{cat.key === "appartement" ? "Terras" : "Perceel"}</th>
                    <th className="px-4 py-3 font-extrabold">EPC</th>
                    <th className="px-4 py-3 font-extrabold">Staat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {lijst.map((woning) => (
                    <tr key={woning.id}>
                      <td className="px-4 py-3 font-semibold text-brand-800">
                        <Link href={woningHref(woning)} className="underline decoration-brand-300 underline-offset-2 hover:text-brand-600">
                          {woning.adres}{cat.key === "appartement" && woning.bewoonbaar ? `, ${formatOpp(woning.bewoonbaar)}` : ""}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{formatPrijs(woning.prijs)}</td>
                      <td className="px-4 py-3">{woning.slaapkamers ?? "Niet vermeld"}</td>
                      <td className="whitespace-nowrap px-4 py-3">{woning.bewoonbaar ? formatOpp(woning.bewoonbaar) : "Niet vermeld"}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {cat.key === "appartement"
                          ? ruimteOppervlakte(woning, "Terras") ? formatOpp(ruimteOppervlakte(woning, "Terras")) : "Niet vermeld"
                          : woning.grond ? formatOpp(woning.grond) : "Niet vermeld"}
                      </td>
                      <td className="px-4 py-3">{woning.epcLabel ?? "Niet vermeld"}</td>
                      <td className="px-4 py-3">{woning.staat || "Niet vermeld"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {lijst.length > 1 && (
            <>
              <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welk{cat.key === "appartement" ? " appartement" : "e woning"} past bij je zoekprofiel?</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                {cat.key === "appartement"
                  ? "De appartementen verschillen in prijs, woonoppervlakte, slaapkamers en terras. Gebruik die kenmerken als eerste selectie en open daarna het panddetail voor de documenten van het appartement en de mede-eigendom."
                  : "De panden verschillen sterk in prijs, energieprestatie en perceel. Gebruik die kenmerken als eerste selectie en open daarna het panddetail voor de volledige documenten en voorwaarden."}
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                {laagstePrijs && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <dt className="text-sm font-bold text-slate-500">Laagste vraagprijs</dt>
                    <dd className="mt-1 font-extrabold text-brand-900">{laagstePrijs.adres}</dd>
                    <dd className="mt-1 text-sm text-slate-700">{formatPrijs(laagstePrijs.prijs)}</dd>
                  </div>
                )}
                {cat.key !== "appartement" && besteEpc && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <dt className="text-sm font-bold text-slate-500">Sterkste EPC-label</dt>
                    <dd className="mt-1 font-extrabold text-brand-900">{besteEpc.adres}</dd>
                    <dd className="mt-1 text-sm text-slate-700">EPC-label {besteEpc.epcLabel}{besteEpc.epcVerbruik ? `, ${besteEpc.epcVerbruik} kWh/m2` : ""}</dd>
                  </div>
                )}
                {cat.key === "appartement" && grootsteWoonoppervlakte && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <dt className="text-sm font-bold text-slate-500">Grootste woonoppervlakte</dt>
                    <dd className="mt-1 font-extrabold text-brand-900">{grootsteWoonoppervlakte.adres}</dd>
                    <dd className="mt-1 text-sm text-slate-700">{formatOpp(grootsteWoonoppervlakte.bewoonbaar)}</dd>
                  </div>
                )}
                {cat.key !== "appartement" && grootstePerceel && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <dt className="text-sm font-bold text-slate-500">Grootste perceel</dt>
                    <dd className="mt-1 font-extrabold text-brand-900">{grootstePerceel.adres}</dd>
                    <dd className="mt-1 text-sm text-slate-700">{formatOpp(grootstePerceel.grond)}</dd>
                  </div>
                )}
                {cat.key === "appartement" && grootsteTerras && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <dt className="text-sm font-bold text-slate-500">Grootste terras</dt>
                    <dd className="mt-1 font-extrabold text-brand-900">{grootsteTerras.woning.adres}</dd>
                    <dd className="mt-1 text-sm text-slate-700">{formatOpp(grootsteTerras.oppervlakte)}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {cat.key === "appartement"
                  ? "Dit zijn vergelijkingen binnen het actuele aanbod op deze pagina. Een lagere vraagprijs kan samengaan met minder woonruimte, een kleiner terras of andere gemeenschappelijke lasten. Controleer daarom ook de documenten en kosten van het gebouw."
                  : "Dit zijn vergelijkingen binnen het actuele aanbod op deze pagina. Een lagere vraagprijs kan samengaan met renovatiewerken, terwijl een groter perceel of beter EPC niet op zichzelf de uiteindelijke waarde bepaalt."}
              </p>
            </>
          )}

          {profiel && (
            <>
              <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Waar ligt het huidige aanbod binnen {naam}?</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                {naam} bestaat uit {lijstNL(profiel.deelgemeenten.map((item) => item.naam))}. Het huidige aanbod op deze pagina ligt
                {deelgemeenten.length ? ` in ${lijstNL(deelgemeenten)}` : " verspreid binnen de gemeente"}. Zo zie je meteen dat de gemeentenaam alleen niet voldoende is om de ligging van een pand te beoordelen.
              </p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-brand-50 text-brand-900">
                    <tr>
                      <th className="px-4 py-3 font-extrabold">Deelgemeente</th>
                      <th className="px-4 py-3 font-extrabold">Postcode</th>
                      <th className="px-4 py-3 font-extrabold">Huidig aanbod</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    {profiel.deelgemeenten.map((deelgemeente) => {
                      const count = lijst.filter((woning) => woning.postcode === deelgemeente.postcode).length;
                      return (
                        <tr key={deelgemeente.postcode}>
                          <td className="px-4 py-3 font-semibold text-brand-800">{deelgemeente.naam}</td>
                          <td className="px-4 py-3">{deelgemeente.postcode}</td>
                          <td className="px-4 py-3">{count ? aantal(count) : "Geen pand op dit moment"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Gemeente-indeling gecontroleerd via{" "}
                <a href={profiel.bron.href} className="font-medium text-brand-700 underline underline-offset-2">{profiel.bron.label}</a>.
              </p>
            </>
          )}

          {["huis", "appartement"].includes(cat.key) && !profiel && (
            <>
              <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Waar ligt het huidige aanbod in {naam}?</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                De huidige resultaten liggen op {lijst.length === 1 ? "dit adres" : "deze adressen"}. Controleer per pand de precieze ligging, {cat.key === "appartement" ? "de kenmerken van het gebouw" : "het perceel"} en de omgeving voordat je een bezoek plant.
              </p>
              <ul className="mt-3 space-y-2">
                {lijst.map((woning) => (
                  <li key={woning.id}>
                    <Link href={woningHref(woning)} className="font-medium text-brand-700 underline underline-offset-2">
                      {woning.adres}, {woning.postcode} {woning.gemeente}{cat.key === "appartement" && woning.bewoonbaar ? `, ${formatOpp(woning.bewoonbaar)}` : ""}{cat.key === "appartement" && woning.slaapkamers ? `, ${slaapkamersTekst(woning.slaapkamers)}` : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {kantorenLijst.length > 0 && (
        <>
          <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welke vastgoedkantoren zijn actief in {naam}?</h2>
          <p className="mt-3 text-slate-700">
            {kantorenLijst.length === 1 ? "Dit kantoor is" : `Deze ${kantorenLijst.length} kantoren zijn`} actief in {naam}. Bekijk hun aanbod, werkingsgebied en reviews.
          </p>
          <ul className="mt-3 space-y-2">
            {kantorenLijst.slice(0, 6).map((k) => (
              <li key={k.slug} className="flex flex-wrap items-center gap-2">
                <Link href={`/kantoor/${k.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{k.naam} in {k.gemeente}</Link>
                {k.premium && <PremiumBadge />}
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Waar let je op bij een aankoop in {naam}?</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Bij de aankoop van een woning in {naam} horen enkele verplichte attesten en bijkomende kosten. Verdiep je vooraf in{" "}
        <GidsLink gids={attest[0]} /> en <GidsLink gids={attest[1]} />, zodat je de vraagprijs kunt afwegen tegen de energiescore, de staat van de woning en wat je als koper nog extra betaalt.
      </p>

      {["huis", "appartement"].includes(cat.key) && (
        <>
          <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welke lokale gegevens controleer je vóór een bod?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Controleer niet alleen de foto&apos;s en kenmerken uit de advertentie. Zoek elk adres afzonderlijk op en vergelijk de officiële perceel-, water- en energie-informatie met wat in het panddetail staat.
          </p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {controles.map((controle, index) => (
              <li key={controle.href} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-bold text-accent-700">Controle {index + 1}</p>
                <h3 className="mt-1 font-extrabold text-brand-900">{controle.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{controle.tekst}</p>
                <a href={controle.href} className="mt-3 inline-block text-sm font-bold text-brand-700 underline underline-offset-2">
                  {controle.label}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Een kaart of advertentie vervangt de attesten, het vastgoedinformatiedossier en juridisch advies van de notaris niet. Neem bij twijfel een opschortende voorwaarde op voordat je een bindend bod uitbrengt.
          </p>
        </>
      )}

      {bovenliggendAanbod && (
        <div className="mt-8 rounded-2xl border border-accent-300 bg-accent-50 px-5 py-4">
          <p className="font-extrabold text-brand-900">Nog niet gevonden wat je zoekt?</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            Bekijk ook <Link href={bovenliggendAanbod.href} className="font-bold text-brand-700 underline underline-offset-2">het volledige aanbod in {bovenliggendAanbod.naam}</Link>. Open een panddetail om alle foto&apos;s en kenmerken te bekijken en rechtstreeks informatie of een bezoek aan te vragen.
          </p>
        </div>
      )}

      {alternatieven && alternatieven.length > 0 && (
        <>
          <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welke andere gemeenten in de provincie kun je vergelijken?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Vind je in {naam} nog niet de juiste woning, vergelijk dan het beschikbare aanbod in andere gemeenten binnen dezelfde provincie. De aantallen hieronder komen uit het actuele platformaanbod.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {alternatieven.map((alternatief) => (
              <li key={alternatief.slug}>
                <Link href={`/${cat.prefix}/${provincieSlug}/${alternatief.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
                  {cat.meervoud} te koop in {alternatief.naam}
                </Link>{" "}
                <span className="text-slate-500">({aantal(alternatief.count)})</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <ListingFaq title={`Welke vragen worden vaak gesteld over ${catWoord(cat, true)} te koop in ${naam}?`} faq={faq} />

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welke gidsen helpen je bij de aankoop?</h2>
      <p className="mt-3 leading-relaxed text-slate-700">Deze gidsen helpen je om budget, bod en begeleiding te beoordelen voordat je een woning kiest.</p>
      <ul className="mt-3 space-y-2">
        {leesook.map((g) => (
          <li key={g.slug}><GidsLink gids={g} /></li>
        ))}
      </ul>
    </>
  );
}

// ---- Overzicht ----
export function overviewMetadata(cat: Categorie): Metadata {
  const lijst = woningenVoor(cat);
  const title = `${cat.meervoud} te koop in Vlaanderen`;
  const description = `Bekijk ${lijst.length} ${catWoord(cat, true)} te koop bij vastgoedkantoren op ons platform. Filter per provincie en gemeente en vergelijk de belangrijkste kenmerken.`.slice(0, 155);
  const path = `/${cat.prefix}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: socialMetadata(title, description, path, lijst),
    twitter: { card: "summary_large_image", title, description, ...(lijst[0]?.fotos[0] ? { images: [lijst[0].fotos[0]] } : {}) },
  };
}
export function OverviewView({ cat }: { cat: Categorie }) {
  const provs = provinciesVoor(cat);
  const lijst = woningenVoor(cat);
  const faq = maakAanbodFaq(cat, "Vlaanderen", lijst, provs.map((provincie) => provincie.naam));
  const path = `/${cat.prefix}`;
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label }]}
      title={`${cat.meervoud} te koop`}
      subtitle={`Bekijk het actuele aanbod van ${cat.meervoud.toLowerCase()} te koop bij de vastgoedkantoren op ons platform. Kies je provincie en gemeente of bekijk meteen alle panden.`}
      path={path}
      chips={provs.map((p) => ({ label: p.naam, href: `/${cat.prefix}/${p.slug}`, count: p.count }))}
      woningen={lijst}
      faq={faq}
      content={<OverzichtContent cat={cat} lijst={lijst} faq={faq} />}
    />
  );
}

// ---- Provincie ----
export function provincieParams(cat: Categorie) {
  return provinciesVoor(cat).map((p) => ({ provincie: p.slug }));
}
export function provincieMetadata(cat: Categorie, provincieSlug: string): Metadata {
  const p = provinciesVoor(cat).find((x) => x.slug === provincieSlug);
  if (!p) return {};
  const lijst = woningenVoor(cat).filter((w) => w.provincieSlug === provincieSlug);
  const title = `${cat.meervoud} te koop in ${p.naam}: ${lijst.length} ${lijst.length === 1 ? "pand" : "panden"}`;
  const description = listingDescription(cat, p.naam, lijst);
  const path = `/${cat.prefix}/${p.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: socialMetadata(title, description, path, lijst),
    twitter: { card: "summary_large_image", title, description, ...(lijst[0]?.fotos[0] ? { images: [lijst[0].fotos[0]] } : {}) },
  };
}
export function ProvincieView({ cat, provincieSlug }: { cat: Categorie; provincieSlug: string }) {
  const p = provinciesVoor(cat).find((x) => x.slug === provincieSlug);
  if (!p) notFound();
  const gem = gemeentenVoor(cat, provincieSlug);
  const lijst = woningenVoor(cat).filter((w) => w.provincieSlug === provincieSlug);
  const kantorenLijst = kantoren.filter((k) => k.provincie === p.naam || k.regios.includes(p.naam));
  const faq = maakAanbodFaq(cat, p.naam, lijst, gem.map((gemeente) => gemeente.naam));
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label, href: `/${cat.prefix}` }, { name: p.naam }]}
      title={`${cat.meervoud} te koop in ${p.naam}`}
      subtitle={introTekst(cat, p.naam, lijst, gem.map((g) => g.naam))}
      path={`/${cat.prefix}/${p.slug}`}
      chips={gem.map((g) => ({ label: g.naam, href: `/${cat.prefix}/${p.slug}/${g.slug}`, count: g.count }))}
      woningen={lijst}
      faq={faq}
      content={<LocatieContent cat={cat} naam={p.naam} seed={p.slug} lijst={lijst} kantorenLijst={kantorenLijst} gemeenten={gem} faq={faq} />}
    />
  );
}

// ---- Gemeente ----
export function gemeenteParams(cat: Categorie) {
  const out: { provincie: string; gemeente: string }[] = [];
  for (const p of provinciesVoor(cat)) {
    for (const g of gemeentenVoor(cat, p.slug)) out.push({ provincie: p.slug, gemeente: g.slug });
  }
  return out;
}
function gemeenteLabels(cat: Categorie, provincieSlug: string, gemeenteSlug: string) {
  const w = woningenVoor(cat).find((x) => x.provincieSlug === provincieSlug && x.gemeenteSlug === gemeenteSlug);
  return w ? { provincie: w.provincie, gemeente: w.gemeente } : null;
}
export function gemeenteMetadata(cat: Categorie, provincieSlug: string, gemeenteSlug: string): Metadata {
  const l = gemeenteLabels(cat, provincieSlug, gemeenteSlug);
  if (!l) return {};
  const lijst = woningenGemeenteVoor(cat, provincieSlug, gemeenteSlug);
  const isBeringenHuis = cat.key === "huis" && provincieSlug === "limburg" && gemeenteSlug === "beringen";
  const title = isBeringenHuis
    ? `Huis te koop in Beringen: ${lijst.length} woningen vergelijken`
    : `${cat.meervoud} te koop in ${l.gemeente}: ${lijst.length} ${lijst.length === 1 ? "pand" : "panden"}`;
  const range = prijsRange(lijst);
  const description = isBeringenHuis && range
    ? `Zoek je een huis te koop in Beringen? Vergelijk ${lijst.length} actuele woningen in Paal en Koersel van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)} op prijs, ruimte en EPC.`.slice(0, 155)
    : listingDescription(cat, l.gemeente, lijst);
  const path = `/${cat.prefix}/${provincieSlug}/${gemeenteSlug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: socialMetadata(title, description, path, lijst),
    twitter: { card: "summary_large_image", title, description, ...(lijst[0]?.fotos[0] ? { images: [lijst[0].fotos[0]] } : {}) },
  };
}
export function GemeenteView({ cat, provincieSlug, gemeenteSlug }: { cat: Categorie; provincieSlug: string; gemeenteSlug: string }) {
  const l = gemeenteLabels(cat, provincieSlug, gemeenteSlug);
  if (!l) notFound();
  const lijst = woningenGemeenteVoor(cat, provincieSlug, gemeenteSlug);
  const kantorenLijst = kantoren.filter((k) => k.gemeente === l.gemeente || k.regios.includes(l.gemeente));
  const profiel = cat.key === "huis" ? LOCATIEPROFIELEN[gemeenteSlug] : undefined;
  const isBeringenHuis = cat.key === "huis" && provincieSlug === "limburg" && gemeenteSlug === "beringen";
  const faq = isBeringenHuis ? maakBeringenFaq(lijst) : maakGemeenteFaq(cat, l.gemeente, lijst, profiel);
  const alternatieven = gemeentenVoor(cat, provincieSlug).filter((gemeente) => gemeente.slug !== gemeenteSlug).slice(0, 6);
  const range = prijsRange(lijst);
  const beringenSubtitle = range
    ? `Zoek je een huis te koop in Beringen? Vergelijk ${lijst.length} actuele woningen in Paal en Koersel met vraagprijzen van ${formatPrijs(range.min)} tot ${formatPrijs(range.max)}. Bekijk eerst de panden en gebruik daarna de vergelijking op woonruimte, perceel, EPC en renovatienood.`
    : introTekst(cat, l.gemeente, lijst);
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label, href: `/${cat.prefix}` }, { name: l.provincie, href: `/${cat.prefix}/${provincieSlug}` }, { name: l.gemeente }]}
      title={`${cat.meervoud} te koop in ${l.gemeente}`}
      subtitle={isBeringenHuis ? beringenSubtitle : introTekst(cat, l.gemeente, lijst)}
      path={`/${cat.prefix}/${provincieSlug}/${gemeenteSlug}`}
      woningen={lijst}
      faq={faq}
      content={
        <LocatieContent
          cat={cat}
          naam={l.gemeente}
          seed={gemeenteSlug}
          lijst={lijst}
          kantorenLijst={kantorenLijst}
          bovenliggendAanbod={{ naam: l.provincie, href: `/${cat.prefix}/${provincieSlug}` }}
          profiel={profiel}
          provincieSlug={provincieSlug}
          alternatieven={alternatieven}
          faq={faq}
        />
      }
    />
  );
}
