"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type KnowledgeItem = {
  title: string;
  slug: string;
  description: string;
};

export type KnowledgeGroup = {
  titel: string;
  items: KnowledgeItem[];
};

const TASKS = [
  {
    title: "Ik wil mijn woning verkopen",
    description: "Bekijk de verkoopstappen, documenten, kosten en mogelijke verkoopmethodes.",
    href: "/woning-verkopen",
    icon: "sell",
  },
  {
    title: "Ik wil mijn woning laten schatten",
    description: "Ontdek hoe een waardebepaling werkt en welke factoren de waarde beïnvloeden.",
    href: "/huis-laten-schatten",
    icon: "value",
  },
  {
    title: "Ik wil een woning kopen",
    description: "Bereid je bod, financiering, documenten en aankoopbegeleiding voor.",
    href: "/aankoopmakelaar",
    icon: "buy",
  },
  {
    title: "Ik heb een woning geërfd",
    description: "Lees wat erfgenamen, belastingen en de verkoop van de woning betekenen.",
    href: "/erfenis-huis-ouders",
    icon: "inherit",
  },
  {
    title: "Ik moet verkoopattesten regelen",
    description: "Controleer welke attesten en documenten bij een verkoop nodig kunnen zijn.",
    href: "/huis-verkopen-verplichtingen",
    icon: "documents",
  },
  {
    title: "Ik ga bouwen of verbouwen",
    description: "Vind informatie over vergunningen, renovatie, kosten en verplichtingen.",
    href: "/bouwen-of-verbouwen",
    icon: "renovate",
  },
] as const;

const TOOLS = [
  {
    title: "Makelaarscommissie berekenen",
    description: "Bereken de commissie exclusief en inclusief 21% btw.",
    href: "/kosten-vastgoedmakelaar#makelaarskosten-calculator",
  },
  {
    title: "Netto-opbrengst schatten",
    description: "Trek krediet en verkoopkosten af van de verwachte verkoopprijs.",
    href: "/kosten-verkoop-huis#netto-opbrengst-calculator",
  },
  {
    title: "Verkoopchecklist gebruiken",
    description: "Vink af welke verkoopstappen je al hebt voorbereid.",
    href: "/woning-verkopen#verkoopchecklist",
  },
] as const;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function themeId(theme: string) {
  return theme
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function TaskIcon({ type }: { type: (typeof TASKS)[number]["icon"] }) {
  const common = "h-6 w-6";
  if (type === "value") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 19V9l8-5 8 5v10H4Z" strokeLinejoin="round" />
        <path d="M8 14h8M12 10v8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "buy") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 11 12 4l9 7M6 10v10h12V10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15h6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "inherit") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="8" cy="7" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M3 20c.5-4 2.3-6 5-6s4.5 2 5 6M14 20c.3-2.7 1.5-4.2 3.5-4.2S20.7 17.3 21 20" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "documents") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M7 3h7l4 4v14H7V3Z" strokeLinejoin="round" />
        <path d="M14 3v5h5M10 13h5M10 17h5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "renovate") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="m4 20 6-6M14 4l6 6M12 6l6 6-3 3-6-6 3-3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m5 17 2 2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 19V9l8-5 8 5v10H4Z" strokeLinejoin="round" />
      <path d="M8 13h8M15 10l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KnowledgeBankExplorer({ groups }: { groups: KnowledgeGroup[] }) {
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState("Alle thema's");
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  const filteredGroups = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return groups
      .filter((group) => activeTheme === "Alle thema's" || group.titel === activeTheme)
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!normalizedQuery) return true;
          return normalize(`${item.title} ${item.description} ${item.slug}`).includes(normalizedQuery);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeTheme, groups, query]);

  const resultCount = filteredGroups.reduce((sum, group) => sum + group.items.length, 0);
  const hasFilters = query.trim().length > 0 || activeTheme !== "Alle thema's";

  function clearFilters() {
    setQuery("");
    setActiveTheme("Alle thema's");
  }

  return (
    <>
      <section aria-labelledby="taken">
        <h2 id="taken" className="text-2xl font-extrabold tracking-tight text-brand-900">
          Wat wil je regelen?
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Kies je situatie en ga direct naar de gids die de volledige taak uitlegt.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TASKS.map((task) => (
            <Link
              key={task.href}
              href={task.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                <TaskIcon type={task.icon} />
              </span>
              <h3 className="mt-4 font-bold text-brand-900 group-hover:text-brand-700">{task.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{task.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-brand-900 p-6 text-white sm:p-8" aria-labelledby="hulpmiddelen">
        <h2 id="hulpmiddelen" className="text-2xl font-extrabold tracking-tight">
          Welke hulpmiddelen kun je gebruiken?
        </h2>
        <p className="mt-2 max-w-2xl text-brand-100">
          Bereken een indicatie of houd je voorbereiding bij met de interactieve onderdelen.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:border-accent-300 hover:bg-white/15"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-bold">{tool.title}</span>
                <svg className="shrink-0 text-accent-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-brand-100">{tool.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="gids-zoeken">
        <h2 id="gids-zoeken" className="text-2xl font-extrabold tracking-tight text-brand-900">
          Welke gids zoek je?
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Zoek in alle gidsen of beperk de resultaten tot één vastgoedthema.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-brand-50/60 p-5">
          <label htmlFor="kennisbank-zoeken" className="block text-sm font-bold text-brand-900">
            Zoek op onderwerp of vraag
          </label>
          <div className="relative mt-2">
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" strokeLinecap="round" />
            </svg>
            <input
              id="kennisbank-zoeken"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Bijvoorbeeld asbestattest, erfenis of verkoopkosten"
              className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Filter op thema">
            <button
              type="button"
              aria-pressed={activeTheme === "Alle thema's"}
              onClick={() => setActiveTheme("Alle thema's")}
              className={activeTheme === "Alle thema's" ? "rounded-full bg-brand-800 px-4 py-2 text-sm font-bold text-white" : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:border-brand-300"}
            >
              Alle thema&apos;s ({total})
            </button>
            {groups.map((group) => (
              <button
                key={group.titel}
                type="button"
                aria-pressed={activeTheme === group.titel}
                onClick={() => setActiveTheme(group.titel)}
                className={activeTheme === group.titel ? "rounded-full bg-brand-800 px-4 py-2 text-sm font-bold text-white" : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:border-brand-300"}
              >
                {group.titel} ({group.items.length})
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-brand-800" aria-live="polite">
              {resultCount} {resultCount === 1 ? "gids gevonden" : "gidsen gevonden"}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-bold text-brand-700 underline underline-offset-2"
              >
                Zoekopdracht en filters wissen
              </button>
            )}
          </div>
        </div>

        {filteredGroups.length > 0 ? (
          <div className="mt-10 space-y-12">
            {filteredGroups.map((group) => (
              <section key={group.titel} id={themeId(group.titel)} className="scroll-mt-24">
                <h3 className="text-xl font-extrabold tracking-tight text-brand-900">{group.titel}</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/${item.slug}`}
                        className="group flex h-full items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-brand-800 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        <svg className="mt-0.5 shrink-0 text-accent-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-lg font-bold text-brand-900">Geen passende gids gevonden</h3>
            <p className="mt-2 text-sm text-slate-600">
              Probeer een kortere zoekterm of wis het gekozen thema.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-full bg-brand-800 px-5 py-2.5 text-sm font-bold text-white"
            >
              Alle gidsen tonen
            </button>
          </div>
        )}
      </section>
    </>
  );
}
