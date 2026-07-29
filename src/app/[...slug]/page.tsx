// Catch-all voor alle content-pagina's. Statisch gegenereerd uit de content-registry.
// Onbekende slugs -> 404 (dynamicParams = false). Expliciete routes (contact, api, ...)
// hebben voorrang op deze catch-all.

import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getAllSlugParams, getPageBySlug } from "@/lib/content";
import { pageGraph } from "@/lib/jsonld";
import { dienstCtaLabel, dienstVoorSlug } from "@/lib/dienst-cta";
import { pageVisualConfig } from "@/lib/page-visual";
import { mdxComponents } from "@/components/mdx";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { DienstLeadForm } from "@/components/DienstLeadForm";
import { DienstCTA } from "@/components/DienstCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Faq } from "@/components/Faq";
import { CommercialNextStep } from "@/components/CommercialNextStep";
import { EditorialSources } from "@/components/EditorialSources";
import { PracticalExample } from "@/components/PracticalExample";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugParams();
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug.join("/"));
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: path },
    robots: page.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title: page.title, description: page.description, url: path, type: "article" },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug.join("/"));
  if (!page) notFound();

  const { content } = await compileMDX({
    source: page.body,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const showForm = page.showLeadForm !== false;
  // Dienst-pagina's (asbestattest, EPC, keuring, ...) krijgen het dienst-formulier in de
  // zijbalk; overige pagina's het algemene makelaarsformulier.
  const dienst = dienstVoorSlug(page.slug);
  const visual = pageVisualConfig(page, Boolean(dienst));
  // CTA-knop (Typeform) op kennisbank-artikels, niet op de kantoren-directorypagina's.
  const showCta = !page.slug.startsWith("vastgoedkantoren/");
  const ctaLabel = dienstCtaLabel(page.slug);
  const showProminentForm = showForm && visual.prominentForm;
  const showDeferredForm = showForm && !visual.prominentForm;
  const form = dienst ? (
    <DienstLeadForm dienst={dienst.naam} cta={dienst.cta} slug={page.slug} />
  ) : (
    <LeadForm variant="sidebar" />
  );

  return (
    <article data-visual-type={visual.type}>
      {/* Kop-band met breadcrumbs, H1 en intro op een lichte achtergrond. */}
      <header className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          {page.breadcrumbs?.length ? (
            <div className="mb-4">
              <Breadcrumbs items={page.breadcrumbs} />
            </div>
          ) : null}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
              {visual.label}
            </span>
            <span className="text-sm text-slate-500">{visual.description}</span>
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            {page.h1}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{page.description}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className={showProminentForm ? "grid gap-10 lg:grid-cols-[1fr_360px]" : ""}>
          {showProminentForm && (
            <aside id="leadform" className="lg:order-2">
              <div className="lg:sticky lg:top-24">
                {form}
              </div>
            </aside>
          )}

          <div className={`min-w-0 lg:order-1 ${visual.contentWidth}`}>
            {showCta && visual.prominentForm && <DienstCTA label={ctaLabel} />}
            <div className="max-w-none">{content}</div>
            <PracticalExample page={page} />
            <EditorialSources page={page} />
            <CommercialNextStep page={page} />
            {showCta && <DienstCTA label={ctaLabel} />}
            {page.faq?.length ? <Faq items={page.faq} /> : null}
            {page.related?.length ? <RelatedLinks items={page.related} /> : null}
            {showDeferredForm && (
              <section id="leadform" className="mt-12 border-t border-slate-200 pt-10">
                <div className="mb-5 max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                    Vrijblijvende volgende stap
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
                    Wil je professionele begeleiding vergelijken?
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Lees eerst het volledige antwoord en vraag daarna voorstellen op die bij je
                    woning en gemeente passen.
                  </p>
                </div>
                <div className="max-w-xl">{form}</div>
              </section>
            )}
          </div>
        </div>
      </div>

      <Script src="https://embed.typeform.com/next/embed.js" strategy="lazyOnload" />
      <JsonLd data={pageGraph(page)} />
    </article>
  );
}
