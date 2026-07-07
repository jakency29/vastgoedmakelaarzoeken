// Woningen te koop per gemeente.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { woningen, provincies, gemeenten, woningenInGemeente } from "@/lib/woningen";
import { WoningCard } from "@/components/WoningCard";

export const dynamicParams = false;

export function generateStaticParams() {
  const out: { provincie: string; gemeente: string }[] = [];
  for (const p of provincies()) {
    for (const g of gemeenten(p.slug)) out.push({ provincie: p.slug, gemeente: g.slug });
  }
  return out;
}

type Props = { params: Promise<{ provincie: string; gemeente: string }> };

function labels(provincieSlug: string, gemeenteSlug: string) {
  const w = woningen.find((x) => x.provincieSlug === provincieSlug && x.gemeenteSlug === gemeenteSlug);
  return w ? { provincie: w.provincie, gemeente: w.gemeente } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provincie, gemeente } = await params;
  const l = labels(provincie, gemeente);
  if (!l) return {};
  return {
    title: { absolute: `Huizen te koop in ${l.gemeente}` },
    description: `Bekijk woningen te koop in ${l.gemeente} (${l.provincie}) bij erkende vastgoedkantoren. Vraag vrijblijvend info of een bezoek aan.`.slice(0, 155),
    alternates: { canonical: `/huis-te-koop/${provincie}/${gemeente}` },
  };
}

export default async function GemeentePage({ params }: Props) {
  const { provincie, gemeente } = await params;
  const l = labels(provincie, gemeente);
  if (!l) notFound();
  const lijst = woningenInGemeente(provincie, gemeente);

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href="/huis-te-koop" className="hover:text-brand-700 hover:underline">Te koop</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href={`/huis-te-koop/${provincie}`} className="hover:text-brand-700 hover:underline">{l.provincie}</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">{l.gemeente}</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Huizen te koop in {l.gemeente}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            {lijst.length} {lijst.length === 1 ? "pand" : "panden"} te koop in {l.gemeente}, {l.provincie}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lijst.map((w) => (
            <WoningCard key={w.id} w={w} />
          ))}
        </div>
      </div>
    </main>
  );
}
