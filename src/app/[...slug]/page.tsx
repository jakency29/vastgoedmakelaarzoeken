// Catch-all voor alle content-pagina's. Statisch gegenereerd uit de content-registry.
// Onbekende slugs -> 404 (dynamicParams = false). Expliciete routes (contact, api, ...)
// hebben voorrang op deze catch-all.

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getAllSlugParams, getPageBySlug } from "@/lib/content";
import { pageGraph } from "@/lib/jsonld";
import { dienstVoorSlug } from "@/lib/dienst-cta";
import { splitMdxIntro } from "@/lib/mdx-intro";
import { pageVisualConfig } from "@/lib/page-visual";
import { mdxComponents } from "@/components/mdx";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { DienstLeadForm } from "@/components/DienstLeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Faq } from "@/components/Faq";
import { CommercialNextStep } from "@/components/CommercialNextStep";
import { DirectAnswer } from "@/components/DirectAnswer";
import { EditorialSources } from "@/components/EditorialSources";
import { PracticalExample } from "@/components/PracticalExample";

export const dynamicParams = false;

const dateFormatter = new Intl.DateTimeFormat("nl-BE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

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
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      type: "article",
      ...(page.image ? { images: [{ url: page.image, alt: page.headerImageAlt ?? page.h1 }] } : {}),
    },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug.join("/"));
  if (!page) notFound();

  const showForm = page.showLeadForm !== false;
  // Dienst-pagina's (asbestattest, EPC, keuring, ...) krijgen het dienst-formulier in de
  // zijbalk; overige pagina's het algemene makelaarsformulier.
  const dienst = dienstVoorSlug(page.slug);
  const visual = pageVisualConfig(page, Boolean(dienst));
  const introInHeader = page.introInHeader === true;
  const bodyParts = visual.prominentForm && !introInHeader
    ? { intro: null, rest: page.body }
    : splitMdxIntro(page.body);
  const [bodyResult, introResult] = await Promise.all([
    compileMDX({
      source: bodyParts.rest,
      components: mdxComponents,
      options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    }),
    bodyParts.intro
      ? compileMDX({
          source: bodyParts.intro,
          components: mdxComponents,
          options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
        })
      : Promise.resolve(null),
  ]);
  const content = bodyResult.content;
  const introContent = introResult?.content;
  const showProminentForm = showForm && visual.prominentForm;
  const showDeferredForm = showForm && !visual.prominentForm;
  const form = dienst ? (
    <DienstLeadForm dienst={dienst.naam} cta={dienst.cta} slug={page.slug} />
  ) : (
    <LeadForm
      variant="sidebar"
      title={page.leadFormTitle}
      description={page.leadFormDescription}
    />
  );

  return (
    <main>
      <article aria-labelledby="page-title" data-visual-type={visual.type}>
      {/* Kop-band met breadcrumbs, H1 en intro op een lichte achtergrond. */}
      <header className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          {page.breadcrumbs?.length ? (
            <div className="mb-4">
              <Breadcrumbs items={page.breadcrumbs} />
            </div>
          ) : null}
          <div className={page.headerImage ? "grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_400px]" : ""}>
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
                  {visual.label}
                </span>
                <span className="text-sm text-slate-500">{visual.description}</span>
              </div>
              <h1 id="page-title" className="max-w-3xl text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                {page.h1}
              </h1>
              {introInHeader && introContent ? (
                <div className="mt-3 min-w-0 max-w-3xl text-lg leading-relaxed text-slate-600 [overflow-wrap:anywhere] [&>p+p]:mt-3">
                  {introContent}
                  {page.updated || page.editorial ? (
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-brand-700">
                      {page.updated ? (
                        <time dateTime={page.updated}>
                          Inhoud gecontroleerd op {dateFormatter.format(new Date(page.updated))}
                        </time>
                      ) : null}
                      {page.editorial?.author ? <span>Uitgever: {page.editorial.author}</span> : null}
                      {page.editorial?.sourceLabel && page.editorial.sourceUrl ? (
                        <a
                          href={page.editorial.sourceUrl}
                          rel="noopener noreferrer"
                          className="underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                        >
                          Controlebasis: {page.editorial.sourceLabel}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  {page.editorial?.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{page.editorial.note}</p>
                  ) : null}
                </div>
              ) : page.descriptionInHeader !== false ? (
                <p className="mt-3 max-w-2xl text-lg text-slate-600">{page.description}</p>
              ) : null}
            </div>
            {page.headerImage ? (
              <figure className="min-w-0 overflow-hidden rounded-2xl border border-brand-200 bg-brand-900 shadow-sm">
                <Image
                  src={page.headerImage}
                  alt={page.headerImageAlt ?? ""}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 1023px) 100vw, 400px"
                  className="h-auto w-full"
                />
              </figure>
            ) : null}
          </div>
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
            {introContent && !introInHeader && (
              <DirectAnswer note={page.answerNote} updated={page.updated}>
                {introContent}
              </DirectAnswer>
            )}
            <div className="max-w-none">{content}</div>
            <PracticalExample page={page} />
            <EditorialSources page={page} />
            <CommercialNextStep page={page} />
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

        <JsonLd data={pageGraph(page)} />
      </article>
    </main>
  );
}
