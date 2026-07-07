// Detailpagina van een vastgoedkantoor (/kantoor/<slug>). Foto, diensten, werkingsgebied,
// contact, FAQ en gerelateerde kantoren. RealEstateAgent + BreadcrumbList + FAQPage schema.
// Leadformulier centraal via Elfsight.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKantoor, getKantoorSlugs, kantoren, type Kantoor } from "@/lib/kantoren";
import { ElfsightForm } from "@/components/ElfsightForm";
import { Faq } from "@/components/Faq";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getKantoorSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const k = getKantoor(slug);
  if (!k) return {};
  return {
    title: { absolute: `${k.naam} | Vastgoedkantoor ${k.gemeente}` },
    description:
      `${k.naam} is een erkend vastgoedkantoor in ${k.gemeente} (${k.provincie}). Bekijk de diensten en het werkingsgebied en vraag vrijblijvend een offerte.`.slice(0, 155),
    alternates: { canonical: `/kantoor/${k.slug}` },
  };
}

// Feitelijke FAQ, afgeleid uit de kantoorgegevens (voedt de zichtbare FAQ + FAQPage).
function buildFaq(k: Kantoor) {
  const faq = [
    {
      q: `Welke diensten biedt ${k.naam} aan?`,
      a: `${k.naam} biedt onder meer ${k.diensten.slice(0, 5).join(", ")}. Vraag een offerte aan om aanbod en tarief te vergelijken met andere kantoren.`,
    },
    {
      q: `In welke regio is ${k.naam} actief?`,
      a: `${k.naam} is actief in ${k.regios.join(", ")}.`,
    },
  ];
  if (k.adres) {
    faq.push({
      q: `Waar is ${k.naam} gevestigd?`,
      a: `${k.naam} is gevestigd op ${k.adres}${k.postcode ? `, ${k.postcode}` : ""} ${k.gemeente}, in de provincie ${k.provincie}.`,
    });
  }
  faq.push({
    q: `Hoe vraag ik een offerte aan bij een vastgoedkantoor?`,
    a: `Vul het formulier op deze pagina in met je postcode en je vraag. Wij bezorgen je aanvraag aan erkende vastgoedmakelaars in je regio, zodat je vrijblijvend kunt vergelijken.`,
  });
  return faq;
}

function buildRelated(k: Kantoor) {
  const zelfde = kantoren.filter((o) => o.slug !== k.slug && o.provincie === k.provincie);
  const rest = kantoren.filter((o) => o.slug !== k.slug && o.provincie !== k.provincie);
  const others = [...zelfde, ...rest].slice(0, 2);
  return [
    ...others.map((o) => ({ label: `${o.naam} in ${o.gemeente}`, slug: `kantoor/${o.slug}` })),
    { label: "Kosten van een vastgoedmakelaar", slug: "kosten-vastgoedmakelaar" },
  ];
}

export default async function KantoorPage({ params }: Props) {
  const { slug } = await params;
  const k = getKantoor(slug);
  if (!k) notFound();

  const url = absoluteUrl(`/kantoor/${k.slug}`);
  const faq = buildFaq(k);
  const related = buildRelated(k);

  const agentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: k.naam,
    url,
    ...(k.foto ? { image: absoluteUrl(k.foto) } : {}),
    ...(k.telefoon ? { telephone: k.telefoon } : {}),
    ...(k.email ? { email: k.email } : {}),
    ...(k.website ? { sameAs: [k.website] } : {}),
    ...(k.makelaar ? { employee: { "@type": "Person", name: k.makelaar } } : {}),
    address: {
      "@type": "PostalAddress",
      ...(k.adres ? { streetAddress: k.adres } : {}),
      ...(k.postcode ? { postalCode: k.postcode } : {}),
      addressLocality: k.gemeente,
      addressRegion: k.provincie,
      addressCountry: "BE",
    },
    areaServed: k.regios.map((r) => ({ "@type": "Place", name: r })),
  };

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href="/kantoor" className="hover:text-brand-700 hover:underline">Vastgoedkantoren</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">{k.naam}</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{k.naam}</h1>
          <p className="mt-2 text-lg text-slate-600">
            Vastgoedkantoor in {k.gemeente}, {k.provincie}
            {k.makelaar ? <> | Makelaar: {k.makelaar}</> : null}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {k.foto && (
              <div className="mb-6 flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={k.foto} alt={k.makelaar ? `${k.makelaar}, makelaar bij ${k.naam}` : `${k.naam} vastgoedkantoor ${k.gemeente}`} width={900} height={600} className="max-h-64 w-auto rounded-xl object-contain" />
              </div>
            )}

            <p className="leading-relaxed text-slate-700">{k.intro}</p>

            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Welke diensten biedt {k.naam}?</h2>
            <p className="mt-3 text-slate-700">Het kantoor biedt de volgende diensten aan.</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {k.diensten.map((d) => (
                <li key={d} className="flex items-center gap-2 text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-brand-900">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">In welke regio is {k.naam} actief?</h2>
            <p className="mt-3 text-slate-700">
              {k.naam} is actief in {k.regios.join(", ")}.
              {k.provincieSlug ? (
                <>
                  {" "}
                  Bekijk alle{" "}
                  <Link href={`/${k.provincieSlug}`} className="font-medium text-brand-700 underline underline-offset-2">
                    vastgoedkantoren in {k.provincie}
                  </Link>
                  .
                </>
              ) : null}
            </p>

            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Contactgegevens</h2>
            <ul className="mt-3 space-y-1.5 text-slate-700">
              {k.adres && <li>{k.adres}{k.postcode ? `, ${k.postcode}` : ""} {k.gemeente}</li>}
              {k.telefoon && <li>{k.telefoon}</li>}
              {k.email && <li>{k.email}</li>}
              {k.website && (
                <li>
                  <a href={k.website} rel="noopener noreferrer nofollow" target="_blank" className="font-medium text-brand-700 underline underline-offset-2">
                    Website
                  </a>
                </li>
              )}
              {k.bivNummer && <li className="text-sm text-slate-500">BIV-erkenning {k.bivNummer}</li>}
            </ul>

            <Faq items={faq} />
            <RelatedLinks items={related} />
          </div>

          <aside id="leadform" className="lg:order-2">
            <div className="lg:sticky lg:top-24">
              <ElfsightForm />
            </div>
          </aside>
        </div>
      </div>

      <JsonLd data={agentSchema} />
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "Vastgoedkantoren", path: "/kantoor" },
        { name: k.naam, path: `/kantoor/${k.slug}` },
      ])} />
      <JsonLd data={faqPageSchema(faq)} />
    </main>
  );
}
