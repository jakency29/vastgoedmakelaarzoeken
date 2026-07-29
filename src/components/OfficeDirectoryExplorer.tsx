"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PremiumBadge } from "@/components/PremiumBadge";
import { Rating } from "@/components/Rating";

export type OfficeDirectoryItem = {
  slug: string;
  naam: string;
  gemeente: string;
  provincie: string;
  postcode?: string;
  foto?: string;
  diensten: string[];
  regios: string[];
  premium: boolean;
  bivNummer?: string;
  bivGecontroleerdOp?: string;
  rating?: number;
  reviewTotal?: number;
};

const SERVICE_FILTERS = [
  { label: "Woning verkopen", terms: ["verkoop", "verkopen"] },
  { label: "Verhuur", terms: ["verhuur"] },
  { label: "Schatting", terms: ["schatting", "waardebepaling"] },
  { label: "Nieuwbouw", terms: ["nieuwbouw", "projectontwikkelaars", "projectbegeleiding"] },
  { label: "Vastgoedbeheer", terms: ["vastgoedbeheer", "rentmeesterschap", "contractbeheer"] },
  { label: "Aankoopbegeleiding", terms: ["aankoopbegeleiding"] },
] as const;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function providesService(office: OfficeDirectoryItem, service: string) {
  if (!service) return true;
  const filter = SERVICE_FILTERS.find((item) => item.label === service);
  if (!filter) return true;
  const services = normalize(office.diensten.join(" "));
  return filter.terms.some((term) => services.includes(term));
}

function formatCheckDate(value?: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function ReviewSummary({ office }: { office: OfficeDirectoryItem }) {
  if (!office.rating || !office.reviewTotal) {
    return <span className="text-sm text-slate-500">Geen Google-reviewdata beschikbaar</span>;
  }
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      <Rating rating={office.rating} />
      <span className="text-sm font-bold text-brand-900">{office.rating.toFixed(1)}</span>
      <span className="text-xs text-slate-500">({office.reviewTotal} Google-reviews)</span>
    </span>
  );
}

