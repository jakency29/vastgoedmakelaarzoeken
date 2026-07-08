"use client";

// Contactformulier (naam, e-mail, bericht). Postt naar /api/contact.
// Server-side gerenderd op vaste grootte, dus geen layout shift.

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
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
        <p className="text-lg font-bold">Bericht ontvangen.</p>
        <p className="mt-1 text-sm">Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg ring-1 ring-black/5 sm:p-6"
      aria-label="Contactformulier"
    >
      <p className="text-lg font-extrabold text-brand-900">Stuur ons een bericht</p>
      <p className="mt-1 text-sm text-slate-600">We antwoorden zo snel mogelijk.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="cf-naam" className="block text-sm font-semibold text-brand-800">Naam</label>
          <input
            id="cf-naam"
            name="naam"
            required
            minLength={2}
            placeholder="Voor- en achternaam"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="cf-email" className="block text-sm font-semibold text-brand-800">E-mailadres</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="jij@voorbeeld.be"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="cf-bericht" className="block text-sm font-semibold text-brand-800">Bericht</label>
          <textarea
            id="cf-bericht"
            name="bericht"
            rows={5}
            required
            placeholder="Waarmee kunnen we je helpen?"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400 disabled:opacity-60"
      >
        {status === "sending" ? "Versturen..." : "Bericht versturen"}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          Er ging iets mis. Probeer opnieuw of neem rechtstreeks contact op.
        </p>
      )}
    </form>
  );
}
