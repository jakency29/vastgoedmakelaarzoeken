// Woningkaart (Zillow-stijl): foto, prijs, kernkenmerken, adres. Link naar de detailpagina.

import Link from "next/link";
import Image from "next/image";
import { formatPrijs, formatOpp, woningHref, type Woning } from "@/lib/woningen";
import { getKantoor } from "@/lib/kantoren";

const EPC_KLEUR: Record<string, string> = {
  "A++": "bg-emerald-700",
  "A+": "bg-emerald-700",
  A: "bg-emerald-600",
  B: "bg-lime-600",
  C: "bg-yellow-500 text-brand-950",
  D: "bg-amber-500 text-brand-950",
  E: "bg-orange-600",
  F: "bg-red-600",
  G: "bg-red-800",
};

function formatDatum(datum: string): string {
  return new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${datum}T12:00:00`));
}

export function WoningCard({ w }: { w: Woning }) {
  const kantoor = getKantoor(w.kantoorSlug);
  const detailUrl = woningHref(w);
  const heading = `${w.type} te koop aan de ${w.adres} in ${w.gemeente}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
      <Link href={detailUrl} className="flex h-full flex-col" aria-label={`${heading}. Bekijk foto's, kenmerken en contactinformatie.`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {w.fotos[0] ? (
            <Image
              src={w.fotos[0]}
              alt={`${w.type} te koop in ${w.gemeente}: ${w.adres}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : null}
          <span className="absolute left-3 top-3 rounded-full bg-brand-900/90 px-3 py-1 text-xs font-bold text-white">
            {w.transactie === "te-koop" ? "Te koop" : "Te huur"}
          </span>
          {w.epcLabel && (
            <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-sm ${EPC_KLEUR[w.epcLabel.toUpperCase()] ?? "bg-slate-700"}`}>
              EPC {w.epcLabel}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-extrabold leading-snug text-brand-900 group-hover:text-brand-700">{heading}</h3>
          <p className="mt-2 text-xl font-extrabold text-brand-900">{formatPrijs(w.prijs)}</p>
          <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-sm text-slate-700" aria-label="Belangrijkste kenmerken">
            {w.slaapkamers ? <li>{w.slaapkamers} slaapkamers</li> : null}
            {w.bewoonbaar ? <li>{formatOpp(w.bewoonbaar)} bewoonbaar</li> : null}
            {w.grond ? <li>{formatOpp(w.grond)} grond</li> : null}
          </ul>
          <p className="mt-2 text-sm font-medium text-brand-800">{w.adres}, {w.postcode} {w.gemeente}</p>
          {(w.staat || w.toegevoegdOp) && (
            <p className="mt-2 text-xs text-slate-500">
              {[w.staat, w.toegevoegdOp ? `Toegevoegd op ${formatDatum(w.toegevoegdOp)}` : ""].filter(Boolean).join(" · ")}
            </p>
          )}
          {kantoor && (
            <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
              Aangeboden door <span className="font-bold text-brand-800">{kantoor.naam}</span>
              {kantoor.bivNummer ? ` · BIV ${kantoor.bivNummer}` : ""}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-accent-500 px-4 py-2 text-sm font-extrabold text-brand-950 transition group-hover:bg-accent-400">
            Bekijk pand en vraag info <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
