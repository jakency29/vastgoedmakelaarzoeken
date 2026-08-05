// Woning-detailweergave in Zillow-stijl: fotogalerij, kerncijfers, troeven, beschrijving,
// indeling, eigenschappen, EPC/energie, stedenbouw, in de buurt, kantoor/makelaar en
// contactkaart. Gerenderd onder /huis-te-koop/<slug> of /appartement-te-koop/<slug>.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { formatPrijs, formatOpp, categorieVanWoning, woningDisplayTitel, woningHref, woningenGemeenteVoor, type Woning } from "@/lib/woningen";
import { getKantoor } from "@/lib/kantoren";
import { getMakelaarByKantoor } from "@/lib/makelaars";
import { getNearby } from "@/lib/nearby";
import { MakelaarContact } from "@/components/MakelaarContact";
import { PremiumBadge } from "@/components/PremiumBadge";
import { EpcLabel } from "@/components/EpcLabel";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema } from "@/lib/jsonld";
import { Faq } from "@/components/Faq";
import { absoluteUrl } from "@/lib/site";
import type { FaqItem } from "@/lib/types";

export function woningMetadata(w: Woning): Metadata {
  const isAppartement = categorieVanWoning(w)?.key === "appartement";
  const title = (isAppartement && w.bewoonbaar
    ? `${w.type} ${formatOpp(w.bewoonbaar)}${w.slaapkamers ? ` met ${w.slaapkamers} ${w.slaapkamers === 1 ? "slaapkamer" : "slaapkamers"}` : ""} in ${w.gemeente}`
    : `${w.type} te koop in ${w.gemeente}: ${w.adres}`).slice(0, 60);
  const description = `${w.type} te koop in ${w.gemeente}. ${formatPrijs(w.prijs)}${w.slaapkamers ? `, ${w.slaapkamers} ${w.slaapkamers === 1 ? "slaapkamer" : "slaapkamers"}` : ""}${w.bewoonbaar ? `, ${formatOpp(w.bewoonbaar)}` : ""}${w.epcLabel ? `, EPC ${w.epcLabel}` : ""}. Vraag vrijblijvend info of een bezoek.`.slice(0, 155);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: woningHref(w) },
    openGraph: {
      type: "website",
      title,
      description,
      url: woningHref(w),
      ...(w.fotos[0] ? { images: [{ url: w.fotos[0], alt: `${w.type} te koop aan de ${w.adres} in ${w.gemeente}` }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(w.fotos[0] ? { images: [w.fotos[0]] } : {}) },
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

function woningFaq(w: Woning): FaqItem[] {
  const renovatieAandacht = w.renovatieplicht === true || w.epcLabel === "E" || w.epcLabel === "F";
  const isAppartement = categorieVanWoning(w)?.key === "appartement";
  return [
    {
      q: `Wat is de vraagprijs van ${w.adres} in ${w.gemeente}?`,
      a: `De vermelde vraagprijs is ${formatPrijs(w.prijs)}. Reken naast de aankoopprijs ook registratierechten, notariskosten en eventuele renovatie- of financieringskosten mee. De vraagprijs is geen garantie voor de uiteindelijke verkoopprijs en kan door de aanbieder worden aangepast.`,
    },
    {
      q: `Hoe energiezuinig is deze woning in ${w.gemeente}?`,
      a: w.epcLabel
        ? `De woning heeft EPC-label ${w.epcLabel}${w.epcVerbruik ? ` met een energiescore van ${w.epcVerbruik} kWh/m2 per jaar` : ""}. ${renovatieAandacht ? "Bij label E of F geldt bij een residentiële overdracht in de regel een renovatieplicht tot minstens label D binnen zes jaar." : "Bekijk het volledige EPC voor aanbevelingen en mogelijke energiewerken."}`
        : `In de huidige aanbodgegevens staat geen EPC-label vermeld. Vraag de aanbieder naar het geldige energieprestatiecertificaat voordat je een bod uitbrengt en controleer daarop de energiescore, aanbevelingen en eventuele renovatieverplichting.`,
    },
    {
      q: `Welke documenten controleer je voor deze woning?`,
      a: isAppartement
        ? `Controleer minstens het EPC, de elektrische keuring, het bodemattest, de stedenbouwkundige inlichtingen en de overstromingsinformatie. Vraag daarnaast de basisakte, het reglement van mede-eigendom, recente notulen, de lasten en de stand van het werk- en reservekapitaal op. Laat je notaris het volledige dossier beoordelen.`
        : `Controleer minstens het EPC, de elektrische keuring, het bodemattest, de stedenbouwkundige inlichtingen en de overstromingsinformatie. Voor een gebouw van voor 2001 kan ook een asbestattest verplicht zijn. Laat de notaris bevestigen welke documenten voor dit specifieke pand en deze overdracht nodig zijn.`,
    },
    {
      q: `Hoe vraag je een bezoek aan voor ${w.adres}?`,
      a: `Gebruik het contactformulier bij deze woning om de aanbieder rechtstreeks om informatie of een bezoekmoment te vragen. Vermeld voor welk pand je contact opneemt en vraag meteen of de woning nog beschikbaar is, welke documenten je vooraf ontvangt en of er bijzondere verkoopvoorwaarden gelden.`,
    },
    {
      q: `Is deze woning nog beschikbaar?`,
      a: `De woning staat momenteel als te koop op het platform. Beschikbaarheid kan wijzigen tussen twee updates. Vraag daarom altijd bij de aanbieder na of het pand nog beschikbaar is voordat je een bezoek plant, kosten maakt of een bod voorbereidt.`,
    },
  ];
}

function woningSchema(w: Woning, kantoor: ReturnType<typeof getKantoor>, faq: FaqItem[]) {
  const url = absoluteUrl(woningHref(w));
  const woningId = `${url}#woning`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: woningDisplayTitel(w),
        description: w.beschrijving?.split(/\n{2,}/)[0],
        inLanguage: "nl-BE",
        mainEntity: { "@id": woningId },
      },
      {
        "@type": w.typeUID.includes("apartment") || w.typeUID.includes("flat") ? "Apartment" : "House",
        "@id": woningId,
        name: woningDisplayTitel(w),
        url,
        ...(w.fotos.length ? { image: w.fotos.map((foto) => absoluteUrl(foto)) } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: w.adres,
          postalCode: w.postcode,
          addressLocality: w.gemeente,
          addressRegion: w.provincie,
          addressCountry: "BE",
        },
        ...(w.slaapkamers ? { numberOfBedrooms: w.slaapkamers } : {}),
        ...(w.bewoonbaar ? { floorSize: { "@type": "QuantitativeValue", value: w.bewoonbaar, unitCode: "MTK" } } : {}),
        ...(w.grond ? { landSize: { "@type": "QuantitativeValue", value: w.grond, unitCode: "MTK" } } : {}),
        ...(w.bouwjaar ? { yearBuilt: Number(w.bouwjaar) } : {}),
        additionalProperty: [
          ...(w.epcLabel ? [{ "@type": "PropertyValue", name: "EPC-label", value: w.epcLabel }] : []),
          ...(w.epcVerbruik ? [{ "@type": "PropertyValue", name: "Energiescore", value: w.epcVerbruik, unitText: "kWh/m2 per jaar" }] : []),
          ...(w.staat ? [{ "@type": "PropertyValue", name: "Staat", value: w.staat }] : []),
        ],
        ...(w.prijs
          ? {
              offers: {
                "@type": "Offer",
                url,
                price: w.prijs,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                ...(w.toegevoegdOp ? { validFrom: w.toegevoegdOp } : {}),
                ...(kantoor ? { seller: { "@type": "RealEstateAgent", name: kantoor.naam, url: absoluteUrl(`/kantoor/${kantoor.slug}`) } } : {}),
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#veelgestelde-vragen`,
        isPartOf: { "@id": `${url}#page` },
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export async function WoningDetailView({ w }: { w: Woning }) {
  const cat = categorieVanWoning(w);
  const prefix = cat ? cat.prefix : "huis-te-koop";
  const catLabel = cat ? cat.label : "Te koop";
  const kantoor = getKantoor(w.kantoorSlug);
  const makelaar = getMakelaarByKantoor(w.kantoorSlug);
  const nearby = await getNearby(w.geoLat, w.geoLng);
  const faq = woningFaq(w);
  const isAppartement = cat?.key === "appartement";
  const vergelijkbareWoningen = cat
    ? woningenGemeenteVoor(cat, w.provincieSlug, w.gemeenteSlug).filter((woning) => woning.id !== w.id).slice(0, 3)
    : [];

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
      {cat && <JsonLd data={woningSchema(w, kantoor, faq)} />}
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
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-brand-900 sm:text-3xl">
            {isAppartement && w.bewoonbaar ? `${w.type} van ${formatOpp(w.bewoonbaar)} aan ` : ""}{w.adres}, {w.postcode} {w.gemeente}
          </h1>
          <p className="mt-2 text-slate-600">
            {formatPrijs(w.prijs)}
            {w.slaapkamers ? ` · ${w.slaapkamers} ${w.slaapkamers === 1 ? "slaapkamer" : "slaapkamers"}` : ""}
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
                <H2>Wat moet je weten over deze woning?</H2>
                <div className="mt-3 space-y-4 leading-relaxed text-slate-700">
                  {w.beschrijving.split(/\n{2,}/).map((alinea, i) => (
                    <p key={i}>{alinea}</p>
                  ))}
                </div>
              </>
            )}

            {w.indeling.length > 0 && (
              <>
                <H2>Hoe is de woning ingedeeld?</H2>
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
                <H2>Welke eigenschappen zijn aanwezig?</H2>
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
                <H2>Wat zegt het EPC over deze woning?</H2>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5">
                  <EpcLabel label={w.epcLabel} verbruik={w.epcVerbruik} />
                  {w.renovatieplicht ? (
                    <p className="mt-3 text-sm text-slate-700">
                      Voor deze woning geldt de Vlaamse renovatieplicht: een koper moet ze binnen zes jaar na de aankoop energetisch verbeteren tot minstens label D.
                    </p>
                  ) : null}
                  {w.epcCode ? <p className="mt-2 text-xs text-slate-400">EPC-certificaat {w.epcCode}</p> : null}
                </div>
              </>
            )}

            {stedenbouw.length > 0 && (
              <>
                <H2>Welke stedenbouwkundige gegevens zijn vermeld?</H2>
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

            {cat && (
              <>
                <H2>Welke documenten controleer je vóór een bod?</H2>
                <p className="mt-3 leading-relaxed text-slate-700">
                  Controleer het EPC, de elektrische keuring, het bodemattest, de stedenbouwkundige inlichtingen en de overstromingsinformatie van dit specifieke pand. {isAppartement ? "Vraag ook de stukken van de mede-eigendom op, zodat je de toestand en financiële verplichtingen van het hele gebouw beoordeelt." : "Laat ontbrekende of onduidelijke gegevens vóór een bindend bod door de aanbieder en je notaris bevestigen."}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-extrabold text-brand-900">Energie en elektriciteit</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Vergelijk het vermelde label met <Link href="/huis-verkopen-verplichtingen/epc" className="font-medium text-brand-700 underline underline-offset-2">de gegevens op het EPC</Link> en controleer ook <Link href="/huis-verkopen-verplichtingen/elektriciteitskeuring" className="font-medium text-brand-700 underline underline-offset-2">het keuringsverslag van de elektrische installatie</Link>.
                </p>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-extrabold text-brand-900">Bodem en asbest</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Vraag het <Link href="/huis-verkopen-verplichtingen/bodemattest" className="font-medium text-brand-700 underline underline-offset-2">bodemattest bij de verkoop</Link> op{Number(w.bouwjaar) < 2001 ? <> en controleer het <Link href="/asbestattest/bij-verkoop" className="font-medium text-brand-700 underline underline-offset-2">asbestattest voor het oudere gebouw</Link></> : ""}.
                </p>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-extrabold text-brand-900">Perceel en omgeving</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">Zoek {w.adres} op in <a href="https://www.geopunt.be/" className="font-medium text-brand-700 underline underline-offset-2">Geopunt</a> en vergelijk de kaartlagen met de gegevens in het verkoopdossier.</p>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-extrabold text-brand-900">Overstromingsinformatie</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">Controleer via <a href="https://www.waterinfo.vlaanderen.be/" className="font-medium text-brand-700 underline underline-offset-2">Waterinfo van de Vlaamse overheid</a> de P-score van het perceel en de G-score van het gebouw.</p>
              </li>
              {isAppartement && (
                <li className="rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2">
                  <h3 className="font-extrabold text-brand-900">Mede-eigendom en gemeenschappelijke kosten</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Vraag de basisakte, het reglement, recente notulen, de lasten en de stand van het werk- en reservekapitaal op. Bekijk ook de <a href="https://www.vlaanderen.be/bouwen-wonen-en-energie/beheer-en-onderhoud-van-appartementsgebouwen" className="font-medium text-brand-700 underline underline-offset-2">officiële uitleg over appartementsgebouwen, de VME en de syndicus</a>.
                  </p>
                </li>
              )}
                </ul>
              </>
            )}

            {nearby && nearby.length > 0 && (
              <>
                <H2>Welke voorzieningen liggen in de buurt?</H2>
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
                <H2>Wie biedt deze woning aan?</H2>
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
                <H2>Welke andere foto&apos;s zijn beschikbaar?</H2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {w.fotos.slice(5).map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image src={src} alt={`${w.type} ${w.gemeente} foto ${i + 6}`} fill loading="lazy" sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {cat && (
              <>
                <H2>Hoe vergelijk je deze woning met ander aanbod?</H2>
                <p className="mt-3 leading-relaxed text-slate-700">
                  {isAppartement
                    ? `Vergelijk dit appartement met andere appartementen in dezelfde gemeente op vraagprijs, woonoppervlakte, slaapkamers, terras, EPC en gemeenschappelijke kosten. Zo beoordeel je zowel de private woonruimte als het appartementsgebouw.`
                    : `Vergelijk deze woning met andere huizen in dezelfde gemeente op vraagprijs, oppervlakte, perceel, EPC en staat. Zo voorkom je dat één opvallend kenmerk de volledige beslissing bepaalt.`}
                </p>
                {vergelijkbareWoningen.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {vergelijkbareWoningen.map((woning) => (
                      <li key={woning.id}>
                        <Link href={woningHref(woning)} className="font-medium text-brand-700 underline underline-offset-2">
                          {woning.adres}{isAppartement && woning.bewoonbaar ? `, ${formatOpp(woning.bewoonbaar)}` : ""}: {formatPrijs(woning.prijs)}{woning.epcLabel ? `, EPC ${woning.epcLabel}` : ""}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-slate-700">Er staat momenteel geen tweede {isAppartement ? "appartement" : "huis"} in {w.gemeente} op het platform.</p>
                )}
                <p className="mt-3 leading-relaxed text-slate-700">
                  Bekijk ook <Link href={`/${prefix}/${w.provincieSlug}/${w.gemeenteSlug}`} className="font-medium text-brand-700 underline underline-offset-2">het volledige {isAppartement ? "appartementenaanbod" : "huizenaanbod"} in {w.gemeente}</Link> en de andere <Link href={`/${prefix}/${w.provincieSlug}`} className="font-medium text-brand-700 underline underline-offset-2">{isAppartement ? "appartementen" : "woningen"} in {w.provincie}</Link>.
                </p>

                <Faq items={faq} title="Welke vragen worden vaak gesteld over deze woning?" />
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
