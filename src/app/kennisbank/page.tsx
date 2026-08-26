// Kennisbank: overzicht van alle gidsen, gegroepeerd per thema (afgeleid uit de slug).

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPages } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { KnowledgeBankExplorer, type KnowledgeGroup } from "@/components/KnowledgeBankExplorer";
import { breadcrumbListSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Kennisbank: gidsen over kopen, verkopen en verhuren" },
  description:
    "De kennisbank bundelt alle gidsen over vastgoed in België: verkopen, kopen, financiering, attesten, belastingen, huren en verbouwen. Vind snel het juiste antwoord.",
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
  { titel: "Wonen en eigendom", match: /erfpacht|opstal|voorkoop|overhangende|haag|brievenbus|gras-afrijden|geluid|lawaai|kangoeroe|lijfrente|huurkoop|alleenstaande|duurste-gemeente|wallonie|bewoonbare|syndicus/ },
];

export default function KennisbankPage() {
  const pages = getAllPages().filter((p) => !p.noindex && !p.slug.startsWith("vastgoedkantoren/"));
  const groepen: KnowledgeGroup[] = [
    ...THEMAS.map((t) => ({ titel: t.titel, items: [] })),
    { titel: "Overige gidsen", items: [] },
  ];
  for (const p of pages) {
    const idx = THEMAS.findIndex((t) => t.match.test(p.slug));
    groepen[idx === -1 ? groepen.length - 1 : idx].items.push({
      title: p.title,
      slug: p.slug,
      description: p.description,
    });
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
              <li aria-current="page" className="font-medium text-brand-800">Kennisbank</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">Kennisbank</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Alle gidsen over kopen, verkopen, verhuren en verbouwen in België, gebundeld per thema.
            Vind snel het juiste antwoord op je vastgoedvraag.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
            De artikelen zijn geschreven en inhoudelijk bijgewerkt door{" "}
            <Link href={site.author.path} className="font-semibold text-brand-700 underline underline-offset-2">
              {site.author.name}
            </Link>
            , oprichter van Jakency. Bekijk ook zijn{" "}
            <a
              href={site.author.linkedinUrl}
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              LinkedIn-profiel
            </a>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <KnowledgeBankExplorer groups={nietLeeg} />
      </div>

      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "Kennisbank", path: "/kennisbank" },
      ])} />
    </main>
  );
}
