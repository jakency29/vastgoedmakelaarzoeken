// Woningen te koop per provincie.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { provincies, gemeenten, woningenInProvincie } from "@/lib/woningen";
import { WoningCard } from "@/components/WoningCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return provincies().map((p) => ({ provincie: p.slug }));
}

type Props = { params: Promise<{ provincie: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provincie } = await params;
  const p = provincies().find((x) => x.slug === provincie);
  if (!p) return {};
  return {
    title: { absolute: `Huizen te koop in ${p.naam}` },
    description: `Bekijk woningen te koop in ${p.naam} bij erkende vastgoedkantoren. Filter per gemeente en vraag vrijblijvend info of een bezoek aan.`.slice(0, 155),
    alternates: { canonical: `/huis-te-koop/${p.slug}` },
  };
}

export default async function ProvinciePage({ params }: Props) {
  const { provincie } = await params;
  const p = provincies().find((x) => x.slug === provincie);
  if (!p) notFound();
  const lijst = woningenInProvincie(provincie);
  const gem = gemeenten(provincie);

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
              <li className="font-medium text-brand-800">{p.naam}</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Huizen te koop in {p.naam}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            {lijst.length} {lijst.length === 1 ? "pand" : "panden"} te koop in {p.naam} bij de vastgoedkantoren op ons platform.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {gem.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {gem.map((g) => (
              <Link
                key={g.slug}
                href={`/huis-te-koop/${p.slug}/${g.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm hover:border-brand-300"
              >
                {g.naam} <span className="text-slate-400">({g.count})</span>
              </Link>
            ))}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lijst.map((w) => (
            <WoningCard key={w.id} w={w} />
          ))}
        </div>
      </div>
    </main>
  );
}
