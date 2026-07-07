// Contactkaart van de makelaar (of het kantoor) voor de zijbalk van een woningpagina.
// Toont foto, naam, functie, kantoor en directe contactgegevens in plaats van een leadformulier.

import Link from "next/link";
import type { Makelaar } from "@/lib/makelaars";
import type { Kantoor } from "@/lib/kantoren";

export function MakelaarContact({ makelaar, kantoor }: { makelaar?: Makelaar; kantoor?: Kantoor }) {
  const naam = makelaar?.naam ?? kantoor?.naam;
  if (!naam) return null;

  const functie = makelaar?.functie ?? "Vastgoedkantoor";
  const foto = makelaar?.foto ?? kantoor?.foto;
  const tel = makelaar?.telefoon ?? kantoor?.telefoon;
  const email = makelaar?.email ?? kantoor?.email;
  const profielHref = makelaar ? `/makelaar/${makelaar.slug}` : kantoor ? `/kantoor/${kantoor.slug}` : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contacteer de makelaar</p>

      <div className="mt-3 flex items-center gap-3">
        {foto && (
          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={foto} alt={`${naam}, ${functie}`} width={56} height={56} className="h-full w-full object-cover" />
          </span>
        )}
        <div className="min-w-0">
          {profielHref ? (
            <Link href={profielHref} className="block font-bold text-brand-900 hover:text-brand-700">{naam}</Link>
          ) : (
            <span className="block font-bold text-brand-900">{naam}</span>
          )}
          <p className="text-sm text-slate-500">{functie}</p>
        </div>
      </div>

      {makelaar && kantoor && (
        <p className="mt-3 text-sm text-slate-600">
          <Link href={`/kantoor/${kantoor.slug}`} className="font-medium text-brand-700 underline underline-offset-2">{kantoor.naam}</Link>
          , {kantoor.gemeente}
        </p>
      )}

      <ul className="mt-4 space-y-2.5 text-sm">
        {tel && (
          <li>
            <a href={`tel:${tel.replace(/\s/g, "")}`} className="flex items-center gap-2.5 font-medium text-brand-800 hover:text-brand-700">
              <svg className="shrink-0 text-brand-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {tel}
            </a>
          </li>
        )}
        {email && (
          <li>
            <a href={`mailto:${email}`} className="flex items-center gap-2.5 break-all font-medium text-brand-800 hover:text-brand-700">
              <svg className="shrink-0 text-brand-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {email}
            </a>
          </li>
        )}
      </ul>

      {profielHref && (
        <Link href={profielHref} className="mt-4 block rounded-xl bg-brand-900 px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-brand-800">
          Bekijk profiel
        </Link>
      )}
    </div>
  );
}
