"use client";

import { useState } from "react";

export function AdresKopieerKnop({ adres }: { adres: string }) {
  const [melding, setMelding] = useState("");

  async function kopieer() {
    try {
      await navigator.clipboard.writeText(adres);
      setMelding("Adres gekopieerd.");
    } catch {
      setMelding("Kopiëren lukt niet. Selecteer en kopieer het adres hierboven.");
    }
  }

  return (
    <div>
      <button type="button" onClick={kopieer} className="min-h-11 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50">
        Kopieer adres
      </button>
      <p role="status" aria-live="polite" className="mt-1 min-h-5 text-xs leading-5 text-slate-600">{melding}</p>
    </div>
  );
}
