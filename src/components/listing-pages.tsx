// Gedeelde render- en metadata-helpers voor de listing-takken (huis / appartement),
// zodat /huis-te-koop en /appartement-te-koop dezelfde logica delen.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  provinciesVoor,
  gemeentenVoor,
  woningenVoor,
  woningenGemeenteVoor,
  type Categorie,
} from "@/lib/woningen";
import { ListingView } from "./ListingView";

const HOME = { name: "Home", href: "/" };
const aantal = (n: number) => `${n} ${n === 1 ? "pand" : "panden"}`;

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
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label, href: `/${cat.prefix}` }, { name: p.naam }]}
      title={`${cat.meervoud} te koop in ${p.naam}`}
      subtitle={`${aantal(lijst.length)} te koop in ${p.naam} bij de vastgoedkantoren op ons platform.`}
      chips={gem.map((g) => ({ label: g.naam, href: `/${cat.prefix}/${p.slug}/${g.slug}`, count: g.count }))}
      woningen={lijst}
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
  return (
    <ListingView
      breadcrumb={[HOME, { name: cat.label, href: `/${cat.prefix}` }, { name: l.provincie, href: `/${cat.prefix}/${provincieSlug}` }, { name: l.gemeente }]}
      title={`${cat.meervoud} te koop in ${l.gemeente}`}
      subtitle={`${aantal(lijst.length)} te koop in ${l.gemeente}, ${l.provincie}.`}
      woningen={lijst}
    />
  );
}
