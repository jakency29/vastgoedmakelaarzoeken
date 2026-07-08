// Homepage in vastgoedportaal-stijl: navy zoek-hero met prominente leadkaart,
// stappenplan, SEO-content rond de commerciele kernzoekwoorden, FAQ en card-onderwerpen.

import type { Metadata } from "next";
import Link from "next/link";
import { ElfsightForm } from "@/components/ElfsightForm";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WoningCard } from "@/components/WoningCard";
import { woningen } from "@/lib/woningen";
import { kantoren } from "@/lib/kantoren";
import { site, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Vastgoedmakelaar zoeken en vergelijken | Gratis offertes" },
  description:
    "Zoek en vergelijk erkende vastgoedmakelaars in jouw gemeente. Vraag gratis en vrijblijvend offertes op voor verkopen, verhuren of je woning laten schatten.",
  alternates: { canonical: "/" },
};

const POPULAIR = [
  { label: "Huis laten schatten", href: "/huis-laten-schatten", desc: "Ken de waarde van je woning voor je verkoopt." },
  { label: "Waarde woning berekenen", href: "/waarde-woning-berekenen", desc: "Gratis online indicatie op basis van je adres." },
  { label: "Kosten vastgoedmakelaar", href: "/kosten-vastgoedmakelaar", desc: "Wat een makelaar kost en hoe je vergelijkt." },
  { label: "Kosten verkoop huis", href: "/kosten-verkoop-huis", desc: "Alle kosten bij de verkoop van je woning." },
  { label: "Verplichtingen bij verkoop", href: "/huis-verkopen-verplichtingen", desc: "Alle attesten en documenten op een rij." },
  { label: "Registratierechten", href: "/registratierechten", desc: "2% of 12% verkooprecht in Vlaanderen." },
];

const STAPPEN = [
  { n: "1", t: "Vul je postcode in", d: "Vertel wat je wil doen: verkopen, verhuren, schatten of kopen." },
  { n: "2", t: "Ontvang offertes", d: "Erkende makelaars uit je gemeente nemen vrijblijvend contact op." },
  { n: "3", t: "Vergelijk en kies", d: "Vergelijk aanpak en tarief en kies zelf de beste match." },
];

