// Overzicht van vastgoedkantoren (directory). Kaarten met foto/logo, locatie en diensten.
// Leadformulier centraal via Elfsight. URL /kantoor (zoals de bestaande site).

import type { Metadata } from "next";
import Link from "next/link";
import { kantoren } from "@/lib/kantoren";
import { ElfsightForm } from "@/components/ElfsightForm";

export const metadata: Metadata = {
  title: { absolute: "Vastgoedkantoren en immokantoren vergelijken" },
  description:
    "Vind een erkend vastgoedkantoor in jouw regio. Bekijk immokantoren per gemeente en provincie en vraag vrijblijvend een offerte voor verkopen of verhuren.",
  alternates: { canonical: "/kantoor" },
};

const PROVINCIES = [
  { naam: "Limburg", slug: "vastgoedkantoren/limburg" },
  { naam: "Vlaams-Brabant", slug: "vastgoedkantoren/vlaams-brabant" },
];

export default function KantorenPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">Vastgoedkantoren</li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Vastgoedkantoren in jouw regio
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Bekijk erkende vastgoedkantoren en immokantoren per gemeente en provincie. Vraag
            vrijblijvend een offerte voor het verkopen, verhuren of laten schatten van je woning.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="grid gap-5 sm:grid-cols-2">
              {kantoren.map((k) => (
                <Link
                  key={k.slug}
                  href={`/kantoor/${k.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                >
                  <div className="flex h-40 items-center justify-center border-b border-slate-100 bg-slate-50 p-4">
                    {k.foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={k.foto} alt={k.naam} loading="lazy" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-2xl font-extrabold text-brand-200">{k.naam}</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-lg font-bold text-brand-900 group-hover:text-brand-700">{k.naam}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{k.gemeente}, {k.provincie}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{k.diensten.slice(0, 3).join(" | ")}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Bekijk kantoor
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">Per provincie</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {PROVINCIES.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                >
                  <span className="font-bold text-brand-900">Vastgoedkantoren {p.naam}</span>
                  <svg className="text-accent-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <aside id="leadform" className="lg:order-2">
            <div className="lg:sticky lg:top-24">
              <ElfsightForm />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
