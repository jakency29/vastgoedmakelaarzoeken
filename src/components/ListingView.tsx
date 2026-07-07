// Herbruikbare listing-weergave (overzicht/provincie/gemeente) voor huis- en appartement-takken.

import Link from "next/link";
import { WoningCard } from "./WoningCard";
import type { Woning } from "@/lib/woningen";

type Crumb = { name: string; href?: string };
type Chip = { label: string; href: string; count: number };

export function ListingView({
  breadcrumb,
  title,
  subtitle,
  chips,
  woningen,
}: {
  breadcrumb: Crumb[];
  title: string;
  subtitle: string;
  chips?: Chip[];
  woningen: Woning[];
}) {
  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumb.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-700 hover:underline">{c.name}</Link>
                  ) : (
                    <span className="font-medium text-brand-800">{c.name}</span>
                  )}
                  {i < breadcrumb.length - 1 && <span aria-hidden="true" className="text-slate-300">/</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{subtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {chips && chips.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {chips.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm hover:border-brand-300"
              >
                {c.label} <span className="text-slate-400">({c.count})</span>
              </Link>
            ))}
          </div>
        )}

        {woningen.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {woningen.map((w) => <WoningCard key={w.id} w={w} />)}
          </div>
        ) : (
          <p className="text-slate-600">Er zijn momenteel geen panden beschikbaar in deze categorie.</p>
        )}
      </div>
    </main>
  );
}
