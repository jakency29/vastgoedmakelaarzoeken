// Contactpagina. Noindex: functionele pagina, niet bedoeld om te ranken. Zelfde Elfsight-form.

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ElfsightForm } from "@/components/ElfsightForm";

export const metadata: Metadata = {
  title: { absolute: "Contact" },
  description: "Een vraag of feedback? Vul het contactformulier in en we nemen zo snel mogelijk contact met je op.",
  robots: { index: false, follow: true },
};

const ONDERWERPEN = [
  "Een vraag over het vergelijken van vastgoedmakelaars.",
  "Hulp bij een offerteaanvraag die je hebt ingediend.",
  "Feedback of een melding over een pagina op de site.",
];

export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">Contact</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Contact</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Een vraag of feedback? Vul het formulier in en we nemen zo snel mogelijk contact met je op.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Waarmee kunnen we je helpen?</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              {site.name} brengt eigenaars en kopers in contact met erkende vastgoedmakelaars in hun gemeente.
              Heb je een vraag over de dienst of loop je ergens vast? Laat het weten via het formulier.
            </p>

            <ul className="mt-6 space-y-2.5">
              {ONDERWERPEN.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-brand-900">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {o}
                </li>
              ))}
            </ul>

            <p className="mt-8 leading-relaxed text-slate-700">
              Ben je vastgoedmakelaar en wil je aansluiten? Dat kan via de pagina{" "}
              <Link href="/aansluiten" className="font-medium text-brand-700 underline underline-offset-2">
                aansluiten als vastgoedmakelaar
              </Link>
              .
            </p>
          </div>

          <aside className="lg:order-2">
            <div className="lg:sticky lg:top-24">
              <ElfsightForm />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
