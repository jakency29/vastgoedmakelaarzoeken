import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Gebruiksvoorwaarden | Vastgoedmakelaar Zoeken" },
  description: "Lees wat Vastgoedmakelaar Zoeken aanbiedt, hoe aanvragen worden verwerkt en welke verantwoordelijkheid bij gebruiker en vastgoedkantoor blijft.",
  alternates: { canonical: "/voorwaarden" },
  robots: { index: false, follow: true },
};

export default function VoorwaardenPage() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700 hover:underline">Home</Link>
            <span aria-hidden="true" className="px-2 text-slate-300">/</span>
            <span aria-current="page" className="font-medium text-brand-800">Gebruiksvoorwaarden</span>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Gebruiksvoorwaarden</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-700">
            Deze voorwaarden beschrijven de rol van Vastgoedmakelaar Zoeken als vergelijkings- en
            informatieplatform. Ze vervangen geen offerte, verkoopopdracht of notarieel advies.
          </p>
          <time dateTime="2026-08-19" className="mt-3 block text-sm font-semibold text-brand-700">Bijgewerkt op 19 augustus 2026</time>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
        <h2 className="text-2xl font-extrabold text-brand-900">Wat biedt het platform?</h2>
        <p className="mt-3 leading-relaxed">
          {site.name} publiceert kennisbankartikelen, kantoorprofielen en vastgoedaanbod en laat bezoekers
          aanvragen indienen voor onder meer verkoop, verhuur, schatting en woningattesten. Het platform
          kan een aanvraag aan een of meer passende dienstverleners bezorgen, maar treedt niet zelf op als
          vastgoedmakelaar, notaris, schatter of keuringsorganisme.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Is een aanvraag bindend?</h2>
        <p className="mt-3 leading-relaxed">
          Het indienen van een aanvraag via deze website is gratis en vormt op zichzelf geen verkoopopdracht
          of overeenkomst met een vastgoedkantoor. Een dienstverlener moet tarieven, diensten, planning en
          contractvoorwaarden zelf duidelijk bevestigen. Je beslist zelf of je een voorstel aanvaardt.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Welke informatie moet je zelf controleren?</h2>
        <p className="mt-3 leading-relaxed">
          Controleer voor een beslissing de actuele BIV-inschrijving van de persoon die je dossier behandelt,
          de volledige offerte, de duur en opzegregels van een mandaat, de inbegrepen diensten en alle
          juridische of technische documenten. Reviews, richtprijzen en kantoorprofielen zijn hulpmiddelen,
          geen garantie op een bepaald resultaat.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Hoe wordt kennisbankinformatie gebruikt?</h2>
        <p className="mt-3 leading-relaxed">
          We streven naar actuele en controleerbare informatie en vermelden bronnen waar dat relevant is.
          Regels en bedragen kunnen wijzigen en de toepassing hangt vaak af van gewest, woning en dossier.
          Laat juridische, fiscale en technische beslissingen daarom bevestigen door de bevoegde instantie of
          professional.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Wat verwacht het platform van gebruikers?</h2>
        <p className="mt-3 leading-relaxed">
          Vul formulieren juist en alleen voor een echte aanvraag in. Deel geen gevoelige informatie die niet
          nodig is voor het eerste contact. Misbruik, geautomatiseerde spam en pogingen om de werking van de
          website te verstoren zijn niet toegestaan.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Contact en privacy</h2>
        <p className="mt-3 leading-relaxed">
          Vragen over deze voorwaarden kun je mailen naar <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline underline-offset-2">{site.email}</a>.
          Lees ook hoe persoonsgegevens worden verwerkt in het <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-2">privacybeleid</Link>.
        </p>
      </article>
    </main>
  );
}
