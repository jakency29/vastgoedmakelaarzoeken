"use client";

// Dienst-specifiek aanvraagformulier voor de kennisbank-zijbalk (asbestattest, EPC,
// elektriciteitskeuring, ...). Vervangt op dienst-pagina's het algemene makelaarsformulier.
// De dienst gaat mee in het onderwerp en als veld, zodat elke lead herkenbaar is.

import { useState } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

export function DienstLeadForm({ dienst, cta, slug }: { dienst: string; cta: string; slug?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await submitToWeb3Forms({
        subject: `Aanvraag: ${dienst}`,
        name: String(fd.get("naam") ?? ""),
        email: String(fd.get("email") ?? ""),
        Telefoon: String(fd.get("telefoon") ?? ""),
        "Adres van het pand": String(fd.get("adres") ?? ""),
        Omschrijving: String(fd.get("bericht") ?? "") || "niet opgegeven",
        Dienst: dienst,
        ...(slug ? { Pagina: slug } : {}),
        Bron: "kennisbank",
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
        <p className="text-lg font-bold">Aanvraag ontvangen.</p>
        <p className="mt-1 text-sm">Bedankt. We verwerken je aanvraag en nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  const input = "mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg ring-1 ring-black/5 sm:p-6" aria-label={`${dienst} aanvragen`}>
      <p className="text-lg font-extrabold text-brand-900">{cta}</p>
      <p className="mt-1 text-sm text-slate-600">Vul het formulier in. Wij bezorgen je aanvraag en je krijgt vrijblijvend een prijs of afspraak.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="dl-naam" className="block text-sm font-semibold text-brand-800">Naam</label>
          <input id="dl-naam" name="naam" required minLength={2} autoComplete="name" placeholder="Voor- en achternaam" className={input} />
        </div>
        <div>
          <label htmlFor="dl-adres" className="block text-sm font-semibold text-brand-800">Adres van het pand</label>
          <input id="dl-adres" name="adres" required autoComplete="street-address" placeholder="Straat, nummer en gemeente" className={input} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="dl-email" className="block text-sm font-semibold text-brand-800">E-mailadres</label>
            <input id="dl-email" name="email" type="email" required autoComplete="email" placeholder="jij@voorbeeld.be" className={input} />
          </div>
          <div>
            <label htmlFor="dl-telefoon" className="block text-sm font-semibold text-brand-800">Telefoon</label>
            <input id="dl-telefoon" name="telefoon" type="tel" required autoComplete="tel" placeholder="0470 12 34 56" className={input} />
          </div>
        </div>
        <div>
          <label htmlFor="dl-bericht" className="block text-sm font-semibold text-brand-800">Korte omschrijving <span className="font-normal text-slate-400">(optioneel)</span></label>
          <textarea id="dl-bericht" name="bericht" rows={3} placeholder="Type woning, bouwjaar, timing ..." className={input} />
        </div>
      </div>

      {/* Honeypot tegen spam (Web3Forms). Onzichtbaar voor bezoekers. */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button type="submit" disabled={status === "sending"} className="mt-4 w-full rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400 disabled:opacity-60">
        {status === "sending" ? "Versturen..." : cta}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-700" role="alert">Er ging iets mis. Probeer opnieuw.</p>
      )}
    </form>
  );
}
