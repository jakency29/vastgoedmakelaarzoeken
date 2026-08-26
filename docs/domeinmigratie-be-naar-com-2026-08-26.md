# Draaiboek domeinmigratie van .be naar .com

Datum voorbereiding: 26 augustus 2026

## Besluit

De code en content zijn voorbereid op een migratie van `https://www.vastgoedmakelaarzoeken.be` naar `https://www.vastgoedmakelaarzoeken.com`. De omschakeling staat nog niet live. Zonder migratievariabelen blijft `.be` de canonical host.

De migratie behoudt voor iedere actieve pagina hetzelfde pad. Alleen 22 vooraf gecontroleerde consolidaties krijgen een andere bestemming. Daardoor worden domeinverhuizing en contentopschoning niet op het migratiemoment zelf met nieuwe inhoudelijke beslissingen vermengd.

## Voorbereide kwaliteitsverbeteringen

- Alle 166 MDX-bestanden slagen voor de passagecontrole.
- Geen enkele sectieopener is nog dubbelzinnig volgens de retrievalscreening.
- Alle centrale entiteiten komen terug in de introductie.
- 84 claimrijke actieve pagina's tonen vóór de inhoud een primaire controlebron.
- Alle kennisbank-CTA's leiden naar hetzelfde formulier op de pagina.
- Typeform is verwijderd uit de gedeelde kennisbanktemplate.
- Acht aangrenzende onderwerpen hebben een zichtbare relatie met een vastgoedbeslissing en een passende cluster-eigenaar.
- Domeingebonden auteursnamen zijn vervangen door `Redactie Vastgoedmakelaar Zoeken`.
- Interne links verwijzen rechtstreeks naar de gekozen eigenaar en niet naar een redirectbron.

## URL-consolidaties vóór de migratie

Zes overlappende kennisbankpagina's en zestien verwisselbare lokale asbestpagina's staan op `noindex` en krijgen een 301. De bronbestanden blijven tijdelijk beschikbaar voor controle en rollback.

| Oude route | Nieuwe eigenaar |
| --- | --- |
| `/hypothecaire-volmacht` | `/hypothecair-mandaat` |
| `/renovatieplicht-bestaande-woning` | `/renovatieplicht-2030` |
| `/asbestattest/verplicht` | `/asbestattest` |
| `/asbestattest/vanaf-wanneer` | `/asbestattest` |
| `/asbestattest/wetgeving` | `/asbestattest` |
| `/asbestattest/wie` | `/asbestattest` |
| `/asbestattest/antwerpen` | `/asbestattest` |
| `/asbestattest/brugge` | `/asbestattest` |
| `/asbestattest/dendermonde` | `/asbestattest` |
| `/asbestattest/gent` | `/asbestattest` |
| `/asbestattest/hasselt` | `/asbestattest` |
| `/asbestattest/herentals` | `/asbestattest` |
| `/asbestattest/leuven` | `/asbestattest` |
| `/asbestattest/lier` | `/asbestattest` |
| `/asbestattest/limburg` | `/asbestattest` |
| `/asbestattest/lokeren` | `/asbestattest` |
| `/asbestattest/oost-vlaanderen` | `/asbestattest` |
| `/asbestattest/oudenaarde` | `/asbestattest` |
| `/asbestattest/sint-niklaas` | `/asbestattest` |
| `/asbestattest/turnhout` | `/asbestattest` |
| `/asbestattest/vlaams-brabant` | `/asbestattest` |
| `/asbestattest/west-vlaanderen` | `/asbestattest` |

## Omgevingsvariabelen voor de omschakeling

Zet deze drie waarden pas bij de definitieve `.com`-release:

```text
NEXT_PUBLIC_SITE_URL=https://www.vastgoedmakelaarzoeken.com
NEXT_PUBLIC_CONTACT_EMAIL=info@vastgoedmakelaarzoeken.com
MIGRATION_TARGET_HOST=www.vastgoedmakelaarzoeken.com
```

`NEXT_PUBLIC_SITE_URL` schakelt metadataBase, canonicals, Open Graph, structured data, robots en sitemap om. `MIGRATION_TARGET_HOST` stuurt beide `.be`-hosts met een klassieke 301 naar hetzelfde pad op `.com`. Een trailing slash en hostwissel worden in dezelfde hop genormaliseerd.

