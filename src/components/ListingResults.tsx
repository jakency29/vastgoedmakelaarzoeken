"use client";

import { useMemo, useState } from "react";
import { formatPrijs, type Woning } from "@/lib/woningen";
import { WoningCard } from "./WoningCard";

type Sortering = "nieuwste" | "prijs-oplopend" | "prijs-aflopend" | "grootste";

const PRIJSSTAPPEN = [200000, 250000, 300000, 350000, 400000, 500000, 600000, 750000, 1000000, 1500000];
const EPC_VOLGORDE = ["A++", "A+", "A", "B", "C", "D", "E", "F", "G"];

function epcWaarde(label: string): number {
  const index = EPC_VOLGORDE.indexOf(label.toUpperCase());
  return index === -1 ? EPC_VOLGORDE.length : index;
}

export function ListingResults({ woningen, heading }: { woningen: Woning[]; heading: string }) {
  const [maximumPrijs, setMaximumPrijs] = useState("");
  const [minimumSlaapkamers, setMinimumSlaapkamers] = useState("");
  const [epcLabel, setEpcLabel] = useState("");
  const [sortering, setSortering] = useState<Sortering>("nieuwste");

  const gekendePrijzen = woningen.map((w) => w.prijs).filter((prijs): prijs is number => !!prijs);
  const laagstePrijs = gekendePrijzen.length ? Math.min(...gekendePrijzen) : 0;
  const hoogstePrijs = gekendePrijzen.length ? Math.max(...gekendePrijzen) : 0;
  const hoogsteAantalSlaapkamers = Math.max(0, ...woningen.map((w) => w.slaapkamers ?? 0));
  const prijsOpties = PRIJSSTAPPEN.filter((prijs) => prijs >= laagstePrijs && prijs < hoogstePrijs * 1.25);
  const epcOpties = [...new Set(woningen.map((w) => w.epcLabel).filter((label): label is string => !!label))]
    .sort((a, b) => epcWaarde(a) - epcWaarde(b));

  const resultaten = useMemo(() => {
    const gefilterd = woningen.filter((woning) => {
      if (maximumPrijs && (!woning.prijs || woning.prijs > Number(maximumPrijs))) return false;
      if (minimumSlaapkamers && (woning.slaapkamers ?? 0) < Number(minimumSlaapkamers)) return false;
      if (epcLabel && woning.epcLabel !== epcLabel) return false;
      return true;
    });

    return [...gefilterd].sort((a, b) => {
      if (sortering === "prijs-oplopend") return (a.prijs ?? Number.MAX_SAFE_INTEGER) - (b.prijs ?? Number.MAX_SAFE_INTEGER);
      if (sortering === "prijs-aflopend") return (b.prijs ?? 0) - (a.prijs ?? 0);
      if (sortering === "grootste") return (b.bewoonbaar ?? 0) - (a.bewoonbaar ?? 0);
      if (a.toegevoegdOp && b.toegevoegdOp) return b.toegevoegdOp.localeCompare(a.toegevoegdOp);
      if (a.toegevoegdOp) return -1;
      if (b.toegevoegdOp) return 1;
      return woningen.indexOf(a) - woningen.indexOf(b);
    });
  }, [epcLabel, maximumPrijs, minimumSlaapkamers, sortering, woningen]);

  const filtersActief = !!maximumPrijs || !!minimumSlaapkamers || !!epcLabel || sortering !== "nieuwste";
  const selectClass = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  function resetFilters() {
    setMaximumPrijs("");
    setMinimumSlaapkamers("");
    setEpcLabel("");
    setSortering("nieuwste");
  }

  return (
    <section aria-labelledby="woningresultaten-heading">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Actueel aanbod op ons platform</p>
            <h2 id="woningresultaten-heading" className="mt-1 text-xl font-extrabold tracking-tight text-brand-900">
              {resultaten.length} van {woningen.length} {woningen.length === 1 ? "pand" : "panden"} zichtbaar
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
              Dit overzicht bevat panden van aangesloten vastgoedkantoren. Open een pand om alle kenmerken en de actuele beschikbaarheid bij de aanbieder te controleren.
            </p>
          </div>
          {filtersActief && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-bold text-brand-800 hover:border-brand-400"
            >
              Wis filters
            </button>
          )}
        </div>

        {woningen.length > 1 && (
          <form className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="text-sm font-semibold text-brand-900">
              Maximumprijs
              <select value={maximumPrijs} onChange={(event) => setMaximumPrijs(event.target.value)} className={selectClass}>
                <option value="">Alle prijzen</option>
                {prijsOpties.map((prijs) => <option key={prijs} value={prijs}>Tot {formatPrijs(prijs)}</option>)}
              </select>
            </label>

            <label className="text-sm font-semibold text-brand-900">
              Minimaal slaapkamers
              <select value={minimumSlaapkamers} onChange={(event) => setMinimumSlaapkamers(event.target.value)} className={selectClass}>
                <option value="">Alle aantallen</option>
                {Array.from({ length: hoogsteAantalSlaapkamers }, (_, index) => index + 1).map((aantal) => (
                  <option key={aantal} value={aantal}>{aantal} of meer</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-brand-900">
              EPC-label
              <select value={epcLabel} onChange={(event) => setEpcLabel(event.target.value)} className={selectClass}>
                <option value="">Alle EPC-labels</option>
                {epcOpties.map((label) => <option key={label} value={label}>EPC {label}</option>)}
              </select>
            </label>

            <label className="text-sm font-semibold text-brand-900">
              Sorteren
              <select value={sortering} onChange={(event) => setSortering(event.target.value as Sortering)} className={selectClass}>
                <option value="nieuwste">Nieuwste eerst</option>
                <option value="prijs-oplopend">Laagste prijs eerst</option>
                <option value="prijs-aflopend">Hoogste prijs eerst</option>
                <option value="grootste">Grootste woonoppervlakte</option>
              </select>
            </label>
          </form>
        )}
      </div>

      {resultaten.length ? (
        <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {resultaten.map((woning) => (
            <li key={woning.id} className="min-w-0">
              <WoningCard w={woning} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center" aria-live="polite">
          <p className="font-bold text-brand-900">Geen panden passen bij deze filters.</p>
          <p className="mt-1 text-sm text-slate-600">Verhoog de maximumprijs of wis de filters om het volledige aanbod opnieuw te bekijken.</p>
          <button type="button" onClick={resetFilters} className="mt-4 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800">
            Toon alle panden
          </button>
        </div>
      )}

      <p className="sr-only">Resultaten voor {heading}</p>
    </section>
  );
}
