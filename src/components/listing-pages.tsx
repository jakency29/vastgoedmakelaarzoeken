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
  type Categorie,
} from "@/lib/woningen";
import { kantoren, type Kantoor } from "@/lib/kantoren";
import { ListingView } from "./ListingView";

const HOME = { name: "Home", href: "/" };
const aantal = (n: number) => `${n} ${n === 1 ? "pand" : "panden"}`;

// SEO-content onder de listings: koopinfo met interne links + relevante kantoren.
function LocatieContent({ naam, kantorenLijst }: { naam: string; kantorenLijst: Kantoor[] }) {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Een huis kopen in {naam}</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Een huis kopen in {naam} vraagt om een goede voorbereiding. Elke verkoper legt een geldig{" "}
        <Link href="/huis-verkopen-verplichtingen/epc" className="font-medium text-brand-700 underline underline-offset-2">EPC</Link>, een{" "}
        <Link href="/huis-verkopen-verplichtingen/elektriciteitskeuring" className="font-medium text-brand-700 underline underline-offset-2">elektrische keuring</Link> en een{" "}
        <Link href="/huis-verkopen-verplichtingen/bodemattest" className="font-medium text-brand-700 underline underline-offset-2">bodemattest</Link> voor, en voor woningen met bouwjaar 2000 of vroeger ook een{" "}
        <Link href="/asbestattest" className="font-medium text-brand-700 underline underline-offset-2">asbestattest</Link>. Als koper betaal je bovenop de aankoopprijs{" "}
        <Link href="/registratierechten" className="font-medium text-brand-700 underline underline-offset-2">registratierechten</Link> (in Vlaanderen 2% voor je enige eigen woning) en{" "}
        <Link href="/notariskosten-verkoop-huis" className="font-medium text-brand-700 underline underline-offset-2">notariskosten</Link>. Vergelijk dus niet alleen de vraagprijs, maar ook de energiescore, de staat en de bijkomende kosten.
      </p>

      {kantorenLijst.length > 0 && (
        <>
          <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Vastgoedkantoren in {naam}</h2>
          <p className="mt-3 text-slate-700">Deze kantoren zijn actief in {naam}. Bekijk hun aanbod, werkingsgebied en reviews.</p>
          <ul className="mt-3 space-y-2">
            {kantorenLijst.slice(0, 6).map((k) => (
              <li key={k.slug}>
                <Link href={`/kantoor/${k.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{k.naam} in {k.gemeente}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Lees ook</h2>
      <ul className="mt-3 space-y-2">
        <li><Link href="/registratierechten/eerste-woning" className="font-medium text-brand-700 underline underline-offset-2">Registratierechten voor je eerste woning</Link></li>
        <li><Link href="/hoeveel-spaargeld-voor-een-huis" className="font-medium text-brand-700 underline underline-offset-2">Hoeveel spaargeld heb je nodig voor een huis?</Link></li>
        <li><Link href="/bieden-op-een-huis" className="font-medium text-brand-700 underline underline-offset-2">Bieden op een huis</Link></li>
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
      subtitle={`${aantal(lijst.length)} te koop in ${p.naam} bij de vastgoedkantoren op ons platform.`}
      chips={gem.map((g) => ({ label: g.naam, href: `/${cat.prefix}/${p.slug}/${g.slug}`, count: g.count }))}
      woningen={lijst}
      content={<LocatieContent naam={p.naam} kantorenLijst={kantorenLijst} />}
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
      subtitle={`${aantal(lijst.length)} te koop in ${l.gemeente}, ${l.provincie}.`}
      woningen={lijst}
      content={<LocatieContent naam={l.gemeente} kantorenLijst={kantorenLijst} />}
    />
  );
}
