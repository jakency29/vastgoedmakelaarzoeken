"use client";

// Aanmeldformulier voor vastgoedmakelaars/kantoren die willen aansluiten.
// Postt naar /api/aansluiten (los van de consumentenleads).

import { useState } from "react";

export function AansluitenForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/aansluiten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("mislukt");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm">
        <p className="text-lg font-bold">Aanmelding ontvangen.</p>
        <p className="mt-1 text-sm">Bedankt voor je interesse. We nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg ring-1 ring-black/5 sm:p-6"
      aria-label="Aanmelden als vastgoedmakelaar"
    >
      <p className="text-lg font-extrabold text-brand-900">Aanmelden als kantoor</p>
      <p className="mt-1 text-sm text-slate-600">Vul je gegevens in en we nemen contact op.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="af-naam" className="block text-sm font-semibold text-brand-800">Naam</label>
          <input
            id="af-naam"
            name="naam"
            required
            minLength={2}
            placeholder="Voor- en achternaam"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="af-kantoor" className="block text-sm font-semibold text-brand-800">Vastgoedkantoor</label>
          <input
            id="af-kantoor"
            name="kantoor"
            placeholder="Naam van je kantoor"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="af-email" className="block text-sm font-semibold text-brand-800">E-mailadres</label>
          <input
            id="af-email"
            name="email"
            type="email"
            required
            placeholder="jij@kantoor.be"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="af-telefoon" className="block text-sm font-semibold text-brand-800">Telefoon <span className="font-normal text-slate-400">(optioneel)</span></label>
          <input
            id="af-telefoon"
            name="telefoon"
            type="tel"
            placeholder="0470 12 34 56"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="af-bericht" className="block text-sm font-semibold text-brand-800">Bericht <span className="font-normal text-slate-400">(optioneel)</span></label>
          <textarea
            id="af-bericht"
            name="bericht"
            rows={4}
            placeholder="Wil je lid worden of heb je een vraag? Laat het hier weten."
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400 disabled:opacity-60"
      >
        {status === "sending" ? "Versturen..." : "Aanmelding versturen"}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          Er ging iets mis. Probeer opnieuw of neem rechtstreeks contact op.
        </p>
      )}
    </form>
  );
}