Voor routes die vóór de migratie zijn geconsolideerd, combineert de configuratie ook de hostwissel en padwijziging in één 301. De 22 consolidaties zijn getest voor apex `.be`, `www.be`, met en zonder trailing slash en met behoud van queryparameters. Alle 88 testverzoeken gingen rechtstreeks naar hun definitieve `www.com`-bestemming.

## Status deploygereedheid

Stap 2 is op 26 augustus 2026 afgerond:

- Geen van de drie migratievariabelen staat lokaal actief.
- De huidige `.be`-build slaagt met 227 statische pagina's.
- De huidige build houdt `.be` in canonicals, robots en sitemap.
- De toekomstige `.com`-build slaagt eveneens met 227 statische pagina's.
- Alle 22 consolidaties slagen voor de éénstapsredirecttest.
- De drie definitieve consolidatiedoelen geven status 200.
- Contentcontrole, migratiecontrole, TypeScript en linting slagen.
- De wijziging is nog niet gepusht of gedeployd.

## Vereiste stappen vóór de omschakeling

1. Bevestig dat `vastgoedmakelaarzoeken.com` eigendom is van dezelfde organisatie.
2. Koppel `vastgoedmakelaarzoeken.com`, `www.vastgoedmakelaarzoeken.com`, `vastgoedmakelaarzoeken.be` en `www.vastgoedmakelaarzoeken.be` aan dezelfde deployment. Wijzig tijdens de cutover de bestaande Vercel-redirect van apex `.be` naar `www.be` in `Connect to Production`, zodat ook apex `.be` rechtstreeks door de applicatie naar `www.com` kan gaan.
3. Verifieer de `.com`-property in Google Search Console.
4. Controleer TLS voor alle vier hosts.
5. Controleer of `info@vastgoedmakelaarzoeken.com` en de formulierverwerking werken.
6. Exporteer een laatste `.be`-nulmeting per pagina, query, land en apparaat.
7. Voer `npm run check:content`, `npm run check:methodiek`, `npm run check:migration`, `npm run lint` en `npm run build` uit.

## Omschakeling in één release

1. Stel de drie migratievariabelen in.
2. Deploy dezelfde code op de gekoppelde `.be`- en `.com`-hosts.
3. Controleer eerst de homepage, `/kantoor`, `/woning-verkopen`, `/kosten-vastgoedmakelaar`, `/huis-laten-schatten`, `/kosten-verkoop-huis` en `/akte-verlijden`.
4. Controleer daarna een steekproef van kennisbank-, kantoor-, woning-, provincie- en gemeentepagina's.
5. Bevestig dat iedere `.com`-pagina een self-canonical op `.com` heeft.
6. Bevestig dat iedere equivalente `.be`-URL in één 301-hop op hetzelfde `.com`-pad eindigt.
7. Dien alleen de nieuwe `.com`-sitemap in.
8. Gebruik daarna de adreswijziging in Google Search Console voor de domeinverhuizing.

## Controles na de omschakeling

Controleer dagelijks tijdens de eerste twee weken en daarna wekelijks:

- statuscodes en redirectketens;
- `.be`-URL's die nog status 200 geven;
- `.com`-pagina's met een `.be`-canonical;
- indexatie en uitgesloten pagina's;
- gekozen canonical door Google;
- klikken, vertoningen, CTR en gemiddelde positie;
- branded queries;
- formulierinzendingen en e-mailaflevering;
- serverfouten, 404's en ontbrekende assets.

Houd de `.be`-redirects minimaal twaalf maanden actief. Langer is beter zolang oude links, bookmarks en vermeldingen bestaan.

## Rollback

Als de `.com`-release een technische fout bevat, verwijder dan `MIGRATION_TARGET_HOST`, herstel `NEXT_PUBLIC_SITE_URL` naar `.be` en deploy opnieuw. Gebruik rollback alleen voor een aantoonbare technische fout. Draai een domeinmigratie niet terug wegens normale tijdelijke schommelingen in Search Console.

## Geautomatiseerde controle

Gebruik:

```text
npm run check:migration
```

De controle faalt bij ontbrekende consolidatieredirects, redirectbronnen zonder `noindex`, interne links naar redirectbronnen, dubbele related-doelen, domeingebonden auteursnamen of ontbrekende migratieconfiguratie.
