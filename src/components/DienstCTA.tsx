// Contextuele CTA naar het enige leadformulier op de pagina. Alle kennisbank-CTA's
// gebruiken zo hetzelfde formulier, dezelfde privacytekst en dezelfde verwerking.

export function DienstCTA({ label = "Gratis offerte aanvragen" }: { label?: string }) {
  return (
    <div
      className="my-8 rounded-2xl border border-accent-300 p-5 text-center"
      style={{ backgroundColor: "rgba(255,192,67,0.12)" }}
    >
      <a
        href="#leadform"
        className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400"
      >
        {label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
