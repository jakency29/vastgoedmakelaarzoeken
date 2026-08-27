import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { aboutPageSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Over Vastgoedmakelaar Zoeken en eigenaar JAKENCY BV" },
  description:
    "Lees wie Vastgoedmakelaarzoeken.com beheert, wat het platform doet en hoe JAKENCY BV en Jan Kenis bij de website betrokken zijn.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700 hover:underline">Home</Link>
            <span aria-hidden="true" className="px-2 text-slate-300">/</span>
            <span aria-current="page" className="font-medium text-brand-800">Over ons</span>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Over Vastgoedmakelaar Zoeken
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-700">
            Vastgoedmakelaarzoeken.com is een Belgisch vergelijkings- en informatieplatform en is eigendom van {site.owner.legalName}.
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
        <h2 className="text-2xl font-extrabold text-brand-900">Wie is eigenaar van Vastgoedmakelaarzoeken.com?</h2>
        <p className="mt-3 leading-relaxed">
          {site.owner.legalName} is eigenaar en uitgever van Vastgoedmakelaarzoeken.com. De vennootschap is gevestigd aan {site.owner.streetAddress}, {site.owner.postalCode} {site.owner.addressLocality}. Het ondernemingsnummer is {site.owner.enterpriseNumber} en het btw-nummer is {site.owner.vatID}.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Wat doet Vastgoedmakelaar Zoeken?</h2>
        <p className="mt-3 leading-relaxed">
          Vastgoedmakelaar Zoeken helpt Belgische eigenaars om vastgoedkantoren, werkwijzen en voorwaarden te vergelijken. De website publiceert daarnaast praktische informatie over verkopen, kopen, verhuren, bouwen, energie, attesten en wonen.
        </p>
        <p className="mt-3 leading-relaxed">
          Het platform is zelf geen vastgoedmakelaar, notaris, schatter of keuringsorganisme. Een aanvraag kan aan een of meer passende dienstverleners worden bezorgd. De bezoeker kiest altijd zelf of hij of zij met een voorgestelde partij verdergaat.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Wie schrijft en controleert de kennisbank?</h2>
        <p className="mt-3 leading-relaxed">
          <Link href={site.author.path} className="font-semibold text-brand-700 underline underline-offset-2">Jan Kenis</Link> is oprichter van Vastgoedmakelaarzoeken.com en schrijft en onderhoudt de kennisbank. Hij is gepassioneerd door vastgoed en alles rond bouwen, energie, wonen en renovatie. Claims over regels, kosten en verplichtingen worden waar mogelijk gecontroleerd aan de hand van officiële bronnen.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Hoe wordt informatie actueel en controleerbaar gehouden?</h2>
        <p className="mt-3 leading-relaxed">
          Artikelen worden bijgewerkt wanneer bronnen, regelgeving of praktische vragen veranderen. Bij juridische, fiscale en technische beslissingen blijft de bevoegde overheid of erkende professional de aangewezen partij om de toepassing op een concreet dossier te bevestigen.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Hoe neem je contact op?</h2>
        <p className="mt-3 leading-relaxed">
          Vragen over de website, de kennisbank of de verwerking van een aanvraag kun je mailen naar <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline underline-offset-2">{site.email}</a>. Lees voor meer informatie ook onze <Link href="/werkwijze" className="font-semibold text-brand-700 underline underline-offset-2">werkwijze</Link>, het <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-2">privacybeleid</Link> en de <Link href="/voorwaarden" className="font-semibold text-brand-700 underline underline-offset-2">gebruiksvoorwaarden</Link>.
        </p>
      </article>

      <JsonLd data={aboutPageSchema()} />
    </main>
  );
}
