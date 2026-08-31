import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Privacybeleid | Vastgoedmakelaar Zoeken" },
  description: "Lees welke gegevens Vastgoedmakelaar Zoeken via formulieren verwerkt, waarom dat gebeurt en welke privacyrechten je kunt uitoefenen.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700 hover:underline">Home</Link>
            <span aria-hidden="true" className="px-2 text-slate-300">/</span>
            <span aria-current="page" className="font-medium text-brand-800">Privacybeleid</span>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Privacybeleid</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-700">
            Vastgoedmakelaar Zoeken verwerkt de gegevens die je zelf via een formulier bezorgt om je
            vraag te beantwoorden of aan een passend vastgoedkantoor door te sturen.
          </p>
          <time dateTime="2026-09-01" className="mt-3 block text-sm font-semibold text-brand-700">Bijgewerkt op 1 september 2026</time>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
        <h2 className="text-2xl font-extrabold text-brand-900">Wie verwerkt je gegevens?</h2>
        <p className="mt-3 leading-relaxed">
          Vastgoedmakelaarzoeken.com is eigendom van {site.owner.legalName}, gevestigd aan {site.owner.streetAddress}, {site.owner.postalCode} {site.owner.addressLocality}. {site.owner.legalName} is het eerste aanspreekpunt voor vragen over de verwerking. Je bereikt ons via <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline underline-offset-2">{site.email}</a>.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Welke gegevens verzamelen we?</h2>
        <p className="mt-3 leading-relaxed">Afhankelijk van het formulier gaat het om naam, e-mailadres, telefoonnummer, postcode, adres van het pand, type aanvraag en de informatie die je zelf in het bericht invult. Technische spamcontrole kan ook formuliergegevens verwerken.</p>
        <p className="mt-3 leading-relaxed">
          Voor gratis kantoorvermeldingen kunnen we openbare bedrijfsgegevens verwerken, zoals de
          kantoornaam, het vestigingsadres, een algemeen zakelijk e-mailadres, telefoonnummer,
          website, BIV-vermelding en andere controleerbare bedrijfsinformatie.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Gratis kantoorvermeldingen en eenmalige kennisgeving</h2>
        <p className="mt-3 leading-relaxed">
          Kandidaten voor een gratis vermelding kunnen afkomstig zijn uit openbare bedrijvengidsen,
          de officiële website van het kantoor en het openbare BIV-register. We controleren gegevens
          vóór publicatie en gebruiken alleen een algemeen bedrijfsadres, zoals info@, contact@ of
          immo@, om het kantoor eenmalig over de gratis vermelding te informeren. Persoonlijke
          werkadressen op naam gebruiken we hiervoor niet zonder voorafgaande toestemming.
        </p>
        <p className="mt-3 leading-relaxed">
          Waar de AVG van toepassing is, baseren we deze beperkte verwerking op ons gerechtvaardigde
          belang om de bedrijvengids actueel te houden en het betrokken kantoor transparant te
          informeren. Elk kantoor kan kosteloos bezwaar maken door op het bericht te antwoorden of
          te mailen naar {site.email}. Na bezwaar stoppen we de communicatie en bewaren we alleen de
          minimale gegevens die nodig zijn om dat bezwaar te respecteren.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Waarom en met wie verwerken we die gegevens?</h2>
        <p className="mt-3 leading-relaxed">
          We gebruiken de gegevens om je aanvraag te verwerken, vragen te beantwoorden, een aangevraagd
          prijsvoorstel mogelijk te maken en misbruik van formulieren te beperken. Een aanvraag voor een
          vastgoedmakelaar kan worden bezorgd aan een of meer kantoren die bij de gekozen regio of het
          geselecteerde profiel passen. We verkopen de formuliergegevens niet als adressenbestand.
        </p>
        <p className="mt-3 leading-relaxed">
          Formulieren worden technisch verstuurd via Web3Forms. Volgens de gepubliceerde documentatie
          bewaart Web3Forms geen formulierinzendingen. Controleer voor details ook het actuele
          <a href="https://web3forms.com/privacy" className="ml-1 font-semibold text-brand-700 underline underline-offset-2">privacybeleid van Web3Forms</a>.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Hoelang bewaren we gegevens?</h2>
        <p className="mt-3 leading-relaxed">
          We bewaren persoonsgegevens niet langer dan nodig voor de behandeling en opvolging van de
          aanvraag, en langer wanneer een wettelijke verplichting of een lopend geschil dat vereist.
          De ontvanger van een doorgestuurde aanvraag is verantwoordelijk voor de eigen verdere verwerking.
        </p>
        <p className="mt-3 leading-relaxed">
          Niet-geverifieerde kandidaten voor kantoorvermeldingen worden uiterlijk binnen twaalf
          maanden opnieuw gecontroleerd of verwijderd. Gegevens over een eenmalige kennisgeving
          bewaren we maximaal vierentwintig maanden. Een minimaal suppressierecord kan langer worden
          bewaard om een afmelding blijvend te respecteren.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Welke rechten heb je?</h2>
        <p className="mt-3 leading-relaxed">
          Je kunt vragen om inzage, verbetering, verwijdering of beperking van je persoonsgegevens en
          bezwaar maken tegen een verwerking. Mail je verzoek naar {site.email}. We kunnen om voldoende
          informatie vragen om je identiteit en de betrokken aanvraag te controleren.
        </p>
        <p className="mt-3 leading-relaxed">
          Je kunt ook een klacht indienen bij de
          <a href="https://www.gegevensbeschermingsautoriteit.be/" className="ml-1 font-semibold text-brand-700 underline underline-offset-2">Belgische Gegevensbeschermingsautoriteit</a>.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Gebruikt de site marketingcookies?</h2>
        <p className="mt-3 leading-relaxed">
          De huidige websitecode plaatst geen eigen advertentie- of analysetrackers. Wanneer dat verandert,
          moet deze verklaring worden aangepast en wordt waar nodig vooraf toestemming gevraagd.
        </p>
      </article>
    </main>
  );
}