export function OfficeDirectoryExplorer({ offices }: { offices: OfficeDirectoryItem[] }) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [service, setService] = useState("");
  const [sort, setSort] = useState("name");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const provinces = useMemo(
    () => [...new Set(offices.map((office) => office.provincie))].sort((a, b) => a.localeCompare(b, "nl-BE")),
    [offices],
  );

  const filteredOffices = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const matches = offices.filter((office) => {
      if (province && office.provincie !== province) return false;
      if (!providesService(office, service)) return false;
      if (!normalizedQuery) return true;
      return normalize(
        [
          office.naam,
          office.gemeente,
          office.provincie,
          office.postcode,
          ...office.regios,
          ...office.diensten,
        ].filter(Boolean).join(" "),
      ).includes(normalizedQuery);
    });

    return [...matches].sort((a, b) => {
      if (sort === "reviews") {
        return (b.reviewTotal ?? -1) - (a.reviewTotal ?? -1) || a.naam.localeCompare(b.naam, "nl-BE");
      }
      if (sort === "rating") {
        return (b.rating ?? -1) - (a.rating ?? -1)
          || (b.reviewTotal ?? -1) - (a.reviewTotal ?? -1)
          || a.naam.localeCompare(b.naam, "nl-BE");
      }
      return a.naam.localeCompare(b.naam, "nl-BE");
    });
  }, [offices, province, query, service, sort]);

  const selectedOffices = selectedSlugs
    .map((slug) => offices.find((office) => office.slug === slug))
    .filter((office): office is OfficeDirectoryItem => Boolean(office));
  const hasFilters = Boolean(query.trim() || province || service || sort !== "name");

  function clearFilters() {
    setQuery("");
    setProvince("");
    setService("");
    setSort("name");
  }

  function toggleComparison(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 3) return current;
      return [...current, slug];
    });
  }

  return (
    <>
      <section aria-labelledby="kantoren-zoeken">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="kantoren-zoeken" className="text-2xl font-extrabold tracking-tight text-brand-900">
              Welk vastgoedkantoor past bij jouw vraag?
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Zoek op kantoor, gemeente of werkingsgebied en verfijn daarna op provincie en dienst.
            </p>
          </div>
          <p className="rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800">
            {offices.length} kantoorprofielen
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-brand-50/60 p-5">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <label htmlFor="kantoor-zoeken" className="block text-sm font-bold text-brand-900">
                Zoek op plaats of kantoor
              </label>
              <div className="relative mt-2">
                <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" strokeLinecap="round" />
                </svg>
                <input
                  id="kantoor-zoeken"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Bijvoorbeeld Hasselt, Waasland of COGA"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="kantoor-provincie" className="block text-sm font-bold text-brand-900">Provincie</label>
              <select
                id="kantoor-provincie"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">Alle provincies</option>
                {provinces.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="kantoor-dienst" className="block text-sm font-bold text-brand-900">Dienst</label>
              <select
                id="kantoor-dienst"
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">Alle diensten</option>
                {SERVICE_FILTERS.map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="kantoor-sorteren" className="block text-sm font-bold text-brand-900">Sorteren</label>
              <select
                id="kantoor-sorteren"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="name">Naam A tot Z</option>
                <option value="reviews">Meeste Google-reviews</option>
                <option value="rating">Hoogste Google-score</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-brand-800" aria-live="polite">
              {filteredOffices.length} {filteredOffices.length === 1 ? "kantoor gevonden" : "kantoren gevonden"}
            </p>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="text-sm font-bold text-brand-700 underline underline-offset-2">
                Zoekopdracht en filters wissen
              </button>
            )}
          </div>
        </div>
      </section>

      {selectedOffices.length > 0 && (
        <section className="mt-8 rounded-2xl border border-brand-200 bg-white p-5 shadow-sm" aria-labelledby="kantoren-vergelijken">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="kantoren-vergelijken" className="text-xl font-extrabold tracking-tight text-brand-900">
                Welke geselecteerde kantoren wil je vergelijken?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {selectedOffices.length === 1
                  ? "Selecteer nog minstens één kantoor om de verschillen naast elkaar te zien."
                  : `${selectedOffices.length} kantoren staan naast elkaar. Je kunt maximaal drie kantoren selecteren.`}
              </p>
            </div>
            <button type="button" onClick={() => setSelectedSlugs([])} className="text-sm font-bold text-brand-700 underline underline-offset-2">
              Selectie wissen
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedOffices.map((office) => (
              <button
                key={office.slug}
                type="button"
                onClick={() => toggleComparison(office.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800"
                aria-label={`Verwijder ${office.naam} uit vergelijking`}
              >
                {office.naam}
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>

          {selectedOffices.length >= 2 && (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-[700px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-slate-200 p-3 text-slate-500">Kenmerk</th>
                    {selectedOffices.map((office) => (
                      <th key={office.slug} className="border-b border-slate-200 p-3 text-brand-900">
                        {office.naam}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow label="Vestiging" offices={selectedOffices} render={(office) => `${office.gemeente}, ${office.provincie}`} />
                  <ComparisonRow label="Werkingsgebied" offices={selectedOffices} render={(office) => office.regios.join(", ")} />
                  <ComparisonRow label="Diensten" offices={selectedOffices} render={(office) => office.diensten.join(", ")} />
                  <ComparisonRow
                    label="Google-reviews"
                    offices={selectedOffices}
                    render={(office) => office.rating && office.reviewTotal ? `${office.rating.toFixed(1)} op 5 (${office.reviewTotal})` : "Niet beschikbaar"}
                  />
                  <ComparisonRow
                    label="BIV-vermelding"
                    offices={selectedOffices}
                    render={(office) => office.bivNummer ? `Nummer ${office.bivNummer}` : "Niet vermeld"}
                  />
                  <tr>
                    <th className="border-b border-slate-100 p-3 text-slate-500">Profiel</th>
                    {selectedOffices.map((office) => (
                      <td key={office.slug} className="border-b border-slate-100 p-3">
                        <Link href={`/kantoor/${office.slug}`} className="font-bold text-brand-700 underline underline-offset-2">
                          Bekijk {office.naam}
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {filteredOffices.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOffices.map((office) => {
            const selected = selectedSlugs.includes(office.slug);
            const comparisonFull = selectedSlugs.length >= 3 && !selected;
            const checkedOn = formatCheckDate(office.bivGecontroleerdOp);
            return (
              <article key={office.slug} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative flex h-40 items-center justify-center border-b border-slate-100 bg-slate-50 p-4">
                  {office.premium && <PremiumBadge className="absolute left-3 top-3" />}
                  {office.foto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={office.foto} alt={`${office.naam} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-center text-xl font-extrabold text-brand-200">{office.naam}</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-brand-900">{office.naam}</h3>
                      <p className="mt-0.5 text-sm text-slate-500">{office.gemeente}, {office.provincie}</p>
                    </div>
                    <label className={`shrink-0 text-xs font-bold ${comparisonFull ? "cursor-not-allowed text-slate-400" : "cursor-pointer text-brand-700"}`}>
                      <input
                        type="checkbox"
                        checked={selected}
                        disabled={comparisonFull}
                        onChange={() => toggleComparison(office.slug)}
                        className="mr-1.5 accent-brand-700"
                      />
                      Vergelijk
                    </label>
                  </div>

                  <div className="mt-2"><ReviewSummary office={office} /></div>

                  {office.bivNummer && (
                    <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100" aria-hidden="true">✓</span>
                      BIV-vermelding {checkedOn ? `gecontroleerd op ${checkedOn}` : "aanwezig"}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Actief in {office.regios.slice(0, 4).join(", ")}{office.regios.length > 4 ? " en omgeving" : ""}.
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Diensten van ${office.naam}`}>
                    {office.diensten.slice(0, 3).map((item) => (
                      <li key={item} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">{item}</li>
                    ))}
                  </ul>

                  <Link
                    href={`/kantoor/${office.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 font-bold text-brand-700 hover:underline"
                  >
                    Bekijk profiel en reviews
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-extrabold text-brand-900">Geen passend kantoor gevonden</h2>
          <p className="mt-2 text-sm text-slate-600">Probeer een andere plaats of maak één van de filters ruimer.</p>
          <button type="button" onClick={clearFilters} className="mt-4 rounded-full bg-brand-800 px-5 py-2.5 text-sm font-bold text-white">
            Toon alle kantoren
          </button>
        </div>
      )}
    </>
  );
}

function ComparisonRow({
  label,
  offices,
  render,
}: {
  label: string;
  offices: OfficeDirectoryItem[];
  render: (office: OfficeDirectoryItem) => string;
}) {
  return (
    <tr>
      <th className="border-b border-slate-100 p-3 align-top text-slate-500">{label}</th>
      {offices.map((office) => (
        <td key={office.slug} className="border-b border-slate-100 p-3 align-top text-slate-700">
          {render(office)}
        </td>
      ))}
    </tr>
  );
}
