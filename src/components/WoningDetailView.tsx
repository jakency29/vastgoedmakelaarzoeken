// Woning-detailweergave in Zillow-stijl: fotogalerij, kerncijfers, troeven, beschrijving,
// indeling, eigenschappen, EPC/energie, stedenbouw, in de buurt, kantoor/makelaar en
// contactkaart. Gerenderd onder /huis-te-koop/<slug> of /appartement-te-koop/<slug>.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { formatPrijs, formatOpp, categorieVanWoning, woningHref, type Woning } from "@/lib/woningen";
import { getKantoor } from "@/lib/kantoren";
import { getMakelaarByKantoor } from "@/lib/makelaars";
import { getNearby } from "@/lib/nearby";
import { MakelaarContact } from "@/components/MakelaarContact";
import { PremiumBadge } from "@/components/PremiumBadge";
import { EpcLabel } from "@/components/EpcLabel";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema } from "@/lib/jsonld";

export function woningMetadata(w: Woning): Metadata {
  return {
    title: { absolute: `${w.type} te koop in ${w.gemeente}: ${w.adres}`.slice(0, 60) },
    description: `${w.type} te koop in ${w.gemeente}. ${formatPrijs(w.prijs)}${w.slaapkamers ? `, ${w.slaapkamers} slaapkamers` : ""}${w.bewoonbaar ? `, ${formatOpp(w.bewoonbaar)}` : ""}${w.epcLabel ? `, EPC ${w.epcLabel}` : ""}. Vraag vrijblijvend info of een bezoek.`.slice(0, 155),
    alternates: { canonical: woningHref(w) },
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

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-brand-900">{children}</h2>;
}

export async function WoningDetailView({ w }: { w: Woning }) {
  const cat = categorieVanWoning(w);
  const prefix = cat ? cat.prefix : "huis-te-koop";
  const catLabel = cat ? cat.label : "Te koop";
  const kantoor = getKantoor(w.kantoorSlug);
  const makelaar = getMakelaarByKantoor(w.kantoorSlug);
  const nearby = await getNearby(w.geoLat, w.geoLng);

  const feiten: { label: string; value: string }[] = [];
  if (w.slaapkamers) feiten.push({ label: "Slaapkamers", value: String(w.slaapkamers) });
  if (w.bewoonbaar) feiten.push({ label: "Bewoonbaar", value: formatOpp(w.bewoonbaar) });
  if (w.grond) feiten.push({ label: "Grond", value: formatOpp(w.grond) });
  if (w.parkeerplaatsen) feiten.push({ label: "Parking", value: String(w.parkeerplaatsen) });
  if (w.gevels) feiten.push({ label: "Gevels", value: String(w.gevels) });
  if (w.bouwjaar) feiten.push({ label: "Bouwjaar", value: String(w.bouwjaar) });
  if (w.staat) feiten.push({ label: "Staat", value: w.staat });

  const stedenbouw: { label: string; value: string }[] = [];
  if (w.bestemming) stedenbouw.push({ label: "Stedenbouwkundige bestemming", value: w.bestemming });
  stedenbouw.push({ label: "Stedenbouwkundige vergunning", value: w.vergunning ? "Aanwezig" : "Niet vermeld" });
  if (w.overstroming) stedenbouw.push({ label: "Overstromingsgevoeligheid", value: w.overstroming });
  if (w.kadastraalInkomen) stedenbouw.push({ label: "Kadastraal inkomen", value: `€ ${w.kadastraalInkomen.toLocaleString("nl-BE")}` });

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href={`/${prefix}`} className="hover:text-brand-700 hover:underline">{catLabel}</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li><Link href={`/${prefix}/${w.provincieSlug}/${w.gemeenteSlug}`} className="hover:text-brand-700 hover:underline">{w.gemeente}</Link></li>
            </ol>
          </nav>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-600">{w.type} te koop in {w.gemeente}</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-brand-900 sm:text-3xl">{w.adres}, {w.postcode} {w.gemeente}</h1>
          <p className="mt-2 text-slate-600">
            {formatPrijs(w.prijs)}
            {w.slaapkamers ? ` · ${w.slaapkamers} slaapkamers` : ""}
            {w.bewoonbaar ? ` · ${formatOpp(w.bewoonbaar)} bewoonbaar` : ""}
            {w.epcLabel ? ` · EPC ${w.epcLabel}` : ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {w.fotos.length > 0 && (
          <div className="mt-6 grid h-64 gap-2 sm:h-[440px] sm:grid-cols-2">
            <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-l-2xl sm:rounded-r-none">
              <Image src={w.fotos[0]} alt={`${w.type} te koop in ${w.gemeente}, ${w.adres}`} fill priority sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="hidden grid-cols-2 grid-rows-2 gap-2 sm:grid">
              {w.fotos.slice(1, 5).map((src, i) => (
                <div key={i} className={`relative overflow-hidden ${i === 1 ? "rounded-tr-2xl" : ""} ${i === 3 ? "rounded-br-2xl" : ""}`}>
                  <Image src={src} alt={`${w.type} ${w.gemeente} foto ${i + 2}`} fill sizes="25vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {feiten.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {feiten.map((f) => <Feit key={f.label} label={f.label} value={f.value} />)}
              </div>
            )}

            {w.troeven.length > 0 && (
              <>
                <H2>Wat maakt dit pand bijzonder?</H2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {w.troeven.map((t) => (
                    <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-accent-300 bg-accent-50 px-3 py-1.5 text-sm font-semibold text-brand-900" style={{ backgroundColor: "rgba(255,192,67,0.12)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-600)" strokeWidth="3" aria-hidden="true"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {w.beschrijving && (
              <>
                <H2>Beschrijving</H2>
                <div className="mt-3 space-y-4 leading-relaxed text-slate-700">
                  {w.beschrijving.split(/\n{2,}/).map((alinea, i) => (
                    <p key={i}>{alinea}</p>
                  ))}
                </div>
              </>
            )}

            {w.indeling.length > 0 && (
              <>
                <H2>Indeling</H2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {w.indeling.map((r) => (
                    <li key={r.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                      <span className="font-medium text-brand-900">{r.label}{r.aantal > 1 ? ` (${r.aantal})` : ""}</span>
                      {r.opp ? <span className="text-slate-500">{r.opp} m2</span> : null}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {w.eigenschappen.length > 0 && (
              <>
                <H2>Eigenschappen</H2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {w.eigenschappen.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {e}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {w.epcLabel && (
              <>
                <H2>Energie en EPC</H2>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5">
                  <EpcLabel label={w.epcLabel} verbruik={w.epcVerbruik} />
                  {w.renovatieplicht ? (
                    <p className="mt-3 text-sm text-slate-700">
                      Voor deze woning geldt de Vlaamse renovatieplicht: een koper moet ze binnen vijf jaar na de aankoop energetisch verbeteren tot minstens label D.
                    </p>
                  ) : null}
                  {w.epcCode ? <p className="mt-2 text-xs text-slate-400">EPC-certificaat {w.epcCode}</p> : null}
                </div>
              </>
            )}

            {stedenbouw.length > 0 && (
              <>
                <H2>Stedenbouw en omgeving</H2>
                <dl className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
                  {stedenbouw.map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <dt className="text-slate-500">{s.label}</dt>
                      <dd className="min-w-0 font-medium text-brand-900 sm:text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {nearby && nearby.length > 0 && (
              <>
                <H2>In de buurt</H2>
                <p className="mt-1 text-sm text-slate-500">Voorzieningen in de omgeving, met de afstand in vogelvlucht.</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {nearby.map((n, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
                      <span className="min-w-0 text-slate-700"><span className="font-medium text-brand-900">{n.categorie}:</span> {n.naam}</span>
                      <span className="shrink-0 text-slate-500">{n.afstand < 1000 ? `${n.afstand} m` : `${(n.afstand / 1000).toFixed(1)} km`}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {kantoor && (
              <>
                <H2>Aangeboden door</H2>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/kantoor/${kantoor.slug}`} className="font-bold text-brand-900 hover:text-brand-700">{kantoor.naam}</Link>
                    {kantoor.premium && <PremiumBadge />}
                  </div>
                  <p className="text-sm text-slate-500">{kantoor.gemeente}, {kantoor.provincie}</p>
                  {makelaar && (
                    <p className="mt-2 text-sm text-slate-700">
                      Makelaar: <Link href={`/makelaar/${makelaar.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{makelaar.naam}</Link>
                    </p>
                  )}
                </div>
              </>
            )}

            {w.fotos.length > 5 && (
              <>
                <H2>Meer foto&apos;s</H2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {w.fotos.slice(5).map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image src={src} alt={`${w.type} ${w.gemeente} foto ${i + 6}`} fill loading="lazy" sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-extrabold text-brand-900">{formatPrijs(w.prijs)}</p>
                <p className="mt-1 text-sm text-slate-500">{w.type} in {w.gemeente}</p>
                {w.epcLabel && <div className="mt-3"><EpcLabel label={w.epcLabel} /></div>}
              </div>
              {(makelaar || kantoor) && <MakelaarContact makelaar={makelaar} kantoor={kantoor} />}
            </div>
          </aside>
        </div>
      </div>

      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: catLabel, path: `/${prefix}` },
        { name: w.provincie, path: `/${prefix}/${w.provincieSlug}` },
        { name: w.gemeente, path: `/${prefix}/${w.provincieSlug}/${w.gemeenteSlug}` },
        { name: w.adres, path: woningHref(w) },
      ])} />
    </main>
  );
}
