"use client";

// Contactformulier (naam, e-mail, bericht). Postt naar /api/contact.
// Server-side gerenderd op vaste grootte, dus geen layout shift.

import { useState } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const naam = String(fd.get("naam") ?? "");
    try {
      await submitToWeb3Forms({
        subject: `Nieuw contactbericht: ${naam}`,
        name: naam,
        email: String(fd.get("email") ?? ""),
        Bericht: String(fd.get("bericht") ?? ""),
        botcheck: String(fd.get("botcheck") ?? ""),
      });
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

      {/* Honeypot tegen spam (Web3Forms). Onzichtbaar voor bezoekers. */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

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
