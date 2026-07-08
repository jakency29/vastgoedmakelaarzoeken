"use client";

// Leadformulier in portaal-stijl: prominente zoekkaart. Postcode + transactietype als kern.
// variant "hero" = grote kaart op de homepage-hero; "sidebar" = compacte kaart naast content.

import { useState } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

const TRANSACTIES = [
  { value: "verkopen", label: "Woning verkopen" },
  { value: "schatten", label: "Woning laten schatten" },
  { value: "verhuren", label: "Woning verhuren" },
  { value: "kopen", label: "Woning kopen" },
] as const;

export function LeadForm({ variant = "sidebar" }: { variant?: "sidebar" | "hero" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const hero = variant === "hero";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const transactie = String(fd.get("transactie") ?? "");
    const label = TRANSACTIES.find((t) => t.value === transactie)?.label ?? transactie;
    const postcode = String(fd.get("postcode") ?? "");
    try {
      await submitToWeb3Forms({
        subject: `Nieuwe lead: ${label} (${postcode})`,
        email: String(fd.get("email") ?? ""),
        "Type aanvraag": label,
        Adres: String(fd.get("adres") ?? "") || "niet opgegeven",
        Postcode: postcode,
        Telefoon: String(fd.get("telefoon") ?? ""),
        Bron: String(fd.get("bron") ?? ""),
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
        <p className="mt-1 text-sm">
          Je vraag is verstuurd. Erkende vastgoedmakelaars uit je gemeente nemen contact op.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg ring-1 ring-black/5 sm:p-6"
      aria-label="Vraag offertes op bij vastgoedmakelaars"
    >
      <p className={`font-extrabold text-brand-900 ${hero ? "text-xl" : "text-lg"}`}>
        Vergelijk vastgoedmakelaars
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Vul je postcode in en vraag vrijblijvend offertes op.
      </p>

      <div className={`mt-4 gap-3 ${hero ? "grid sm:grid-cols-2" : "space-y-3"}`}>
        <div className={hero ? "sm:col-span-2" : ""}>
          <label htmlFor="lf-transactie" className="block text-sm font-semibold text-brand-800">
            Wat wil je doen?
          </label>
          <select
            id="lf-transactie"
            name="transactie"
            required
            defaultValue="verkopen"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-brand-900 focus:border-brand-500"
          >
            {TRANSACTIES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className={hero ? "sm:col-span-2" : ""}>
          <label htmlFor="lf-adres" className="block text-sm font-semibold text-brand-800">
            Adres <span className="font-normal text-slate-400">(optioneel)</span>
          </label>
          <input
            id="lf-adres"
            name="adres"
            autoComplete="street-address"
            placeholder="Straat en nummer"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="lf-postcode" className="block text-sm font-semibold text-brand-800">
            Postcode
          </label>
          <input
            id="lf-postcode"
            name="postcode"
            inputMode="numeric"
            pattern="[1-9][0-9]{3}"
            maxLength={4}
            required
            placeholder="9000"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="lf-telefoon" className="block text-sm font-semibold text-brand-800">
            Telefoon
          </label>
          <input
            id="lf-telefoon"
            name="telefoon"
            type="tel"
            autoComplete="tel"
            required
            placeholder="0470 12 34 56"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>

        <div className={hero ? "sm:col-span-2" : ""}>
          <label htmlFor="lf-email" className="block text-sm font-semibold text-brand-800">
            E-mailadres
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            placeholder="jij@voorbeeld.be"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm font-medium focus:border-brand-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400 disabled:opacity-60"
      >
        {status === "sending" ? "Versturen..." : "Vergelijk nu"}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          Er ging iets mis. Probeer opnieuw of neem contact op.
        </p>
      )}

      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Gratis en vrijblijvend. Enkel erkende makelaars in je gemeente.
      </p>
      <input type="hidden" name="bron" value={variant} />
    </form>
  );
}
