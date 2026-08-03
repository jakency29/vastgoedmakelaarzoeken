"use client";

import { useState } from "react";

const currency = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function numberFrom(value: string, maximum = 100_000_000) {
  const parsed = Number(value.replace(",", "."));
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), maximum);
}

function Field({
  id,
  label,
  value,
  onChange,
  step = "1000",
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  suffix?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-brand-900">{label}</span>
      <span className="relative mt-1.5 block">
        <input
          id={id}
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 pr-12 text-base font-semibold text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-500">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

function Result({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: number;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        emphasis
          ? "rounded-xl bg-brand-900 p-4 text-white"
          : "rounded-xl border border-slate-200 bg-white p-4"
      }
    >
      <p className={emphasis ? "text-sm text-brand-100" : "text-sm text-slate-500"}>{label}</p>
      <p className="mt-1 text-xl font-extrabold">{currency.format(value)}</p>
    </div>
  );
}

export function MakelaarskostenCalculator() {
  const [salePrice, setSalePrice] = useState("300000");
  const [percentage, setPercentage] = useState("3");
  const price = numberFrom(salePrice);
  const rate = numberFrom(percentage, 20);
  const commissionExVat = price * (rate / 100);
  const vat = commissionExVat * 0.21;
  const commissionTotal = commissionExVat + vat;

  return (
    <section id="makelaarskosten-calculator" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve calculator</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Hoe bereken je de makelaarscommissie?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Vul de verwachte verkoopprijs en het commissiepercentage exclusief btw in. De calculator
        telt automatisch 21% btw bij het ereloon.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          id="mc-verkoopprijs"
          label="Verwachte verkoopprijs"
          value={salePrice}
          onChange={setSalePrice}
          suffix="€"
        />
        <Field
          id="mc-percentage"
          label="Commissie exclusief btw"
          value={percentage}
          onChange={setPercentage}
          step="0.1"
          suffix="%"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <Result label="Commissie exclusief btw" value={commissionExVat} />
        <Result label="21% btw" value={vat} />
        <Result label="Totaal inclusief btw" value={commissionTotal} emphasis />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Dit is een rekenvoorbeeld, geen offerte. Controleer waarop het percentage wordt toegepast
        en welke diensten in het tarief zijn inbegrepen.
      </p>
    </section>
  );
}

export function NettoOpbrengstCalculator() {
  const [salePrice, setSalePrice] = useState("350000");
  const [loan, setLoan] = useState("150000");
  const [percentage, setPercentage] = useState("3");
  const [certificates, setCertificates] = useState("1500");
  const [otherCosts, setOtherCosts] = useState("1000");

  const price = numberFrom(salePrice);
  const outstandingLoan = numberFrom(loan);
  const rate = numberFrom(percentage, 20);
  const certificateCosts = numberFrom(certificates);
  const additionalCosts = numberFrom(otherCosts);
  const commissionTotal = price * (rate / 100) * 1.21;
  const sellingCosts = commissionTotal + certificateCosts + additionalCosts;
  const estimatedNet = price - outstandingLoan - sellingCosts;

  return (
    <section id="netto-opbrengst-calculator" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve calculator</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Hoe bereken je de geschatte netto-opbrengst?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Trek het openstaande krediet en de ingevoerde verkoopkosten af van de verwachte
        verkoopprijs. De makelaarscommissie wordt inclusief 21% btw berekend.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="no-verkoopprijs" label="Verwachte verkoopprijs" value={salePrice} onChange={setSalePrice} suffix="€" />
        <Field id="no-krediet" label="Openstaand woonkrediet" value={loan} onChange={setLoan} suffix="€" />
        <Field
          id="no-commissie"
          label="Commissie exclusief btw"
          value={percentage}
          onChange={setPercentage}
          step="0.1"
          suffix="%"
        />
        <Field id="no-attesten" label="Attesten en keuringen" value={certificates} onChange={setCertificates} suffix="€" />
        <Field id="no-overig" label="Andere verkoopkosten" value={otherCosts} onChange={setOtherCosts} suffix="€" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <Result label="Commissie inclusief btw" value={commissionTotal} />
        <Result label="Totale verkoopkosten" value={sellingCosts} />
        <Result label="Geschatte netto-opbrengst" value={estimatedNet} emphasis />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        De uitkomst is indicatief. Vraag je bank, notaris en dienstverleners naar de exacte
        afrekening. Belastingen, een wederbeleggingsvergoeding en andere dossierkosten zijn alleen
        inbegrepen wanneer je ze zelf bij de andere verkoopkosten optelt.
      </p>
    </section>
  );
}

export function EpcFBudgetCalculator() {
  const [askingPrice, setAskingPrice] = useState("350000");
  const [totalBudget, setTotalBudget] = useState("400000");
  const [renovationBudget, setRenovationBudget] = useState("50000");
  const [reserve, setReserve] = useState("15000");

  const asking = numberFrom(askingPrice);
  const budget = numberFrom(totalBudget);
  const renovation = numberFrom(renovationBudget);
  const safetyReserve = numberFrom(reserve);
  const maximumOffer = Math.max(budget - renovation - safetyReserve, 0);
  const difference = maximumOffer - asking;

  return (
    <section id="epc-f-budgetcalculator" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve budgetcheck</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Hoe bereken je een haalbaar bod voor een woning met EPC F?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Trek je renovatiebudget en veiligheidsreserve af van je totale beschikbare budget. De
        uitkomst is je budgettaire bovengrens voor het pand, niet automatisch de marktwaarde.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="epcf-vraagprijs" label="Vraagprijs" value={askingPrice} onChange={setAskingPrice} suffix="€" />
        <Field id="epcf-totaalbudget" label="Totaal beschikbaar budget" value={totalBudget} onChange={setTotalBudget} suffix="€" />
        <Field id="epcf-renovatie" label="Voorlopig renovatiebudget" value={renovationBudget} onChange={setRenovationBudget} suffix="€" />
        <Field id="epcf-reserve" label="Reserve voor onverwachte kosten" value={reserve} onChange={setReserve} suffix="€" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <Result label="Budgettaire bovengrens bod" value={maximumOffer} emphasis />
        <Result label="Verschil met vraagprijs" value={difference} />
        <Result label="Renovatie en reserve samen" value={renovation + safetyReserve} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        De berekening houdt geen rekening met aankoopkosten, kredietvoorwaarden of de werkelijke
        marktwaarde. Voeg die posten afzonderlijk toe aan je totaalbudget en laat de woning vóór
        een bindend bod technisch en financieel beoordelen.
      </p>
    </section>
  );
}

export function WoningWaardeQuickscan() {
  const [area, setArea] = useState("160");
  const [referencePrice, setReferencePrice] = useState("2500");
  const [conditionAdjustment, setConditionAdjustment] = useState("0");

  const squareMeters = numberFrom(area, 10_000);
  const pricePerSquareMeter = numberFrom(referencePrice, 100_000);
  const adjustment = Math.min(Math.max(Number(conditionAdjustment) || 0, -50), 50) / 100;
  const centralValue = squareMeters * pricePerSquareMeter * (1 + adjustment);
  const lowerValue = centralValue * 0.925;
  const upperValue = centralValue * 1.075;

  return (
    <section id="woningwaarde-quickscan" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve quickscan</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Hoe maak je zelf een eerste berekening van de woningwaarde?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Gebruik de bewoonbare oppervlakte en een lokale referentieprijs per vierkante meter. Pas
        daarna voorzichtig aan voor de staat van de woning.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Field id="ww-oppervlakte" label="Bewoonbare oppervlakte" value={area} onChange={setArea} step="1" suffix="m²" />
        <Field id="ww-referentie" label="Lokale referentieprijs" value={referencePrice} onChange={setReferencePrice} step="50" suffix="€/m²" />
        <Field id="ww-correctie" label="Correctie voor staat" value={conditionAdjustment} onChange={setConditionAdjustment} step="1" suffix="%" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <Result label="Voorzichtige ondergrens" value={lowerValue} />
        <Result label="Centrale rekenwaarde" value={centralValue} emphasis />
        <Result label="Voorzichtige bovengrens" value={upperValue} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Vul zelf een actuele referentieprijs uit je buurt in. Deze quickscan is geen automatische
        waardering en geen officieel schattingsverslag. Ligging, perceel, EPC, afwerking,
        vergunningen en marktvraag kunnen de uiteindelijke verkoopwaarde sterk wijzigen.
      </p>
    </section>
  );
}
