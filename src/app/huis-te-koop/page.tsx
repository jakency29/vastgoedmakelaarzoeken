// Overzicht van woningen te koop: intro, provincies met aanbod en alle panden.

import type { Metadata } from "next";
import Link from "next/link";
import { woningen, provincies } from "@/lib/woningen";
import { WoningCard } from "@/components/WoningCard";

export const metadata: Metadata = {
  title: { absolute: "Huizen te koop in Vlaanderen" },
  description:
    "Bekijk woningen te koop bij erkende vastgoedkantoren. Filter per provincie en gemeente en vraag vrijblijvend meer info of een bezoek aan.",
  alternates: { canonical: "/huis-te-koop" },
};

export default function HuisTeKoopPage() {
  const provs = provincies();
  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">Te koop</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Huizen te koop</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Bekijk het actuele aanbod van woningen te koop bij de vastgoedkantoren op ons platform.
            Kies je provincie en gemeente of bekijk meteen alle panden.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {provs.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {provs.map((p) => (
              <Link
                key={p.slug}
                href={`/huis-te-koop/${p.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm hover:border-brand-300"
              >
                {p.naam} <span className="text-slate-400">({p.count})</span>
              </Link>
            ))}
          </div>
        )}

        {woningen.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {woningen.map((w) => (
              <WoningCard key={w.id} w={w} />
            ))}
          </div>
        ) : (
          <p className="text-slate-600">Er zijn momenteel geen panden beschikbaar.</p>
        )}
      </div>
    </main>
  );
}
