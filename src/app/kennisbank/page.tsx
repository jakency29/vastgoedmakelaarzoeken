// Kennisbank: overzicht van alle gidsen, gegroepeerd per thema (afgeleid uit de slug).

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPages } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Kennisbank: gidsen over kopen, verkopen en verhuren" },
  description:
    "De kennisbank bundelt alle gidsen over vastgoed in Belgie: verkopen, kopen, financiering, attesten, belastingen, huren en verbouwen. Vind snel het juiste antwoord.",
  alternates: { canonical: "/kennisbank" },
};

// Thema's met een matcher op de slug. Eerste match wint; de rest komt bij "Overige gidsen".
const THEMAS: { titel: string; match: RegExp }[] = [
  { titel: "Attesten en verplichtingen", match: /asbest|epc|elektriciteitskeuring|bodemattest|mazouttank|verplichtingen|co2-meter|conformiteitsattest|postinterventiedossier/ },
  { titel: "Verkopen", match: /verkop|compromis|akte-verlijden|bod-|bieden|optie-nemen|opschortende|verkoop|kosten-vastgoedmakelaar|huis-verkopen-met-makelaar|verborgen-gebreken|erfgenamen|openbare-verkoop|minimum-tijd|huis-gekocht/ },
  { titel: "Kopen en financiering", match: /kopen|lening|hypothe|spaargeld|inbreng|krediet|schuldsaldo|overbrugg|afgekeurde-elektr|aankoopmakelaar/ },
  { titel: "Belasting, erfenis en schenking", match: /belasting|registratierechten|meerwaarde|successie|schenk|erfenis|miserietaks|kadastraal|ouderlijk-huis/ },
  { titel: "Huren en verhuren", match: /huur|verhuren|blokpolis|gemeenschappelijke-kosten|verzekeringen-zijn-verplicht|plaatsbeschrijving|staat-van-bevinding/ },
  { titel: "Bouwen en verbouwen", match: /bouwen|verbouw|renovatie|nieuwbouw|vergunning|isoleren|container|modulair|staalbouw|sleutel-op-de-deur|tuinhuis|totaalrenovatie|bouwgrond/ },
  { titel: "Waarde en schatten", match: /waarde|schatt|mobiscore/ },
  { titel: "Wonen en eigendom", match: /erfpacht|opstal|voorkoop|overhangende|brievenbus|gras-afrijden|kangoeroe|lijfrente|huurkoop|alleenstaande|duurste-gemeente|wallonie|bewoonbare|syndicus/ },
];

export default function KennisbankPage() {
  const pages = getAllPages().filter((p) => !p.noindex && !p.slug.startsWith("vastgoedkantoren/"));
  const groepen: { titel: string; items: { title: string; slug: string }[] }[] = [
    ...THEMAS.map((t) => ({ titel: t.titel, items: [] as { title: string; slug: string }[] })),
    { titel: "Overige gidsen", items: [] },
  ];
  for (const p of pages) {
    const idx = THEMAS.findIndex((t) => t.match.test(p.slug));
    groepen[idx === -1 ? groepen.length - 1 : idx].items.push({ title: p.title, slug: p.slug });
  }
  for (const g of groepen) g.items.sort((a, b) => a.title.localeCompare(b.title));
  const nietLeeg = groepen.filter((g) => g.items.length);

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">Kennisbank</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Kennisbank</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Alle gidsen over kopen, verkopen, verhuren en verbouwen in Belgie, gebundeld per thema.
            Vind snel het juiste antwoord op je vastgoedvraag.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="Thema's" className="mb-10 flex flex-wrap gap-2">
          {nietLeeg.map((g) => (
            <a key={g.titel} href={`#${g.titel.replace(/[^a-z]/gi, "-").toLowerCase()}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:border-brand-300">
              {g.titel} <span className="text-slate-400">({g.items.length})</span>
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {nietLeeg.map((g) => (
            <section key={g.titel} id={g.titel.replace(/[^a-z]/gi, "-").toLowerCase()} className="scroll-mt-24">
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">{g.titel}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/${it.slug}`} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-brand-800 transition-all hover:border-brand-300 hover:text-brand-700">
                      <svg className="shrink-0 text-accent-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "Kennisbank", path: "/kennisbank" },
      ])} />
    </main>
  );
}
