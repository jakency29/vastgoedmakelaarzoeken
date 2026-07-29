"use client";

import { useState } from "react";

const ITEMS = [
  "Doel en gewenste verkoopdatum bepaald",
  "Woning laten schatten",
  "Verkoopmethode gekozen",
  "Verplichte attesten en documenten verzameld",
  "Woning en presentatie verkoopklaar gemaakt",
  "Advertentie en verplichte vermeldingen gecontroleerd",
  "Biedingen op prijs én voorwaarden vergeleken",
  "Bod en verkoopovereenkomst door de notaris laten controleren",
];

export function VerkoopChecklist() {
  const [checked, setChecked] = useState(() => ITEMS.map(() => false));
  const completed = checked.filter(Boolean).length;
  const progress = Math.round((completed / ITEMS.length) * 100);

  function toggle(index: number) {
    setChecked((current) => current.map((value, itemIndex) => (itemIndex === index ? !value : value)));
  }

  function reset() {
    setChecked(ITEMS.map(() => false));
  }

  return (
    <section className="my-10 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Interactieve checklist</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-900">
        Welke verkoopstappen heb je al voorbereid?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Vink elke afgeronde stap aan. Zo zie je welke voorbereiding nog ontbreekt voordat je een
        bod of verkoopovereenkomst aanvaardt.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <div
          className="h-3 flex-1 overflow-hidden rounded-full bg-white ring-1 ring-brand-100"
          role="progressbar"
          aria-label="Voortgang verkoopchecklist"
          aria-valuemin={0}
          aria-valuemax={ITEMS.length}
          aria-valuenow={completed}
          aria-valuetext={`${completed} van ${ITEMS.length} stappen afgerond`}
        >
          <div
            className="h-full rounded-full bg-accent-500 transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="min-w-20 text-right text-sm font-bold text-brand-900" aria-live="polite">
          {completed}/{ITEMS.length} klaar
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {ITEMS.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggle(index)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-brand-800"
              />
              <span className={checked[index] ? "text-slate-500 line-through" : "font-medium text-brand-900"}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={reset}
        disabled={completed === 0}
        className="mt-5 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-800 transition hover:border-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Checklist wissen
      </button>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        De selectie wordt alleen in deze geopende pagina bijgehouden en niet opgeslagen of
        verstuurd.
      </p>
    </section>
  );
}
