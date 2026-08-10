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
  min = "0",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  suffix?: string;
  min?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-brand-900">{label}</span>
      <span className="relative mt-1.5 block">
        <input
          id={id}
          type="number"
          min={min}
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
        <Field id="ww-correctie" label="Correctie voor staat" value={conditionAdjustment} onChange={setConditionAdjustment} step="1" min="-50" suffix="%" />
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

export function RenovatieAankoopCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("300000");
  const [registrationRate, setRegistrationRate] = useState("2");
  const [deedCosts, setDeedCosts] = useState("6500");
  const [renovationBudget, setRenovationBudget] = useState("100000");
  const [reserve, setReserve] = useState("15000");
  const [ownFunds, setOwnFunds] = useState("80000");

  const price = numberFrom(purchasePrice);
  const rate = numberFrom(registrationRate, 20);
  const additionalPurchaseCosts = numberFrom(deedCosts);
  const renovation = numberFrom(renovationBudget);
  const safetyReserve = numberFrom(reserve);
  const equity = numberFrom(ownFunds);
  const registrationTax = price * (rate / 100);
  const totalProject = price + registrationTax + additionalPurchaseCosts + renovation + safetyReserve;
  const estimatedFinancing = Math.max(totalProject - equity, 0);

  return (
    <section id="aankoop-renovatie-calculator" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve projectraming</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Hoe bereken je de totaalprijs van aankoop en renovatie?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Tel de aankoopprijs, het zelf gekozen belastingpercentage, de andere aankoopkosten, het
        renovatiebudget en een reserve bij elkaar. Trek daarna je eigen middelen af om een eerste
        indicatie van de financieringsbehoefte te krijgen.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="ar-aankoopprijs" label="Aankoopprijs woning" value={purchasePrice} onChange={setPurchasePrice} suffix="€" />
        <Field id="ar-verkooprecht" label="Toepasselijk belastingpercentage" value={registrationRate} onChange={setRegistrationRate} step="0.1" suffix="%" />
        <Field id="ar-akte" label="Andere aankoop- en kredietkosten" value={deedCosts} onChange={setDeedCosts} suffix="€" />
        <Field id="ar-renovatie" label="Voorlopig renovatiebudget" value={renovationBudget} onChange={setRenovationBudget} suffix="€" />
        <Field id="ar-reserve" label="Reserve voor onverwachte kosten" value={reserve} onChange={setReserve} suffix="€" />
        <Field id="ar-eigen-middelen" label="Beschikbare eigen middelen" value={ownFunds} onChange={setOwnFunds} suffix="€" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <Result label="Berekende aankoopbelasting" value={registrationTax} />
        <Result label="Totale projectraming" value={totalProject} emphasis />
        <Result label="Geschatte financieringsbehoefte" value={estimatedFinancing} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Dit is een transparante optelsom, geen kredietadvies of offerte. Controleer het toepasselijke
        belastingtarief en de akte- en kredietkosten bij je notaris en bank. Laat de renovatie vóór
        een bindend bod technisch ramen en pas de ingevoerde bedragen daarop aan.
      </p>
    </section>
  );
}

export function SleutelOpDeDeurCalculator() {
  const [buildingPrice, setBuildingPrice] = useState("300000");
  const [landPrice, setLandPrice] = useState("150000");
  const [excludedWorks, setExcludedWorks] = useState("35000");
  const [studyCosts, setStudyCosts] = useState("25000");
  const [vatRate, setVatRate] = useState("21");

  const building = numberFrom(buildingPrice);
  const land = numberFrom(landPrice);
  const extras = numberFrom(excludedWorks);
  const studies = numberFrom(studyCosts);
  const rate = numberFrom(vatRate, 30);
  const taxableWorks = building + extras;
  const vat = taxableWorks * (rate / 100);
  const buildingWithVat = taxableWorks + vat;
  const projectTotal = land + buildingWithVat + studies;

  return (
    <section id="sleutel-op-de-deur-calculator" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve all-in raming</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Hoe bereken je de totale prijs van een sleutel-op-de-deurwoning?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Vul de geadverteerde bouwprijs, grond, uitgesloten werken, studie- en aansluitingskosten en
        het toepasselijke btw-percentage in. Zo zie je hoeveel het volledige project kan afwijken
        van de bouwprijs alleen.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="sod-bouwprijs" label="Bouwprijs exclusief btw" value={buildingPrice} onChange={setBuildingPrice} suffix="€" />
        <Field id="sod-grond" label="Prijs van de bouwgrond" value={landPrice} onChange={setLandPrice} suffix="€" />
        <Field id="sod-uitgesloten" label="Uitgesloten werken exclusief btw" value={excludedWorks} onChange={setExcludedWorks} suffix="€" />
        <Field id="sod-studies" label="Studies, aansluitingen en andere kosten" value={studyCosts} onChange={setStudyCosts} suffix="€" />
        <Field id="sod-btw" label="Btw op bouw en ingevoerde werken" value={vatRate} onChange={setVatRate} step="0.1" suffix="%" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <Result label="Btw op bouw en werken" value={vat} />
        <Result label="Bouw en werken inclusief btw" value={buildingWithVat} />
        <Result label="Voorlopige totale projectprijs" value={projectTotal} emphasis />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        De raming bevat alleen de bedragen die je invoert. Verkooprecht of btw op de grond,
        notariskosten, kredietkosten, prijsherzieningen, tuin, schilderwerken en andere uitsluitingen
        kunnen nog ontbreken. Controleer elke post in het lastenboek en vraag een gepersonaliseerde
        afrekening aan notaris, bank en bouwfirma.
      </p>
    </section>
  );
}

const PID_ITEMS = [
  "Plannen en uitvoeringsdetails",
  "Lastenboeken en technische fiches",
  "As-builtplannen van leidingen en technieken",
  "Gebruiksaanwijzingen en onderhoudsvoorschriften",
  "Garantiebewijzen en keuringsverslagen",
  "Gegevens van aannemers en ontwerpers",
  "Veiligheidsinformatie voor latere werken",
  "Aanvullingen van verbouwingen sinds mei 2001",
] as const;

export function PidChecklist() {
  const [checked, setChecked] = useState<boolean[]>(PID_ITEMS.map(() => false));
  const completed = checked.filter(Boolean).length;

  return (
    <section id="pid-checklist" className="my-10 scroll-mt-24 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve dossiercheck</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Welke onderdelen van het postinterventiedossier heb je al?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Vink aan welke stukken je hebt teruggevonden. De teller helpt je het dossier te ordenen,
        maar bepaalt niet of het juridisch volledig is.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {PID_ITEMS.map((item, index) => (
          <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-700"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-900 p-4 text-white" aria-live="polite">
        <p className="font-bold">{completed} van {PID_ITEMS.length} onderdelen aangeduid</p>
        <button
          type="button"
          onClick={() => setChecked(PID_ITEMS.map(() => false))}
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold hover:bg-white/10"
        >
          Opnieuw beginnen
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        De vereiste inhoud hangt af van de uitgevoerde werken en de betrokken bouwpartners. Laat een
        ontbrekend of onvolledig dossier beoordelen voordat je de woning verkoopt of nieuwe werken start.
      </p>
    </section>
  );
}
