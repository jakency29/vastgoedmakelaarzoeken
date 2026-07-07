// Homepage in vastgoedportaal-stijl: navy zoek-hero met prominente leadkaart,
// stappenplan en card-gebaseerde populaire onderwerpen.

import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/site";

const POPULAIR = [
  { label: "Huis laten schatten", href: "/huis-laten-schatten", desc: "Ken de waarde van je woning voor je verkoopt." },
  { label: "Waarde woning berekenen", href: "/waarde-woning-berekenen", desc: "Gratis online indicatie op basis van je adres." },
  { label: "Kosten vastgoedmakelaar", href: "/kosten-vastgoedmakelaar", desc: "Wat een makelaar kost en hoe je vergelijkt." },
  { label: "Asbestattest", href: "/asbestattest", desc: "Verplicht bij verkoop van oudere woningen." },
  { label: "Verplichtingen bij verkoop", href: "/huis-verkopen-verplichtingen", desc: "Alle attesten en documenten op een rij." },
  { label: "Registratierechten", href: "/registratierechten", desc: "2% of 12% verkooprecht in Vlaanderen." },
];

const STAPPEN = [
  { n: "1", t: "Vul je postcode in", d: "Vertel wat je wil doen: verkopen, verhuren, schatten of kopen." },
  { n: "2", t: "Ontvang offertes", d: "Erkende makelaars uit je gemeente nemen vrijblijvend contact op." },
  { n: "3", t: "Vergelijk en kies", d: "Vergelijk aanpak en tarief en kies zelf de beste match." },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-300 ring-1 ring-white/15">
              Voor heel Vlaanderen en Brussel
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Vind de juiste vastgoedmakelaar in jouw gemeente
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              Vul je postcode in en vergelijk vrijblijvend offertes van erkende
              vastgoedmakelaars uit je buurt. Verkopen, verhuren of laten schatten: jij kiest.
            </p>
            <ul className="mt-6 grid gap-2.5 text-sm text-brand-100 sm:grid-cols-2">
              {["Erkende BIV-makelaars", "Gratis en vrijblijvend", "Uit je eigen gemeente", "Vergelijk tarieven"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-brand-900">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div id="leadform" className="lg:justify-self-end lg:pl-6">
            <LeadForm variant="hero" />
          </div>
        </div>

        {/* huis-skyline onderaan de hero */}
        <svg className="relative block w-full text-white" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M0 60 V34 h120 l40-14 40 14 h140 l30-10 30 10 h160 l50-16 50 16 h150 l35-12 35 12 h180 l45-14 45 14 h130 l40-12 40 12 h60 V60 Z"
          />
        </svg>
      </section>

      {/* Stappenplan */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-brand-900">Zo werkt het</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          In drie stappen van postcode naar de makelaar die bij jou past.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STAPPEN.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-lg font-extrabold text-white">
                {s.n}
              </span>
              <p className="mt-4 text-lg font-bold text-brand-900">{s.t}</p>
              <p className="mt-1.5 text-sm text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Populaire onderwerpen */}
      <section className="bg-brand-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">Populaire onderwerpen</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Praktische gidsen over kopen, verkopen en verhuren in Belgie.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAIR.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <span className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-900 group-hover:text-brand-700">{item.label}</span>
                  <svg className="text-accent-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-2 block text-sm text-slate-600">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Afsluitende CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="overflow-hidden rounded-3xl bg-brand-900 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Klaar om te vergelijken?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            {site.name} brengt je in contact met erkende vastgoedmakelaars in je gemeente. Gratis en vrijblijvend.
          </p>
          <Link
            href="/#leadform"
            className="mt-7 inline-block rounded-full bg-accent-500 px-7 py-3.5 font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400"
          >
            Vergelijk vastgoedmakelaars
          </Link>
        </div>
      </section>
    </main>
  );
}
