"use client";

// Verkoper-lead-formulier: enige contactweg op de kantoor- en makelaarpagina's.
// Geen kantoorcontactgegevens zichtbaar; elke inzending is een telbare lead die wij
// verwerken en doorsturen. De kantoornaam gaat mee (verborgen) voor de toewijzing.

import { useState } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

export function SellerLeadForm({
  kantoor,
  kantoorSlug,
  via,
  contactNaam,
}: {
  kantoor?: string;
  kantoorSlug?: string;
  via?: string;
  contactNaam?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const naam = contactNaam ?? kantoor;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await submitToWeb3Forms({
        subject: `Verkoper-lead${kantoor ? `: ${kantoor}` : ""}`,
        name: String(fd.get("naam") ?? ""),
        email: String(fd.get("email") ?? ""),
        Telefoon: String(fd.get("telefoon") ?? ""),
        "Adres van het pand": String(fd.get("adres") ?? ""),
        Omschrijving: String(fd.get("bericht") ?? "") || "niet opgegeven",
        ...(kantoor ? { Kantoor: kantoor } : {}),
        ...(kantoorSlug ? { "Kantoor-ID": kantoorSlug } : {}),
        Bron: via ? `kantoorpagina (${via})` : "kantoorpagina",
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
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg ring-1 ring-black/5 sm:p-6" aria-label="Contactformulier">
      <p className="text-lg font-extrabold text-brand-900">Verkoop je woning?</p>
      <p className="mt-1 text-sm text-slate-600">
        {naam ? `Contacteer ${naam} vrijblijvend via dit formulier. Wij bezorgen je aanvraag.` : "Vul het formulier in en we bezorgen je aanvraag vrijblijvend."}
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="sl-naam" className="block text-sm font-semibold text-brand-800">Naam</label>
          <input id="sl-naam" name="naam" required minLength={2} autoComplete="name" placeholder="Voor- en achternaam" className={input} />
        </div>
        <div>
          <label htmlFor="sl-adres" className="block text-sm font-semibold text-brand-800">Adres van het pand</label>
          <input id="sl-adres" name="adres" required autoComplete="street-address" placeholder="Straat, nummer en gemeente" className={input} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sl-email" className="block text-sm font-semibold text-brand-800">E-mailadres</label>
            <input id="sl-email" name="email" type="email" required autoComplete="email" placeholder="jij@voorbeeld.be" className={input} />
          </div>
          <div>
            <label htmlFor="sl-telefoon" className="block text-sm font-semibold text-brand-800">Telefoon</label>
            <input id="sl-telefoon" name="telefoon" type="tel" required autoComplete="tel" placeholder="0470 12 34 56" className={input} />
          </div>
        </div>
        <div>
          <label htmlFor="sl-bericht" className="block text-sm font-semibold text-brand-800">Korte omschrijving <span className="font-normal text-slate-400">(optioneel)</span></label>
          <textarea id="sl-bericht" name="bericht" rows={3} placeholder="Type woning, reden, timing ..." className={input} />
        </div>
      </div>

      {/* Honeypot tegen spam (Web3Forms). Onzichtbaar voor bezoekers. */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button type="submit" disabled={status === "sending"} className="mt-4 w-full rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400 disabled:opacity-60">
        {status === "sending" ? "Versturen..." : "Verstuur aanvraag"}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-700" role="alert">Er ging iets mis. Probeer opnieuw.</p>
      )}
    </form>
  );
}
