"use client";

// CTA-knop die de Typeform-popup opent. Contextueel label per dienst.
// TYPEFORM_ID is de form-ID uit de share/embed-URL (form.typeform.com/to/<id>),
// niet het langere "live" embed-ID. embed.js wordt op de contentpagina geladen;
// tf.load() koppelt de knop ook na client-side navigatie.

import { useEffect } from "react";

const TYPEFORM_ID = "JfgTVpPn";

export function DienstCTA({ label = "Gratis offerte aanvragen" }: { label?: string }) {
  useEffect(() => {
    (window as unknown as { tf?: { load?: () => void } }).tf?.load?.();
  }, []);

  return (
    <div
      className="my-8 rounded-2xl border border-accent-300 p-5 text-center"
      style={{ backgroundColor: "rgba(255,192,67,0.12)" }}
    >
      <button
        type="button"
        data-tf-popup={TYPEFORM_ID}
        data-tf-iframe-props={`title=${label}`}
        className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400"
      >
        {label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
