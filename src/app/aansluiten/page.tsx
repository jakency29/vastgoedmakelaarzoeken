// Aanmeldpagina voor vastgoedmakelaars/kantoren die willen aansluiten. Noindex: enkel via de
// knop in de header bereikbaar, niet bedoeld om te ranken.

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { AansluitenForm } from "@/components/AansluitenForm";

export const metadata: Metadata = {
  title: { absolute: "Aansluiten als vastgoedmakelaar" },
  description: "Vastgoedmakelaar of kantoor? Meld je aan om lid te worden en aanvragen uit je regio te ontvangen.",
  robots: { index: false, follow: false },
};

const VOORDELEN = [
  "Een eigen profielpagina met je aanbod, werkingsgebied en reviews.",
  "Aanvragen van eigenaars en kopers uit je eigen regio.",
  "Je woningaanbod op de listingpagina's van het platform.",
];

export default function AansluitenPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">Aansluiten</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Aansluiten als vastgoedmakelaar</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Wil je graag lid worden of meer weten? Vul dan het formulier in en we nemen contact met je op.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Voor vastgoedmakelaars en kantoren</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              {site.name} brengt eigenaars en kopers in contact met erkende vastgoedmakelaars in hun gemeente.
              Sluit je aan als kantoor en word zichtbaar bij mensen die in jouw regio willen verkopen, verhuren of kopen.
            </p>

            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Wat krijg je als lid?</h2>
            <ul className="mt-3 space-y-2.5">
              {VOORDELEN.map((v) => (
                <li key={v} className="flex items-start gap-2.5 text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-brand-900">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {v}
                </li>
              ))}
            </ul>

            <p className="mt-8 leading-relaxed text-slate-700">
              Nog een vraag? Vul het formulier in met je bericht, dan bezorgen we je alle informatie.
            </p>
          </div>

          <aside className="lg:order-2">
            <div className="lg:sticky lg:top-24">
              <AansluitenForm />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
