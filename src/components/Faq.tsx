// Zichtbare FAQ (3-5 vragen). Voedt FAQPage JSON-LD; antwoorden staan altijd zichtbaar.

import type { FaqItem } from "@/lib/types";

export function Faq({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-12" aria-labelledby="faq">
      <h2 id="faq" className="text-2xl font-extrabold tracking-tight text-brand-900">
        Veelgestelde vragen
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-brand-900 marker:content-none">
              {f.q}
              <svg className="shrink-0 text-accent-600 transition-transform group-open:rotate-45" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="mt-3 leading-relaxed text-slate-700">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
