// Detailpagina van een vastgoedkantoor (/kantoor/<slug>) in Zillow-stijl: profielhoofding met
// foto, rating en makelaar, daarna diensten, werkingsgebied, contact, Google-reviews, FAQ en
// gerelateerde kantoren. RealEstateAgent (met aggregateRating) + BreadcrumbList + FAQPage schema.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKantoor, getKantoorSlugs, kantoren, type Kantoor } from "@/lib/kantoren";
import { getMakelaarByKantoor } from "@/lib/makelaars";
import { woningenVanKantoor } from "@/lib/woningen";
import { WoningCard } from "@/components/WoningCard";
import { getPlaceReviews } from "@/lib/reviews";
import { Faq } from "@/components/Faq";
import { Rating } from "@/components/Rating";
import { PremiumBadge } from "@/components/PremiumBadge";
import { Reviews } from "@/components/Reviews";
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
      `${k.naam} is een erkend vastgoedkantoor in ${k.gemeente} (${k.provincie}). Bekijk diensten, werkingsgebied en reviews en vraag vrijblijvend een offerte.`.slice(0, 155),
    alternates: { canonical: `/kantoor/${k.slug}` },
  };
}

function buildFaq(k: Kantoor) {
  const faq = [
    {
      q: `Welke diensten biedt ${k.naam} aan?`,
      a: `${k.naam} biedt onder meer ${k.diensten.slice(0, 5).join(", ")}. Vraag een offerte aan om aanbod en tarief te vergelijken met andere kantoren.`,
    },
    { q: `In welke regio is ${k.naam} actief?`, a: `${k.naam} is actief in ${k.regios.join(", ")}.` },
  ];
  if (k.adres) {
    faq.push({
      q: `Waar is ${k.naam} gevestigd?`,
      a: `${k.naam} is gevestigd op ${k.adres}${k.postcode ? `, ${k.postcode}` : ""} ${k.gemeente}, in de provincie ${k.provincie}.`,
    });
  }
  faq.push({
    q: `Hoe neem ik contact op met ${k.naam}?`,
    a: `Je bereikt ${k.naam} rechtstreeks via de contactgegevens op deze pagina${k.makelaar ? `, of via makelaar ${k.makelaar}` : ""}. Wil je meerdere kantoren vrijblijvend vergelijken, gebruik dan de knop Gratis offertes bovenaan de pagina.`,
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
  const reviews = await getPlaceReviews(k.googlePlaceId);
  const makelaar = getMakelaarByKantoor(k.slug);
  const aanbod = woningenVanKantoor(k.slug);

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
    ...(reviews && reviews.total
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviews.rating,
            reviewCount: reviews.total,
          },
          review: reviews.reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            reviewBody: r.text,
          })),
        }
      : {}),
  };

  return (
    <main>
      {/* Profielhoofding (Zillow-stijl) */}
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

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            {k.foto && (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={k.foto}
                  alt={k.makelaar ? `${k.makelaar}, makelaar bij ${k.naam}` : `${k.naam} logo`}
                  width={112}
                  height={112}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{k.naam}</h1>
                {k.premium && <PremiumBadge />}
              </div>
              <p className="mt-1 text-lg text-slate-600">
                Vastgoedkantoor in {k.gemeente}, {k.provincie}
                {k.makelaar ? (
                  <>
                    {" "}| Makelaar:{" "}
                    {makelaar ? (
                      <Link href={`/makelaar/${makelaar.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
                        {k.makelaar}
                      </Link>
                    ) : (
                      k.makelaar
                    )}
                  </>
                ) : null}
              </p>
              {reviews && reviews.total ? (
                <div className="mt-2 flex items-center gap-2">
                  <Rating rating={reviews.rating} />
                  <span className="text-sm font-semibold text-brand-900">{reviews.rating.toFixed(1)}</span>
                  <a href="#reviews" className="text-sm text-slate-500 hover:text-brand-700">
                    ({reviews.total} Google-reviews)
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="min-w-0">
            <p className="max-w-3xl leading-relaxed text-slate-700">{k.intro}</p>

            {aanbod.length > 0 && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Woningen te koop bij {k.naam}</h2>
                <p className="mt-3 text-slate-700">
                  {aanbod.length === 1 ? "Deze woning staat" : `Deze ${aanbod.length} woningen staan`} momenteel te koop via {k.naam}.
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {aanbod.map((w) => <WoningCard key={w.id} w={w} />)}
                </div>
              </>
            )}

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

            {makelaar && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Makelaar</h2>
                <Link
                  href={`/makelaar/${makelaar.slug}`}
                  className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                >
                  {makelaar.foto && (
                    <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={makelaar.foto} alt={`${makelaar.naam}, ${makelaar.functie}`} width={64} height={64} className="h-full w-full object-cover" />
                    </span>
                  )}
                  <span>
                    <span className="block font-bold text-brand-900">{makelaar.naam}</span>
                    <span className="block text-sm text-slate-500">{makelaar.functie}</span>
                    <span className="mt-0.5 block text-sm font-semibold text-brand-700">Bekijk profiel</span>
                  </span>
                </Link>
              </>
            )}

            {reviews ? <Reviews data={reviews} placeId={k.googlePlaceId} naam={k.naam} /> : null}

            <Faq items={faq} />
            <RelatedLinks items={related} />
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
