import Link from "next/link";
import type { Kantoor } from "@/lib/kantoren";
import { formatBronDatum, getKantoorInzichten, vergelijkbareKantoren } from "@/lib/kantoor-inzichten";

export function KantoorPubliekeInzichten({ kantoor }: { kantoor: Kantoor }) {
  const gegevens = getKantoorInzichten(kantoor.slug);
  if (!gegevens) return null;
  const alleenNieuwbouw = gegevens.onderwerpen.includes("nieuwbouw") && !gegevens.onderwerpen.includes("verkoop");

  return (
    <section className="mt-8 scroll-mt-24" aria-labelledby="publieke-informatie">
      <h2 id="publieke-informatie" className="scroll-mt-24 text-2xl font-extrabold tracking-tight text-brand-900">
        Wat vertelt de publieke informatie over {kantoor.naam}?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        De geraadpleegde website licht de aanpak en dienstverlening van {kantoor.naam} toe.
        {" "}Hieronder vind je twee concrete punten uit die beschrijving, met vragen om de betekenis voor jouw dossier te verduidelijken.
      </p>

      <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {gegevens.inzichten.map((inzicht) => {
          const bron = gegevens.bronnen[inzicht.bron];
          return (
            <article key={inzicht.titel} className="p-5 sm:p-6">
              <h3 className="text-lg font-bold text-brand-900">{inzicht.titel}</h3>
              <p className="mt-2 leading-relaxed text-slate-700">{inzicht.tekst}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                <a href={bron.url} className="font-medium text-brand-700 underline underline-offset-2">
                  {bron.label}
                </a>
                {" · "}Geraadpleegd op <time dateTime={bron.geraadpleegdOp}>{formatBronDatum(bron.geraadpleegdOp)}</time>
              </p>
              <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Vraag voor jouw dossier</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-900">{inzicht.vraag}</p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Dit is een brononderbouwde samenvatting, geen eigen praktijktest of bevestiging door het kantoor.
        Een publieke beschrijving legt nog niet vast wat in jouw opdracht is inbegrepen.
        {alleenNieuwbouw ? (
          <>Bereid je gesprek voor met de <Link href="/nieuwbouw-kopen-waar-op-letten" className="font-medium text-brand-700 underline underline-offset-2">aandachtspunten bij een nieuwbouwaankoop</Link>.</>
        ) : (
          <>Vergelijk daarvoor de prestaties en de <Link href="/kosten-vastgoedmakelaar" className="font-medium text-brand-700 underline underline-offset-2">opbouw van de makelaarskosten</Link>.</>
        )}
      </p>
    </section>
  );
}

export function KantoorPubliekeVergelijking({ kantoor, kandidaten }: { kantoor: Kantoor; kandidaten: Kantoor[] }) {
  const vergelijkingen = vergelijkbareKantoren(kantoor, kandidaten);
  if (!vergelijkingen.length) return null;

  return (
    <section className="mt-10 scroll-mt-24" aria-labelledby="kantoren-vergelijken">
      <h2 id="kantoren-vergelijken" className="scroll-mt-24 text-2xl font-extrabold tracking-tight text-brand-900">
        Welke andere kantoren kun je vergelijken?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        {vergelijkingen.map(v=>v.kantoor.naam).join(" en ")} {vergelijkingen.length === 1 ? "heeft" : "hebben"} overlappende diensten in onze bronselectie.
        We selecteren eerst op dezelfde vestigingsplaats, daarna op gedeeld werkgebied en vervolgens op provincie.
        Dit is geen kwaliteitsrangschikking; een premiumbadge of Google-score bepaalt deze selectie niet.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {vergelijkingen.map(({ kantoor: ander, inzichten, reden }) => {
          const inzicht = inzichten.inzichten[0];
          const bron = inzichten.bronnen[inzicht.bron];
          return (
            <article key={ander.slug} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-slate-600">{reden}</p>
              <h3 className="mt-2 text-lg font-bold text-brand-900">
                <Link href={`/kantoor/${ander.slug}`} className="underline decoration-brand-200 underline-offset-4 hover:decoration-brand-700">
                  {ander.naam}
                </Link>
              </h3>
              <p className="mt-3 text-sm font-semibold text-brand-800">{inzicht.titel}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{inzicht.tekst}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                <a href={bron.url} className="font-medium text-brand-700 underline underline-offset-2">Publieke bron</a>
                {" · "}<time dateTime={bron.geraadpleegdOp}>{formatBronDatum(bron.geraadpleegdOp)}</time>
              </p>
            </article>
          );
        })}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        De vergelijking omvat alleen kantoren in onze gids. Niet opgenomen informatie betekent niet dat een kantoor een dienst niet aanbiedt.
        Controleer de beschikbaarheid voor jouw adres en de voorwaarden rechtstreeks in de offerte.
      </p>
    </section>
  );
}
