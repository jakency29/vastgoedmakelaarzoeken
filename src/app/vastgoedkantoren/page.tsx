// Overzichtspagina van vastgoedkantoren: per provincie (bestaande regio-pagina's) plus
// uitgelichte kantoren (uit de kantoren-lijst). Leadformulier via Elfsight.

import type { Metadata } from "next";
import Link from "next/link";
import { kantoren } from "@/lib/kantoren";
import { ElfsightForm } from "@/components/ElfsightForm";

export const metadata: Metadata = {
  title: { absolute: "Vastgoedkantoren en immokantoren vergelijken" },
  description:
    "Vind een vastgoedkantoor in jouw regio. Vergelijk erkende immokantoren per provincie en vraag vrijblijvend offertes op voor verkopen, verhuren of schatten.",
  alternates: { canonical: "/vastgoedkantoren" },
};

// Bestaande regio-pagina's (MDX). Vul aan naarmate er provincie-pagina's bijkomen.
const PROVINCIES = [
  { naam: "Limburg", slug: "vastgoedkantoren/limburg" },
  { naam: "Vlaams-Brabant", slug: "vastgoedkantoren/vlaams-brabant" },
];

export default function VastgoedkantorenPage() {
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
            Vastgoedkantoren en immokantoren in jouw regio
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Vergelijk erkende vastgoedkantoren per provincie en gemeente. Vraag vrijblijvend
            offertes op voor het verkopen, verhuren of laten schatten van je woning.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Per provincie</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {PROVINCIES.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                >
                  <span className="text-lg font-bold text-brand-900">Vastgoedkantoren {p.naam}</span>
                  <svg className="text-accent-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">Uitgelichte kantoren</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {kantoren.map((k) => (
                <Link
                  key={k.slug}
                  href={`/vastgoedkantoor/${k.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-lg font-bold text-brand-900 group-hover:text-brand-700">{k.naam}</span>
                    {k.example && (
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                        Voorbeeld
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {k.gemeente}, {k.provincie}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{k.diensten.slice(0, 3).join(" | ")}</p>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate-500">
              De getoonde kantoren zijn voorbeeldprofielen. De echte kantoorgegevens worden
              toegevoegd zodra het kantoor- en makelaarsdatamodel is bepaald.
            </p>
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
