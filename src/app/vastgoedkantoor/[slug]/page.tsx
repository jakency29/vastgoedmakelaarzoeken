// Detailpagina van een vastgoedkantoor. Statisch gegenereerd uit de kantoren-lijst.
// RealEstateAgent structured data enkel voor echte (niet-voorbeeld) kantoren.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKantoor, getKantoorSlugs } from "@/lib/kantoren";
import { ElfsightForm } from "@/components/ElfsightForm";
import { JsonLd } from "@/components/JsonLd";
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
    title: { absolute: `${k.naam} | Vastgoedkantoor in ${k.gemeente}` },
    description: `${k.naam} is een vastgoedkantoor in ${k.gemeente} (${k.provincie}). Vraag vrijblijvend een offerte voor verkopen, verhuren of schatten.`,
    alternates: { canonical: `/vastgoedkantoor/${k.slug}` },
    robots: k.example ? { index: false, follow: true } : undefined,
  };
}

export default async function KantoorPage({ params }: Props) {
  const { slug } = await params;
  const k = getKantoor(slug);
  if (!k) notFound();

  const url = absoluteUrl(`/vastgoedkantoor/${k.slug}`);
  const schema =
    !k.example && {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: k.naam,
      url,
      areaServed: k.regios.map((r) => ({ "@type": "Place", name: r })),
      address: k.adres
        ? { "@type": "PostalAddress", addressLocality: k.gemeente, addressRegion: k.provincie, streetAddress: k.adres }
        : { "@type": "PostalAddress", addressLocality: k.gemeente, addressRegion: k.provincie },
      ...(k.telefoon ? { telephone: k.telefoon } : {}),
      ...(k.email ? { email: k.email } : {}),
    };

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href="/vastgoedkantoren" className="hover:text-brand-700 hover:underline">Vastgoedkantoren</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">{k.naam}</li>
            </ol>
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{k.naam}</h1>
            {k.example && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                Voorbeeldprofiel
              </span>
            )}
          </div>
          <p className="mt-2 text-lg text-slate-600">
            Vastgoedkantoor in {k.gemeente}, {k.provincie}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <p className="leading-relaxed text-slate-700">{k.intro}</p>

            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Diensten</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {k.diensten.map((d) => (
                <li key={d} className="flex items-center gap-2 text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-brand-900">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Werkingsgebied</h2>
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

            {(k.adres || k.telefoon || k.email || k.website) && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Contact</h2>
                <ul className="mt-3 space-y-1 text-slate-700">
                  {k.adres && <li>{k.adres}, {k.gemeente}</li>}
                  {k.telefoon && <li>{k.telefoon}</li>}
                  {k.email && <li>{k.email}</li>}
                  {k.website && (
                    <li>
                      <a href={k.website} rel="noopener noreferrer" className="font-medium text-brand-700 underline underline-offset-2">
                        Website
                      </a>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>

          <aside id="leadform" className="lg:order-2">
            <div className="lg:sticky lg:top-24">
              <ElfsightForm />
            </div>
          </aside>
        </div>
      </div>

      {schema && <JsonLd data={schema} />}
    </main>
  );
}
