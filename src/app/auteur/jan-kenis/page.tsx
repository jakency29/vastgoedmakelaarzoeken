import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { authorProfilePageSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Jan Kenis, auteur van de vastgoedkennisbank" },
  description:
    "Lees wie Jan Kenis is en hoe hij de kennisbank van Vastgoedmakelaar Zoeken schrijft en inhoudelijk bijwerkt.",
  alternates: { canonical: site.author.path },
};

export default function JanKenisPage() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700 hover:underline">Home</Link>
            <span aria-hidden="true" className="px-2 text-slate-300">/</span>
            <Link href="/kennisbank" className="hover:text-brand-700 hover:underline">Kennisbank</Link>
            <span aria-hidden="true" className="px-2 text-slate-300">/</span>
            <span aria-current="page" className="font-medium text-brand-800">Jan Kenis</span>
          </nav>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-brand-600">Auteur van de kennisbank</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Jan Kenis</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-700">
            Jan Kenis is oprichter van Jakency en schrijft en onderhoudt de kennisbank van Vastgoedmakelaar Zoeken.
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
        <h2 className="text-2xl font-extrabold text-brand-900">Welke rol heeft Jan Kenis?</h2>
        <p className="mt-3 leading-relaxed">
          Jan bepaalt de redactionele structuur, controleert claims en werkt artikelen bij wanneer regelgeving, bronnen of zoekvragen veranderen. Hij is geen vastgoedmakelaar, notaris of juridisch adviseur. Juridische, fiscale en technische beslissingen laat je daarom bevestigen door de bevoegde instantie of professional.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Waarop is zijn werkwijze gebaseerd?</h2>
        <p className="mt-3 leading-relaxed">
          De artikelen beginnen met een direct antwoord en verwijzen waar nodig naar officiële Belgische en Vlaamse bronnen. Informatie over kosten, termijnen en verplichtingen krijgt een datum of broncontext, zodat je kunt beoordelen of een gegeven nog actueel is.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold text-brand-900">Waar vind je meer informatie over Jan?</h2>
        <p className="mt-3 leading-relaxed">
          Lees het uitgebreide <a href={site.author.profileUrl} className="font-semibold text-brand-700 underline underline-offset-2">professionele profiel van Jan Kenis bij Jakency</a> of bekijk zijn <a href={site.author.linkedinUrl} className="font-semibold text-brand-700 underline underline-offset-2">LinkedIn-profiel</a>. Ga naar de <Link href="/kennisbank" className="font-semibold text-brand-700 underline underline-offset-2">kennisbank</Link> voor alle vastgoedartikelen.
        </p>
      </article>

      <JsonLd data={authorProfilePageSchema()} />
    </main>
  );
}