const FAQ = [
  {
    q: "Wat is Vastgoedmakelaar Zoeken?",
    a: "Vastgoedmakelaar Zoeken is een gratis vergelijkingsdienst. Je vult je postcode in en ontvangt vrijblijvend offertes van erkende vastgoedmakelaars uit je eigen gemeente voor verkopen, verhuren of schatten.",
  },
  {
    q: "Is een makelaar vergelijken gratis?",
    a: "Ja. Offertes opvragen en vergelijken is gratis en vrijblijvend. Je beslist zelf of en met welke makelaar je in zee gaat.",
  },
  {
    q: "Hoe vind ik een goede vastgoedmakelaar?",
    a: "Je vindt een goede vastgoedmakelaar door meerdere offertes te vergelijken op tarief, aanpak en kennis van je gemeente. Vraag naar de verkoopstrategie, de kosten en de looptijd van het mandaat voordat je tekent.",
  },
  {
    q: "Wat kost een vastgoedmakelaar bij verkoop?",
    a: "De commissie ligt meestal tussen 2% en 4% van de verkoopprijs, exclusief btw. Er is geen wettelijk tarief, dus vergelijken loont. Meer lees je op de pagina over de kosten van een vastgoedmakelaar.",
  },
  {
    q: "Voor welke regio's kan ik een makelaar vinden?",
    a: "Voor heel Vlaanderen en Brussel. Je vindt erkende vastgoedmakelaars en immokantoren in je eigen gemeente en de ruimere regio.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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
              Vind en vergelijk de juiste vastgoedmakelaar
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
            <ElfsightForm />
          </div>
        </div>

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

      {/* SEO-content rond de kernzoekwoorden */}
      <section className="bg-brand-50/60">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
            Een vastgoedmakelaar zoeken en vergelijken
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Een vastgoedmakelaar vergelijken loont, want elk kantoor bepaalt zelf zijn tarief en
            aanpak. Door meerdere erkende makelaars uit je gemeente naast elkaar te leggen, kies je
            wie het best past bij jouw woning en buurt. Vul je postcode in en ontvang vrijblijvend
            offertes voor verkopen, verhuren of het laten schatten van je woning.
          </p>

          <h3 className="mt-8 text-xl font-bold text-brand-900">Wat doet een vastgoedmakelaar?</h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Een vastgoedmakelaar begeleidt de verkoop of verhuur van je woning van A tot Z:
            waardebepaling, fotografie en marketing, bezoeken, onderhandeling met kandidaten en de
            administratieve opvolging tot de akte. In Belgie moet elke makelaar erkend zijn bij het
            BIV, het Beroepsinstituut van Vastgoedmakelaars.
          </p>

          <h3 className="mt-8 text-xl font-bold text-brand-900">Hoe vind je een goede vastgoedmakelaar?</h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Je vindt een goede vastgoedmakelaar door offertes te vergelijken op tarief, aanpak en
            kennis van je gemeente. Vraag naar de verkoopstrategie, de inbegrepen diensten en de
            looptijd van het mandaat voordat je tekent. Zo vergelijk je prijs en dienstverlening in
            een keer en kies je met vertrouwen.
          </p>

          <h3 className="mt-8 text-xl font-bold text-brand-900">Wat kost een vastgoedmakelaar?</h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            De commissie van een vastgoedmakelaar ligt in Vlaanderen meestal tussen 2% en 4% van de
            verkoopprijs, exclusief btw. Er is geen wettelijk tarief, dus vergelijken loont. Meer lees
            je op de pagina over de{" "}
            <Link href="/kosten-vastgoedmakelaar" className="font-medium text-brand-700 underline underline-offset-2">
              kosten van een vastgoedmakelaar
            </Link>
            .
          </p>

          <h3 className="mt-8 text-xl font-bold text-brand-900">Makelaars en immokantoren in jouw regio</h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Via {site.name} vind je erkende vastgoedmakelaars en immokantoren in heel Vlaanderen en
            Brussel, van je eigen gemeente tot de ruimere regio. Zo werk je samen met een makelaar die
            de lokale markt kent en de vraagprijs juist inschat.
          </p>
        </div>
      </section>

      {/* Vastgoedkantoren */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">Vastgoedkantoren</h2>
            <p className="mt-2 text-slate-600">Erkende kantoren uit heel Vlaanderen op ons platform.</p>
          </div>
          <Link href="/kantoor" className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:border-brand-300 sm:inline-block">
            Alle kantoren
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kantoren.slice(0, 8).map((k) => (
            <Link
              key={k.slug}
              href={`/kantoor/${k.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <div className="flex h-24 items-center justify-center border-b border-slate-100 bg-slate-50 p-3">
                {k.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={k.foto} alt={`${k.naam} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-center text-sm font-extrabold text-brand-200">{k.naam}</span>
                )}
              </div>
              <div className="p-4">
                <p className="font-bold text-brand-900 group-hover:text-brand-700">{k.naam}</p>
                <p className="text-sm text-slate-500">{k.gemeente}, {k.provincie}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Laatste huizen te koop */}
      {woningen.length > 0 && (
        <section className="bg-brand-50/60">
          <div className="mx-auto max-w-7xl px-4 py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">Laatste huizen te koop</h2>
                <p className="mt-2 text-slate-600">Recent aanbod bij de vastgoedkantoren op ons platform.</p>
              </div>
              <Link href="/huis-te-koop" className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:border-brand-300 sm:inline-block">
                Alle woningen
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {woningen.slice(0, 3).map((w) => <WoningCard key={w.id} w={w} />)}
            </div>
          </div>
        </section>
      )}

      {/* Populaire onderwerpen */}
      <section className="mx-auto max-w-7xl px-4 py-14">
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
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-4">
        <Faq items={FAQ} />
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

      <JsonLd data={faqSchema} />
    </main>
  );
}
