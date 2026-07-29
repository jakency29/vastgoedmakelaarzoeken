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
