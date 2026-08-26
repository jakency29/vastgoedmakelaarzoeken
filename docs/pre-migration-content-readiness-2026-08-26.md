# Pre-migratie content readiness, 26 augustus 2026

## Eindbesluit

De content- en templateherstelronde voor de geplande migratie naar `.com` is technisch afgerond. De volledige inventaris bevat 217 oude sitemap-URL's. Daarvan zijn 195 actieve URL's inhoudelijk gereed om op hetzelfde pad naar `.com` te verhuizen. De overige 22 URL's zijn bewust geconsolideerd met `noindex` en een 301 naar een gekozen eigenaarspagina.

Er blijven geen URL's met status HOLD of KILL in de post-fixmatrix. `CONSOLIDATED` betekent dat de inhoud niet als zelfstandige `.com`-URL wordt meegenomen.

De domeinomschakeling zelf is niet geactiveerd. Zonder migratievariabelen blijft `.be` de canonical host.

## Resultaten per laag

| Controlelaag | Resultaat |
| --- | --- |
| Oude sitemapinventaris | 217 URL's |
| Actieve URL's gereed voor hetzelfde `.com`-pad | 195 |
| Geconsolideerde URL's | 22 |
| HOLD | 0 |
| KILL | 0 |
| MDX-bestanden gecontroleerd | 166 |
| Actieve MDX-pagina's | 144 |
| MDX-pagina's met passage-PASS | 166 |
| Ambigue sectieopeners | 0 |
| Introducties zonder centrale entiteit | 0 |
| Actieve pagina's met zichtbaar primair bronkader | 84 |
| Conversieroutes per actieve kennisbankpagina | 1 |
| Contentcontrole | Geslaagd |
| Methodiekcontrole | 140 van 140 actieve gecontroleerde pagina's geslaagd |
| Migratiecontrole | Geslaagd, 0 fouten |
| ESLint | Geslaagd |
| Interne-linkaudit | 495 contextuele links, 0 dubbele doelen per bronpagina |
| Live productie-QA op `.be` | 19 van 19 geslaagd |
| Productiebuild met `.be`-standaard | Geslaagd, 227 statische pagina's |
| Productiebuild met `.com`-variabelen | Geslaagd, 227 statische pagina's |

## Wat inhoudelijk is aangepast

### Eén conversieroute

De kennisbanktemplate gebruikte Typeform en Web3Forms naast elkaar. Typeform is uit de gedeelde route verwijderd. Automatische CTA's en bestaande dienstknoppen verwijzen nu naar hetzelfde formulier op de pagina. Daardoor blijft er één primaire commerciële vervolgstap met één privacy- en verwerkingsroute.

### Bronnen vóór veranderlijke claims

Claimrijke actieve pagina's tonen direct na het korte antwoord een primaire controlebron. De pagina's over de renovatielening en vergunningsvrijstellingen zijn aanvullend gecontroleerd en verwijzen naar de specifieke actuele pagina's van Vlaanderen.be.

Een bronkader is geen vrijstelling om cijfers actueel te houden. De migratiecheck bewaakt structuur en aanwezigheid; periodieke inhoudscontrole blijft nodig.

### Retrieval en zelfstandige passages

De 17 eerdere retrieval-HOLD's zijn herschreven. Korte of contextafhankelijke antwoorden noemen nu het onderwerp in de eerste zin. De laatste screening geeft:

- 166 passage-PASS;
- 0 passage-HOLD;
- 0 ambigue openers;
- 0 introducties zonder centrale entiteit.

### Topical bridges

De volgende acht aangrenzende onderwerpen bevatten nu een zichtbare vastgoedrelatie en hebben een passende cluster-eigenaar:

- `/bestaande-vloer-isoleren`;
- `/co2-meter-verplicht-in-huis`;
- `/gras-afrijden-op-zondag`;
- `/haag-hoogte`;
- `/hoogte-brievenbus`;
- `/overhangende-takken-buur`;
- `/vanaf-hoe-laat-mag-je-lawaai-maken`;
- `/verwarmen-met-airco`.

### URL-eigenaarschap

De sterkste eigenaar is behouden voor hypothecair mandaat, renovatieplicht en het centrale asbestattest. Interne links en related-doelen verwijzen rechtstreeks naar die eigenaar, niet naar een redirectbron.

### Lokale asbestpagina's

Zestien lokale asbestpagina's hadden geen aantoonbaar zelfstandige lokale functie. Ze worden niet als losse `.com`-pagina's gemigreerd. De bestanden blijven tijdelijk in het project voor rollback, maar zijn `noindex`, ontbreken in de sitemap en hebben een 301 naar `/asbestattest`.

### Domeinneutrale redactie

De zichtbare auteur is veranderd van `Redactie Vastgoedmakelaarzoeken.be` naar `Redactie Vastgoedmakelaar Zoeken`. Canonicals, sitemap, robots, schema en contactmail worden vanuit één domeinconfiguratie opgebouwd.

## Verificatie van de toekomstige `.com`-build

De build is uitgevoerd met:

```text
NEXT_PUBLIC_SITE_URL=https://www.vastgoedmakelaarzoeken.com
NEXT_PUBLIC_CONTACT_EMAIL=info@vastgoedmakelaarzoeken.com
MIGRATION_TARGET_HOST=www.vastgoedmakelaarzoeken.com
```

Resultaat:

- 195 URL's in de gegenereerde sitemap;
- 195 van 195 sitemaplocaties gebruiken `.com`;
- 0 `.be`-locaties in de sitemap;
- robots verwijst naar de `.com`-sitemap;
- de geteste canonical gebruikt `.com`;
- Organization- en WebSite-schema gebruiken `.com`;
- het schema gebruikt het `.com`-contactadres.

## Wat nog buiten de code moet gebeuren

De content is gereed, maar de migratie kan pas live wanneer deze externe voorwaarden zijn vervuld:

1. Eigendom en definitieve schrijfwijze van het `.com`-domein bevestigen.
2. DNS en TLS voor apex en `www` activeren.
3. `.be` en `.com` aan dezelfde deployment koppelen.
4. Het `.com`-contactadres en de formulieraflevering testen.
5. De `.com`-property in Google Search Console verifiëren.
6. Een laatste `.be`-nulmeting exporteren.
7. De drie migratievariabelen in één release instellen.
8. Na livegang de `.com`-sitemap indienen en de adreswijziging uitvoeren.

## Bestanden

- Post-fix URL-matrix: `docs/spam-prevention-url-matrix-2026-08-26.csv`
- Migratiedraaiboek: `docs/domeinmigratie-be-naar-com-2026-08-26.md`
- Contentfixer: `scripts/prepare-content-for-domain-migration.mjs`
- Migratiecontrole: `scripts/check-domain-migration-readiness.mjs`
