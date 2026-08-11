// Componenten-map voor MDX-content: getypte prose-elementen + custom SEO-blokken,
// in de merkkleuren (navy + amber). Tabellen in scrollwrapper.

import { isValidElement } from "react";
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { kantoren } from "@/lib/kantoren";
import { DienstCTA } from "./DienstCTA";
import {
  EpcFBudgetCalculator,
  HuurcontractOpzegCalculator,
  MakelaarskostenCalculator,
  NettoOpbrengstCalculator,
  OnroerendeVoorheffingCalculator,
  PidChecklist,
  RenovatieAankoopCalculator,
  SleutelOpDeDeurCalculator,
  WoningWaardeQuickscan,
} from "./VastgoedCalculators";
import { VerkoopChecklist } from "./VerkoopChecklist";

// Overzicht van de vastgoedkantoren in een provincie (voor de provincie-pagina's).
export function KantorenInProvincie({ provincie }: { provincie: string }) {
  const list = kantoren.filter((k) => k.provincie === provincie || k.regios.includes(provincie));
  if (!list.length) return null;
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {list.map((k) => (
        <Link
          key={k.slug}
          href={`/kantoor/${k.slug}`}
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            {k.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={k.foto} alt={`${k.naam} logo`} loading="lazy" className="max-h-full max-w-full object-contain p-1" />
            ) : (
              <span className="text-lg font-extrabold text-brand-200">{k.naam.slice(0, 1)}</span>
            )}
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-brand-900 group-hover:text-brand-700">{k.naam}</span>
            <span className="block text-sm text-slate-500">{k.gemeente}, {k.provincie}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

// Lokale selectie voor gemeentepagina's. Een kantoor verschijnt wanneer de gemeente
// overeenkomt of wanneer de gemeente expliciet in het werkingsgebied staat.
export function KantorenInRegio({ regio }: { regio: string }) {
  const normalized = regio.toLocaleLowerCase("nl-BE");
  const list = kantoren.filter(
    (k) =>
      k.gemeente.toLocaleLowerCase("nl-BE") === normalized ||
      k.regios.some((item) => item.toLocaleLowerCase("nl-BE") === normalized),
  );
  if (!list.length) return null;
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {list.map((k) => (
        <Link
          key={k.slug}
          href={`/kantoor/${k.slug}`}
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            {k.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={k.foto} alt={`${k.naam} logo`} loading="lazy" className="max-h-full max-w-full object-contain p-1" />
            ) : (
              <span className="text-lg font-extrabold text-brand-200">{k.naam.slice(0, 1)}</span>
            )}
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-brand-900 group-hover:text-brand-700">{k.naam}</span>
            <span className="block text-sm text-slate-500">{k.gemeente}, {k.provincie}</span>
            <span className="mt-1 block text-xs font-semibold text-brand-600">Actief in {regio}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function A({ href = "", ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href} className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-500" {...props} />;
  }
  return (
    <a
      href={href}
      className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  );
}

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join(" ");
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children);
  return "";
}

function headingId(children: ReactNode) {
  return textFromNode(children)
    .replace(/^\d+\.\s*/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type ContentNavItem = { id: string; label: string };

const contentNavPresets: Record<string, ContentNavItem[]> = {
  "asbestattest-verkoop": [
    { id: "wat-moet-je-eerst-weten-over-het-asbestattest-bij-verkoop", label: "Snel overzicht" },
    { id: "wat-is-een-asbestattest-bij-verkoop-precies", label: "Betekenis en inhoud" },
    { id: "wanneer-is-een-asbestattest-verplicht-bij-verkoop", label: "Verplichting en 20 m²" },
    { id: "wanneer-moet-de-koper-het-asbestattest-ontvangen", label: "Timing en compromis" },
    { id: "wie-mag-een-asbestattest-opmaken", label: "Gecertificeerde deskundige" },
    { id: "hoe-verloopt-de-aanvraag-en-inventarisatie", label: "Aanvraag en inspectie" },
    { id: "wat-onderzoekt-de-asbestdeskundige-in-en-rond-de-woning", label: "Onderzoek en materialen" },
    { id: "wat-kost-een-asbestattest-bij-verkoop", label: "Prijs en offerte" },
    { id: "hoelang-is-een-asbestattest-geldig", label: "Geldigheid" },
    { id: "mag-je-een-woning-met-asbest-verkopen", label: "Verkopen met asbest" },
    { id: "wat-gebeurt-er-als-het-asbestattest-ontbreekt-of-onjuist-is", label: "Ontbrekend attest" },
    { id: "welke-regels-gelden-voor-appartementen-en-gemene-delen", label: "Appartement en VME" },
    { id: "welke-andere-attesten-horen-bij-het-verkoopdossier", label: "Andere verkoopattesten" },
    { id: "hoe-pas-je-de-regels-toe-in-drie-praktijksituaties", label: "Drie praktijksituaties" },
    { id: "welke-checklist-gebruik-je-voor-verkoop-en-aanvraag", label: "Verkoopchecklist" },
  ],
  asbestattest: [
    { id: "wat-is-een-asbestattest-precies", label: "Betekenis en inhoud" },
    { id: "wanneer-is-een-asbestattest-verplicht", label: "Verplichting en uitzonderingen" },
    { id: "welke-toekomstige-deadlines-gelden-in-vlaanderen", label: "Deadlines voor eigenaars en VME's" },
    { id: "wie-mag-een-asbestattest-opmaken", label: "Gecertificeerde deskundige" },
    { id: "hoe-verloopt-een-asbestinventarisatie-stap-voor-stap", label: "Inventarisatie stap voor stap" },
    { id: "hoe-lees-en-beoordeel-je-het-resultaat", label: "Resultaat beoordelen" },
    { id: "wat-kost-een-asbestattest-in-2026", label: "Prijs en kostenopbouw" },
    { id: "hoe-lang-duurt-een-asbestattest-aanvragen", label: "Doorlooptijd" },
    { id: "hoe-lang-is-een-asbestattest-geldig", label: "Geldigheid" },
    { id: "welke-rol-speelt-het-attest-bij-verkoop-en-compromis", label: "Verkoop en compromis" },
    { id: "mag-je-een-woning-met-asbest-verkopen", label: "Verkopen met asbest" },
    { id: "is-een-asbestattest-voldoende-voor-renovatie", label: "Renovatie en sloop" },
    { id: "welke-fouten-moet-je-vermijden-bij-een-asbestattest", label: "Veelgemaakte fouten" },
    { id: "welke-checklist-gebruik-je-voor-aanvraag-en-verkoop", label: "Checklist" },
    { id: "hoe-werken-de-regels-in-drie-praktijksituaties", label: "Drie praktijksituaties" },
  ],
  epc: [
    { id: "wat-is-een-epc-bij-verkoop-precies", label: "Betekenis en inhoud" },
    { id: "wanneer-is-een-epc-verplicht-bij-verkoop", label: "Verplichting" },
    { id: "wanneer-moet-het-epc-beschikbaar-zijn", label: "Timing en advertenties" },
    { id: "welke-uitzonderingen-en-bijzondere-situaties-bestaan-er", label: "Uitzonderingen" },
    { id: "wie-mag-een-epc-opmaken", label: "Energiedeskundige type A" },
    { id: "hoe-verloopt-de-epc-aanvraag-stap-voor-stap", label: "Aanvraag stap voor stap" },
    { id: "welke-bewijsstukken-verbeteren-de-berekening", label: "Bewijsstukken" },
    { id: "hoe-lees-je-het-epc-resultaat", label: "Resultaat beoordelen" },
    { id: "wat-kost-een-epc-bij-verkoop-in-2026", label: "Prijs en offerte" },
    { id: "hoe-lang-is-een-epc-geldig", label: "Geldigheid" },
    { id: "welke-verplichtingen-heeft-de-verkoper", label: "Verkoper en notaris" },
    { id: "wat-betekent-de-renovatieverplichting-bij-label-e-of-f", label: "Renovatieverplichting" },
    { id: "welke-epcs-heb-je-nodig-voor-een-appartement", label: "Appartement" },
    { id: "welke-fouten-moet-je-vermijden", label: "Veelgemaakte fouten" },
    { id: "hoe-pas-je-de-regels-toe-in-drie-praktijksituaties", label: "Drie praktijksituaties" },
    { id: "welke-checklist-gebruik-je-voor-verkoop", label: "Verkoopchecklist" },
  ],
  elektriciteitskeuring: [
    { id: "wat-is-een-elektriciteitskeuring-bij-verkoop-precies", label: "Betekenis en AREI" },
    { id: "wanneer-is-een-elektriciteitskeuring-verplicht-bij-verkoop", label: "Verplichting" },
    { id: "wat-is-het-verschil-tussen-een-oude-en-nieuwere-installatie", label: "Oude of nieuwere installatie" },
    { id: "welke-uitzondering-geldt-bij-volledige-renovatie-of-afbraak", label: "Renovatie of afbraak" },
    { id: "wie-mag-de-elektriciteitskeuring-uitvoeren", label: "Erkend controleorganisme" },
    { id: "hoe-verloopt-de-elektriciteitskeuring-stap-voor-stap", label: "Keuring stap voor stap" },
    { id: "welke-documenten-heb-je-nodig", label: "Schema's en dossier" },
    { id: "wat-controleert-de-keurder", label: "Controlepunten" },
    { id: "wat-kost-een-elektriciteitskeuring-in-2026", label: "Prijs en offerte" },
    { id: "hoe-lang-is-een-elektrisch-keuringsverslag-geldig", label: "Geldigheid" },
    { id: "wat-betekent-een-positief-of-negatief-verslag", label: "Positief of negatief" },
    { id: "wie-moet-een-afgekeurde-installatie-in-orde-brengen", label: "Hersteltermijnen" },
    { id: "welke-rol-heeft-de-notaris-bij-de-verkoop", label: "Notaris en verkoopakte" },
    { id: "hoe-werkt-de-keuring-bij-een-appartement", label: "Appartement" },
    { id: "welke-fouten-moet-je-vermijden-bij-de-keuring", label: "Veelgemaakte fouten" },
    { id: "hoe-pas-je-de-regels-toe-in-drie-praktijksituaties", label: "Drie praktijksituaties" },
    { id: "welke-checklist-gebruik-je-voor-de-verkoop", label: "Verkoopchecklist" },
  ],
};

export function ContentNav({ variant, items }: { variant?: string; items?: ContentNavItem[] }) {
  const resolvedItems = items ?? (variant ? contentNavPresets[variant] : undefined) ?? [];
  if (!resolvedItems.length) return null;
  return (
    <nav aria-label="Inhoudsopgave" className="my-8 rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
      <p className="font-extrabold text-brand-900">Op deze pagina</p>
      <ol className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {resolvedItems.map((item, index) => (
          <li key={item.id} className="flex gap-2">
            <span className="font-bold text-accent-700">{index + 1}.</span>
            <a href={`#${item.id}`} className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-500">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Non-commodity tip-blok (amber accent).
export function TipBlock({ title = "Tip", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="my-6 rounded-2xl border border-accent-300 p-5" style={{ backgroundColor: "rgba(255,192,67,0.12)" }}>
      <p className="flex items-center gap-2 font-bold text-brand-900">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-600)" strokeWidth="2" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21h6" strokeLinecap="round" />
        </svg>
        {title}
      </p>
      <div className="mt-1.5 text-sm text-brand-950/90">{children}</div>
    </aside>
  );
}

// Beslistabel / afweegblok.
export function DecisionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="font-bold text-brand-900">{title}</p>
      <div className="mt-2 text-sm text-slate-700">{children}</div>
    </div>
  );
}

// Inline call-to-action naar het leadformulier.
export function OfferteCheck({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border border-brand-200 bg-brand-50 p-5">
      <div className="text-sm text-brand-900 [&>p]:m-0">
        {children ??
          "Wil je weten wat jouw woning waard is? Vergelijk erkende vastgoedmakelaars in je gemeente."}
      </div>
      <a
        href="#leadform"
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-brand-900 transition-colors hover:bg-accent-400"
      >
        Vergelijk makelaars
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

// Content-afbeelding (gemigreerd van de oude site). width/height voorkomt layout-shift.
export function Afbeelding({
  src,
  alt,
  caption,
  w,
  h,
  hero = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  w?: number | string;
  h?: number | string;
  hero?: boolean;
}) {
  // MDX geeft attributen als string door; coerce naar getal voor next/image.
  const width = Number(w);
  const height = Number(h);
  const className = "h-auto w-full rounded-2xl border border-slate-200 bg-slate-50";
  return (
    <figure className="my-6 first:mt-0">
      {Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0 ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={src.toLowerCase().endsWith(".svg")}
          priority={hero}
          sizes="(max-width: 768px) 100vw, 720px"
          className={className}
        />
      ) : (
        // Zonder afmetingen kan next/image niet optimaliseren; val terug op img.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading={hero ? "eager" : "lazy"} className={className} />
      )}
      {caption && (
        <figcaption className="mt-3 flex items-start gap-2 px-1 text-sm leading-relaxed text-slate-600">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
          />
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  a: A,
  table: Table,
  Afbeelding,
  ContentNav,
  h2: ({ id, children, ...p }: ComponentProps<"h2">) => (
    <h2
      id={id || headingId(children)}
      className="mt-10 scroll-mt-24 text-2xl font-extrabold tracking-tight text-brand-900"
      {...p}
    >
      {children}
    </h2>
  ),
  h3: (p: ComponentProps<"h3">) => (
    <h3 className="mt-7 text-lg font-bold text-brand-900" {...p} />
  ),
  p: (p: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-slate-700" {...p} />,
  ul: (p: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 marker:text-accent-500" {...p} />,
  ol: (p: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700 marker:font-semibold marker:text-brand-700" {...p} />,
  th: (p: ComponentProps<"th">) => (
    <th className="border-b border-slate-200 bg-brand-50 px-4 py-2.5 text-left font-bold text-brand-900" {...p} />
  ),
  td: (p: ComponentProps<"td">) => <td className="border-b border-slate-100 px-4 py-2.5 align-top" {...p} />,
  TipBlock,
  DecisionBox,
  OfferteCheck,
  KantorenInProvincie,
  KantorenInRegio,
  DienstCTA,
  MakelaarskostenCalculator,
  OnroerendeVoorheffingCalculator,
  NettoOpbrengstCalculator,
  EpcFBudgetCalculator,
  HuurcontractOpzegCalculator,
  WoningWaardeQuickscan,
  RenovatieAankoopCalculator,
  SleutelOpDeDeurCalculator,
  PidChecklist,
  VerkoopChecklist,
};
