// Woning-detailpagina (/woning/<slug>) in Zillow-stijl: fotogalerij, prijs, kenmerken,
// beschrijving, kantoor/makelaar en leadformulier. Geen maps.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { woningen, getWoningBySlug, formatPrijs, formatOpp, type Woning } from "@/lib/woningen";
import { getKantoor } from "@/lib/kantoren";
import { getMakelaarByKantoor } from "@/lib/makelaars";
import { ElfsightForm } from "@/components/ElfsightForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return woningen.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getWoningBySlug(slug);
  if (!w) return {};
  return {
    title: { absolute: `${w.type} te koop in ${w.gemeente}: ${w.adres}`.slice(0, 60) },
    description: `${w.type} te koop in ${w.gemeente}. ${formatPrijs(w.prijs)}${w.slaapkamers ? `, ${w.slaapkamers} slaapkamers` : ""}${w.bewoonbaar ? `, ${formatOpp(w.bewoonbaar)}` : ""}. Vraag vrijblijvend info of een bezoek.`.slice(0, 155),
    alternates: { canonical: `/woning/${w.slug}` },
  };
}

function Feit({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
      <p className="text-lg font-bold text-brand-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

export default async function WoningPage({ params }: Props) {
  const { slug } = await params;
  const w = getWoningBySlug(slug);
  if (!w) notFound();
  const kantoor = getKantoor(w.kantoorSlug);
  const makelaar = getMakelaarByKantoor(w.kantoorSlug);
  const feiten: { label: string; value: string }[] = [];
  if (w.slaapkamers) feiten.push({ label: "Slaapkamers", value: String(w.slaapkamers) });
  if (w.bewoonbaar) feiten.push({ label: "Bewoonbaar", value: formatOpp(w.bewoonbaar) });
  if (w.grond) feiten.push({ label: "Grond", value: formatOpp(w.grond) });
  if (w.gevels) feiten.push({ label: "Gevels", value: String(w.gevels) });
  if (w.bouwjaar) feiten.push({ label: "Bouwjaar", value: String(w.bouwjaar) });
  if (w.staat) feiten.push({ label: "Staat", value: w.staat });

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href="/huis-te-koop" className="hover:text-brand-700 hover:underline">Te koop</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href={`/huis-te-koop/${w.provincieSlug}/${w.gemeenteSlug}`} className="hover:text-brand-700 hover:underline">{w.gemeente}</Link></li>
            </ol>
          </nav>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-900 sm:text-3xl">
            {w.type} te koop in {w.gemeente}
          </h1>
          <p className="mt-1 text-slate-600">{w.adres}, {w.postcode} {w.gemeente}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Fotogalerij (mozaiek) */}
        {w.fotos.length > 0 && (
          <div className="mt-6 grid h-64 gap-2 sm:h-[440px] sm:grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.fotos[0]} alt={`${w.type} te koop in ${w.gemeente}, ${w.adres}`} className="h-full w-full rounded-2xl object-cover sm:rounded-l-2xl sm:rounded-r-none" />
            <div className="hidden grid-cols-2 grid-rows-2 gap-2 sm:grid">
              {w.fotos.slice(1, 5).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`${w.type} ${w.gemeente} foto ${i + 2}`} className={`h-full w-full object-cover ${i === 1 ? "rounded-tr-2xl" : ""} ${i === 3 ? "rounded-br-2xl" : ""}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {feiten.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {feiten.map((f) => <Feit key={f.label} label={f.label} value={f.value} />)}
              </div>
            )}

            {w.beschrijving && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Beschrijving</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">{w.beschrijving}</p>
              </>
            )}

            {kantoor && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Aangeboden door</h2>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Link href={`/kantoor/${kantoor.slug}`} className="font-bold text-brand-900 hover:text-brand-700">{kantoor.naam}</Link>
                  <p className="text-sm text-slate-500">{kantoor.gemeente}, {kantoor.provincie}</p>
                  {makelaar && (
                    <p className="mt-2 text-sm text-slate-700">
                      Makelaar:{" "}
                      <Link href={`/makelaar/${makelaar.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{makelaar.naam}</Link>
                    </p>
                  )}
                </div>
              </>
            )}

            {w.fotos.length > 5 && (
              <>
                <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">Meer foto's</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {w.fotos.slice(5).map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src} alt={`${w.type} ${w.gemeente} foto ${i + 6}`} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside id="leadform" className="lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-extrabold text-brand-900">{formatPrijs(w.prijs)}</p>
                <p className="mt-1 text-sm text-slate-500">{w.type} in {w.gemeente}</p>
              </div>
              <ElfsightForm />
            </div>
          </aside>
        </div>
      </div>

      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "Te koop", path: "/huis-te-koop" },
        { name: w.provincie, path: `/huis-te-koop/${w.provincieSlug}` },
        { name: w.gemeente, path: `/huis-te-koop/${w.provincieSlug}/${w.gemeenteSlug}` },
        { name: w.adres, path: `/woning/${w.slug}` },
      ])} />
    </main>
  );
}
