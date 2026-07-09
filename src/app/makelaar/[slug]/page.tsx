// Makelaarsprofiel (/makelaar/<slug>) in Zillow-agent-stijl: foto, naam, functie, kantoor,
// rating (van het kantoor), bio, werkingsgebied, contact en reviews. Leadformulier via Elfsight.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMakelaar, getMakelaarSlugs } from "@/lib/makelaars";
import { getKantoor } from "@/lib/kantoren";
import { getPlaceReviews } from "@/lib/reviews";
import { woningenVanKantoor } from "@/lib/woningen";
import { WoningCard } from "@/components/WoningCard";
import { SellerLeadForm } from "@/components/SellerLeadForm";
import { Rating } from "@/components/Rating";
import { Reviews } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMakelaarSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMakelaar(slug);
  if (!m) return {};
  const k = getKantoor(m.kantoorSlug);
  return {
    title: { absolute: `${m.naam} | Vastgoedmakelaar${k ? ` ${k.gemeente}` : ""}`.slice(0, 60) },
    description:
      `${m.naam} is ${m.functie.toLowerCase()}${k ? ` bij ${k.naam} in ${k.gemeente}` : ""}. Bekijk het profiel, het werkingsgebied en de reviews en vraag vrijblijvend een offerte.`.slice(0, 155),
    alternates: { canonical: `/makelaar/${m.slug}` },
  };
}

export default async function MakelaarPage({ params }: Props) {
  const { slug } = await params;
  const m = getMakelaar(slug);
  if (!m) notFound();
  const k = getKantoor(m.kantoorSlug);
  const reviews = k ? await getPlaceReviews(k.googlePlaceId) : null;
  const aanbod = woningenVanKantoor(m.kantoorSlug);
  const url = absoluteUrl(`/makelaar/${m.slug}`);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.naam,
    url,
    jobTitle: m.functie,
    ...(m.foto ? { image: absoluteUrl(m.foto) } : {}),
    ...(k
      ? {
          worksFor: {
            "@type": "RealEstateAgent",
            name: k.naam,
            url: absoluteUrl(`/kantoor/${k.slug}`),
            ...(reviews && reviews.total
              ? { aggregateRating: { "@type": "AggregateRating", ratingValue: reviews.rating, reviewCount: reviews.total } }
              : {}),
          },
          areaServed: k.regios.map((r) => ({ "@type": "Place", name: r })),
        }
      : {}),
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
              {k && (
                <>
                  <li aria-hidden="true" className="text-slate-300">/</li>
                  <li><Link href={`/kantoor/${k.slug}`} className="hover:text-brand-700 hover:underline">{k.naam}</Link></li>
                </>
              )}
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">{m.naam}</li>
            </ol>
          </nav>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            {m.foto && (
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.foto} alt={`${m.naam}, ${m.functie}`} width={112} height={112} className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{m.naam}</h1>
              <p className="mt-1 text-lg text-slate-600">
                {m.functie}
                {k ? (
                  <>
                    {" "}bij{" "}
                    <Link href={`/kantoor/${k.slug}`} className="font-medium text-brand-700 underline underline-offset-2">
                      {k.naam}
                    </Link>
                  </>
                ) : null}
              </p>
              {reviews && reviews.total ? (
                <div className="mt-2 flex items-center gap-2">
                  <Rating rating={reviews.rating} />
                  <span className="text-sm font-semibold text-brand-900">{reviews.rating.toFixed(1)}</span>
                  <a href="#reviews" className="text-sm text-slate-500 hover:text-brand-700">({reviews.total} reviews)</a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="min-w-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Over {m.naam}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">{m.bio}</p>

            {aanbod.length > 0 && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Aanbod van {m.naam}</h2>
                <p className="mt-3 text-slate-700">
                  {aanbod.length === 1 ? "Deze woning staat" : `Deze ${aanbod.length} woningen staan`} momenteel te koop{k ? ` via ${k.naam}` : ""}.
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {aanbod.map((w) => <WoningCard key={w.id} w={w} />)}
                </div>
              </>
            )}

            {k && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Werkingsgebied</h2>
                <p className="mt-3 text-slate-700">{m.naam} is actief in {k.regios.join(", ")}.</p>
              </>
            )}

            <h2 id="contact" className="mt-8 scroll-mt-24 text-2xl font-extrabold tracking-tight text-brand-900">Contacteer {m.naam}</h2>
            <p className="mt-3 max-w-2xl text-slate-700">
              Wil je je woning verkopen of heb je een vraag? Vul het formulier in. Wij verwerken je aanvraag en bezorgen ze, zodat je vrijblijvend antwoord krijgt.
            </p>
            <div className="mt-4 max-w-xl">
              <SellerLeadForm kantoor={k?.naam} />
            </div>

            {reviews && k ? <Reviews data={reviews} placeId={k.googlePlaceId} naam={k.naam} /> : null}
        </div>
      </div>

      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "Vastgoedkantoren", path: "/kantoor" },
        ...(k ? [{ name: k.naam, path: `/kantoor/${k.slug}` }] : []),
        { name: m.naam, path: `/makelaar/${m.slug}` },
      ])} />
    </main>
  );
}
