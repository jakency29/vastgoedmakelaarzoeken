// "Lees ook"-sectie met gerelateerde links als kaartjes (playbook: related onderaan).

import Link from "next/link";
import type { RelatedLink } from "@/lib/types";

export function RelatedLinks({ items }: { items: RelatedLink[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="lees-ook">
      <h2 id="lees-ook" className="text-xl font-extrabold tracking-tight text-brand-900">
        Lees ook
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <Link
            key={r.slug}
            href={`/${r.slug}`}
            className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-brand-800 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
          >
            {r.label}
            <svg className="shrink-0 text-accent-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
