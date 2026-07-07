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
  type Categorie,
  type Woning,
} from "@/lib/woningen";
import { kantoren, type Kantoor } from "@/lib/kantoren";
import { ListingView } from "./ListingView";

const HOME = { name: "Home", href: "/" };
const aantal = (n: number) => `${n} ${n === 1 ? "pand" : "panden"}`;

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

// Stabiele hash op een string, voor deterministische maar per-pagina wisselende linkselectie.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

type Gids = { slug: string; anker: string };

// Attest- en kostengidsen (voor de aankoopparagraaf). Ankertekst spiegelt de doelpagina.
const ATTEST_GIDSEN: Gids[] = [
  { slug: "huis-verkopen-verplichtingen/epc", anker: "het EPC" },
  { slug: "huis-verkopen-verplichtingen/elektriciteitskeuring", anker: "de elektrische keuring" },
  { slug: "huis-verkopen-verplichtingen/bodemattest", anker: "het bodemattest" },
  { slug: "asbestattest/bij-verkoop", anker: "het asbestattest" },
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
    if (w.slaapkamers) kenmerk.push(`${w.slaapkamers} slaapkamers`);
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

// Unieke, data-gedreven content onder de listings.
function LocatieContent({
  cat,
  naam,
  seed,
  lijst,
  kantorenLijst,
  gemeenten,
}: {
  cat: Categorie;
  naam: string;
  seed: string;
  lijst: Woning[];
  kantorenLijst: Kantoor[];
  gemeenten?: { naam: string; slug: string; count: number }[];
}) {
  const attest = kiesGidsen(ATTEST_GIDSEN, seed, 2);
  const leesook = kiesGidsen(LEESOOK_GIDSEN, `${seed}-lees`, 3);
  const teRenoveren = lijst.filter((w) => w.epcLabel && ["E", "F", "G"].includes(w.epcLabel));

  return (
    <>
      {gemeenten && gemeenten.length ? (
        <>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">{cat.meervoud} te koop in {naam} per gemeente</h2>
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
        </>
      ) : (
        <>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Over het aanbod in {naam}</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {lijst.length === 1 ? (
              <>
                Het aanbod in {naam} bestaat uit{" "}
                <Link href={`/woning/${lijst[0].slug}`} className="font-medium text-brand-700 underline underline-offset-2">
                  {lijst[0].type.toLowerCase()} aan de {lijst[0].adres}
                </Link>
                {lijst[0].bouwjaar ? ` uit ${lijst[0].bouwjaar}` : ""}. De vraagprijs bedraagt {formatPrijs(lijst[0].prijs)}
                {lijst[0].bewoonbaar ? ` voor ${formatOpp(lijst[0].bewoonbaar)} bewoonbare oppervlakte` : ""}.
                {teRenoveren.length
                  ? ` Door EPC-label ${lijst[0].epcLabel} valt de woning onder de Vlaamse renovatieplicht: een koper verbetert ze binnen vijf jaar na de aankoop tot minstens label D.`
                  : ""}
              </>
            ) : (
              <>Het aanbod in {naam} omvat {aantal(lijst.length)}. {teRenoveren.length ? `Voor ${teRenoveren.length} daarvan geldt door het EPC-label de Vlaamse renovatieplicht.` : ""} Bekijk per pand de kenmerken, de energiescore en de bijkomende kosten.</>
            )}
          </p>
        </>
      )}

      {kantorenLijst.length > 0 && (
        <>
          <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Vastgoedkantoren in {naam}</h2>
          <p className="mt-3 text-slate-700">
            {kantorenLijst.length === 1 ? "Dit kantoor is" : `Deze ${kantorenLijst.length} kantoren zijn`} actief in {naam}. Bekijk hun aanbod, werkingsgebied en reviews.
          </p>
          <ul className="mt-3 space-y-2">
            {kantorenLijst.slice(0, 6).map((k) => (
              <li key={k.slug}>
                <Link href={`/kantoor/${k.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{k.naam} in {k.gemeente}</Link>
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

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Lees ook</h2>
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
  return {
    title: { absolute: `${cat.meervoud} te koop in Vlaanderen` },
    description: `Bekijk ${cat.meervoud.toLowerCase()} te koop bij erkende vastgoedkantoren. Filter per provincie en gemeente en vraag vrijblijvend info of een bezoek aan.`.slice(0, 155),
    alternates: { canonical: `/${cat.prefix}` },
  };
}
export function OverviewView({ cat }: { cat: Categorie }) {
  const provs = provinciesVoor(cat);
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label }]}
      title={`${cat.meervoud} te koop`}
      subtitle={`Bekijk het actuele aanbod van ${cat.meervoud.toLowerCase()} te koop bij de vastgoedkantoren op ons platform. Kies je provincie en gemeente of bekijk meteen alle panden.`}
      chips={provs.map((p) => ({ label: p.naam, href: `/${cat.prefix}/${p.slug}`, count: p.count }))}
      woningen={woningenVoor(cat)}
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
  return {
    title: { absolute: `${cat.meervoud} te koop in ${p.naam}` },
    description: `Bekijk ${cat.meervoud.toLowerCase()} te koop in ${p.naam} bij erkende vastgoedkantoren. Vraag vrijblijvend info of een bezoek aan.`.slice(0, 155),
    alternates: { canonical: `/${cat.prefix}/${p.slug}` },
  };
}
export function ProvincieView({ cat, provincieSlug }: { cat: Categorie; provincieSlug: string }) {
  const p = provinciesVoor(cat).find((x) => x.slug === provincieSlug);
  if (!p) notFound();
  const gem = gemeentenVoor(cat, provincieSlug);
  const lijst = woningenVoor(cat).filter((w) => w.provincieSlug === provincieSlug);
  const kantorenLijst = kantoren.filter((k) => k.provincie === p.naam || k.regios.includes(p.naam));
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label, href: `/${cat.prefix}` }, { name: p.naam }]}
      title={`${cat.meervoud} te koop in ${p.naam}`}
      subtitle={introTekst(cat, p.naam, lijst, gem.map((g) => g.naam))}
      chips={gem.map((g) => ({ label: g.naam, href: `/${cat.prefix}/${p.slug}/${g.slug}`, count: g.count }))}
      woningen={lijst}
      content={<LocatieContent cat={cat} naam={p.naam} seed={p.slug} lijst={lijst} kantorenLijst={kantorenLijst} gemeenten={gem} />}
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
  return {
    title: { absolute: `${cat.meervoud} te koop in ${l.gemeente}` },
    description: `Bekijk ${cat.meervoud.toLowerCase()} te koop in ${l.gemeente} (${l.provincie}) bij erkende vastgoedkantoren. Vraag vrijblijvend info of een bezoek aan.`.slice(0, 155),
    alternates: { canonical: `/${cat.prefix}/${provincieSlug}/${gemeenteSlug}` },
  };
}
export function GemeenteView({ cat, provincieSlug, gemeenteSlug }: { cat: Categorie; provincieSlug: string; gemeenteSlug: string }) {
  const l = gemeenteLabels(cat, provincieSlug, gemeenteSlug);
  if (!l) notFound();
  const lijst = woningenGemeenteVoor(cat, provincieSlug, gemeenteSlug);
  const kantorenLijst = kantoren.filter((k) => k.gemeente === l.gemeente || k.regios.includes(l.gemeente));
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label, href: `/${cat.prefix}` }, { name: l.provincie, href: `/${cat.prefix}/${provincieSlug}` }, { name: l.gemeente }]}
      title={`${cat.meervoud} te koop in ${l.gemeente}`}
      subtitle={introTekst(cat, l.gemeente, lijst)}
      woningen={lijst}
      content={<LocatieContent cat={cat} naam={l.gemeente} seed={gemeenteSlug} lijst={lijst} kantorenLijst={kantorenLijst} />}
    />
  );
}
