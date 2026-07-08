// Componenten-map voor MDX-content: getypte prose-elementen + custom SEO-blokken,
// in de merkkleuren (navy + amber). Tabellen in scrollwrapper.

import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { kantoren } from "@/lib/kantoren";
import { DienstCTA } from "./DienstCTA";

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
  w,
  h,
  hero = false,
}: {
  src: string;
  alt: string;
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
          priority={hero}
          sizes="(max-width: 768px) 100vw, 720px"
          className={className}
        />
      ) : (
        // Zonder afmetingen kan next/image niet optimaliseren; val terug op img.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading={hero ? "eager" : "lazy"} className={className} />
      )}
    </figure>
  );
}

export const mdxComponents = {
  a: A,
  table: Table,
  Afbeelding,
  h2: (p: ComponentProps<"h2">) => (
    <h2 className="mt-10 scroll-mt-24 text-2xl font-extrabold tracking-tight text-brand-900" {...p} />
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
  DienstCTA,
};
