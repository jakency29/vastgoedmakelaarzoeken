import type { ReactNode } from "react";

const formatter = new Intl.DateTimeFormat("nl-BE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function DirectAnswer({
  children,
  note,
  updated,
}: {
  children: ReactNode;
  note?: string;
  updated?: string;
}) {
  const displayDate = updated ? formatter.format(new Date(updated)) : null;

  return (
    <section
      aria-labelledby="kort-antwoord"
      className="mb-8 rounded-2xl border border-brand-200 bg-brand-50/70 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="kort-antwoord"
          className="text-sm font-extrabold uppercase tracking-wide text-brand-800"
        >
          Kort antwoord
        </h2>
        {displayDate && (
          <p className="text-xs font-medium text-slate-500">
            Inhoud gecontroleerd op {displayDate}
          </p>
        )}
      </div>
      <div className="mt-3 text-base leading-relaxed text-slate-700 [&>p:first-child]:mt-0">
        {children}
      </div>
      {note && (
        <aside className="mt-4 flex gap-3 rounded-xl border border-accent-300 bg-white p-4">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-sm font-extrabold text-brand-900"
          >
            !
          </span>
          <p className="text-sm leading-relaxed text-brand-950">{note}</p>
        </aside>
      )}
    </section>
  );
}
