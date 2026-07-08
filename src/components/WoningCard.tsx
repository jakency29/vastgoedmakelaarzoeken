// Woningkaart (Zillow-stijl): foto, prijs, kernkenmerken, adres. Link naar de detailpagina.

import Link from "next/link";
import Image from "next/image";
import { formatPrijs, formatOpp, type Woning } from "@/lib/woningen";

export function WoningCard({ w }: { w: Woning }) {
  return (
    <Link
      href={`/woning/${w.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
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
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xl font-extrabold text-brand-900">{formatPrijs(w.prijs)}</p>
        <p className="mt-1 text-sm text-slate-500">{w.type} in {w.gemeente}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
          {w.slaapkamers ? <span>{w.slaapkamers} slaapkamers</span> : null}
          {w.bewoonbaar ? <span>{formatOpp(w.bewoonbaar)} bewoonbaar</span> : null}
          {w.grond ? <span>{formatOpp(w.grond)} grond</span> : null}
        </div>
        <p className="mt-2 truncate text-sm font-medium text-brand-800 group-hover:text-brand-700">{w.adres}, {w.postcode} {w.gemeente}</p>
      </div>
    </Link>
  );
}
