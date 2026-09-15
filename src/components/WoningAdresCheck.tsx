import { ADRESCHECK_BRONNEN, adrescheckDatum, waterScoreUitleg, type AdresCheck, type WaterScore } from "@/lib/woning-adreschecks";
import { AdresKopieerKnop } from "@/components/AdresKopieerKnop";

const bronLink = "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900";

function Score({ soort, score }: { soort: "Perceel" | "Gebouw"; score: WaterScore | null }) {
  const kleur = score === "D" ? "border-orange-200 bg-orange-50 text-orange-950" : "border-slate-200 bg-white text-brand-900";
  return (
    <div className={`rounded-xl border p-3 ${kleur}`}>
      <dt className="text-sm font-semibold">{soort} ({soort === "Perceel" ? "P" : "G"}-score)</dt>
      <dd className="mt-1">
        <span className="text-3xl font-extrabold">{score ?? "Onbekend"}</span>
        <span className="mt-1 block text-sm leading-relaxed">{waterScoreUitleg(score)}</span>
      </dd>
    </div>
  );
}

export function WoningAdresCheck({ check }: { check: AdresCheck }) {
  const volledigAdres = `${check.adres}, ${check.postcode} ${check.gemeente}`;
  const heeftD = check.pScore === "D" || check.gScore === "D";

  return (
    <section aria-labelledby="adrescheck" className="mt-8 rounded-2xl border border-brand-200 bg-brand-50/50 p-4 sm:p-6" data-adrescheck="pilot-2026-09">
      <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Adrescheck · publieke bronnen</p>
      <h2 id="adrescheck" className="mt-2 scroll-mt-24 text-2xl font-extrabold tracking-tight text-brand-900">Wat moet je weten over dit adres?</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">Bekijk de vermelde overstromingsscores, controleer je internetaansluiting en neem de adresgerichte vragen mee naar je bezoek.</p>

      <div className="mt-4 rounded-xl border border-brand-100 bg-white p-4">
        <p className="select-text font-bold text-brand-900">{volledigAdres}</p>
        <p className="mb-3 mt-1 text-xs leading-relaxed text-slate-600">Woningfiche nagekeken op <time dateTime={check.nagekekenOp}>{adrescheckDatum(check.nagekekenOp)}</time>. Geen live meting of plaatsbezoek.</p>
        <AdresKopieerKnop adres={volledigAdres} />
      </div>

      <div className="mt-5 space-y-5">
        <article aria-labelledby="adrescheck-water" className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 id="adrescheck-water" className="text-lg font-bold text-brand-900">Wat zijn de P-score en G-score?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">De woningfiche van We Invest vermeldt de volgende scores voor perceel en gebouw.</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <Score soort="Perceel" score={check.pScore} />
            <Score soort="Gebouw" score={check.gScore} />
          </dl>
          {heeftD && (
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-orange-50 p-3 text-sm font-semibold text-orange-950">
              {/* Officiële symbolen, beschikbaar gesteld door de CIW voor publiciteit. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/afbeeldingen/adrescheck/gebouwscore-d.png" alt="Officieel symbool: gebouw met overstromingsscore D" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />
              <span>Overstromingsgevoelig: bespreek het volledige rapport vóór een bod.</span>
            </div>
          )}
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{check.waterToelichting}</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">Bron scores: <a href={check.bron} target="_blank" rel="noopener noreferrer" className={bronLink}>woningfiche We Invest</a>. Het onderliggende rapport en de rapportdatum zijn hier niet afzonderlijk geverifieerd. De scores zijn modeluitkomsten, geen garantie tegen wateroverlast.</p>
          <p className="mt-3 text-sm leading-relaxed"><a href={ADRESCHECK_BRONNEN.waterinfo} target="_blank" rel="noopener noreferrer" className={bronLink}>Zoek het perceel op in Waterinfo</a> <span className="text-slate-500">·</span> <a href={ADRESCHECK_BRONNEN.scores} target="_blank" rel="noopener noreferrer" className={bronLink}>Officiële uitleg van de scores</a></p>
        </article>

        <article aria-labelledby="adrescheck-internet" className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 id="adrescheck-internet" className="text-lg font-bold text-brand-900">Welke internetverbinding is hier beschikbaar?</h3>
          <p className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-900">Nog niet bevestigd</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">Glasvezel, providers en snelheden zijn voor dit exacte adres niet door ons bevestigd. Een vermelde tv- of telefoonlijn bewijst geen beschikbaar internetabonnement.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{check.internet.zoekinstructie}</p>
          <a href={ADRESCHECK_BRONNEN.internet} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-flex min-h-11 items-center ${bronLink}`}>Open de BIPT-internetatlas <span className="ml-1" aria-hidden="true">↗</span></a>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">Je kiest het adres zelf in de atlas. Laat daarna bij je provider bevestigen welk abonnement leverbaar is. Atlasgegevens zijn geen snelheidsgarantie. We nemen hier geen snelheden uit de atlas over.</p>
          <p className="mt-3 border-l-2 border-brand-200 pl-3 text-sm leading-relaxed text-brand-900"><strong>Vraag aan de aanbieder:</strong> {check.internet.vraag}</p>
        </article>

        <div>
          <h3 className="text-lg font-bold text-brand-900">Welke extra vragen neem je mee naar de bezichtiging?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">Deze vragen sluiten aan bij de kenmerken en aandachtspunten in de woningfiche.</p>
          <ol className="mt-3 space-y-3">
            {check.vragen.map((item, index) => (
              <li key={item.vraag} className="rounded-xl border border-brand-100 bg-white p-4">
                <p className="font-bold leading-relaxed text-brand-900"><span className="mr-1 text-brand-500">{index + 1}.</span> {item.vraag}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.aanleiding}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">Aanleiding: <a href={check.bron} target="_blank" rel="noopener noreferrer" className={bronLink}>publieke woningfiche</a>. De vragen zijn onze redactionele voorbereiding, geen vastgestelde gebreken of technisch advies. Externe bronlinks openen in een nieuw tabblad.</p>
        </div>
      </div>
    </section>
  );
}
