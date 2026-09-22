# Drie volgende kantoren, 22 september 2026

## Scope en selectie

De volgende drie kandidaten uit `node scripts/kantoor-queue.mjs next --limit 3`: Aktimmo, Albert Diepenbeek en BC Immo. Geen e-mails versturen.

Topical role: lokale kantoorprofielen in de bestaande RealEstateAgent-template. Zoekintentie: de juiste vestiging herkennen, diensten en publieke reviews bekijken en contact aanvragen. Centrale entiteiten: de drie kantoren, hun lokale contactpersonen, BIV-vermeldingen en afzonderlijke Google-bedrijfsprofielen. Gerelateerde plaatsen: Sint-Truiden, Haspengouw, Diepenbeek, Genk en Limburg. De extra waarde bestaat uit brongebaseerde uitleg over de dienstverlening en twee concrete gespreksvragen per kantoor. Geen nieuwe SEO-clusterpagina, resultaatgarantie of onafhankelijke kwaliteitsbeoordeling.

## Gecontroleerde gegevens

| Profiel | Adres | E-mail | Google Place ID | Google bij controle |
| --- | --- | --- | --- | --- |
| `aktimmo` | Luikersteenweg 54E bus 004, 3800 Sint-Truiden | info@aktimmo.be | ChIJmczzN0sXwUcR9NU1aX8Q4c4 | 4,8/5, 86 reviews |
| `albert-diepenbeek` | Grendelbaan 78, 3590 Diepenbeek | diepenbeek@albert.immo | ChIJ32AVKFTfwEcRBGh6aYYMJOE | 4,4/5, 9 reviews |
| `bc-immo` | Schalmstraat 2, 3600 Genk | info@bcimmo.be | ChIJ4Xt9G-ffwEcRp9vozCjmBwo | 4,8/5, 23 reviews |

Alle drie de Google-profielen zijn operationeel en komen overeen met naam, telefoon, website en huidige vestiging. Google leverde vijf reviews met tekst per kantoor. Bij Aktimmo en Albert is daar ook een eensterreview bij; er wordt geen scorefilter toegevoegd. De bestaande component toont maximaal vier kaarten en een link naar alle Google-reviews. Gemiddelden en aantallen worden niet hardcoded.

## Primaire bronnen, geraadpleegd op 22 september 2026

### Aktimmo

- [Contact](https://aktimmo.be/nl/contact): Luikersteenweg 54e, 3800 Sint-Truiden, telefoon, e-mail en BIV 502577 op naam van Stefan Vanweddingen. De oude Schepen Dejonghstraat 29 uit de kandidatenlijst wordt niet gepubliceerd. De busnotatie 004 is bevestigd door het actuele Google-profiel en komt ook terug op de oudere officiële vastgoedpagina's.
- [Homepage](https://aktimmo.be/nl): Aktimmo & Partners, werkgebied Sint-Truiden, Tongeren, Borgloon, Nieuwerkerken en Alken; schatting naast verkoop en verhuur.
- [Diensten](https://aktimmo.be/nl/wat-doen-we): verhuur met of zonder beheer, herbestemming, haalbaarheid, investeringsadvies en Wellen. Rendements- en risicobeloftes worden niet overgenomen.
- [Officieel logo](https://aktimmo.be/cms-assets/theme/logoUrl?hash=776adca3cc96c03fa3c5d50bbdb48f15b43b5cea944f7bcb04e68f36a52d1c39cd594412b6a8fc82895389ba6bb6727b0d4019730217baa16b37b23e96568c3b), ongewijzigd opgeslagen als `aktimmo.png`.

### Albert Diepenbeek

- [Officiële vestigingspagina](https://albert.immo/nl/office/diepenbeek): adres, telefoon, lokaal team, BIV 514134 op naam van Nathalie Poelmans, BIV 512102 voor Geert Vertongen en stagiair Oliver Teetzmann. Het hoofdkantoornummer uit de footer wordt niet als lokaal nummer overgenomen.
- Dezelfde pagina bevat vestigingsspecifieke FAQ-antwoorden over een gratis schatting met plaatsbezoek en het werkgebied in Limburg. Het aanbod bevat residentieel en professioneel vastgoed. Geen woningprijzen of verkooptijden uit marketing-FAQ's overgenomen.
- Het algemene adres `diepenbeek@albert.immo` staat in de openbare vestigingsgegevens die deze pagina meestuurt. De zichtbare teampagina publiceert daarnaast `nathalie.poelmans@albert.immo`. De vestigingsmail wordt voor de handmatige introductie gebruikt, niet de centrale groepsmail.
- [Officieel Albert-logo](https://albert.immo/logo.svg), ongewijzigd lokaal als `albert-diepenbeek.svg`; SVG gecontroleerd op actieve inhoud en externe verwijzingen.

### BC Immo

- [Contact en wettelijke informatie](https://www.bcimmo.be/nl/contact/bc-immo-bv-genk): adres, telefoon, e-mail, ontvangst op afspraak en BIV 511657 op naam van Nuray Havva Bagci.
- [Diensten](https://www.bcimmo.be/nl/diensten): verkoop, verhuur, beheer, aankoopbegeleiding, gratis schatting en coördinatie van projectontwikkelingen.
- [Verhuur](https://www.bcimmo.be/nl/diensten/verhuren-met-bc-immo): kandidaatselectie en afzonderlijk rentmeesterschap met dagelijks beheer en huurderscontact. Geen garantie over betrouwbaarheid van huurders overgenomen.
- [Officieel logo](https://www.bcimmo.be/storage/bcimmo_template_fw4_immo/settings/1591710553.jpg), ongewijzigd lokaal als `bc-immo.jpg`.

## Publicatie en QA

- Alleen deze drie kantoren publiceren. Bestaande lokale wijzigingen voor SBC Vastgoed en woning 166345 blijven onaangeroerd en buiten de commit.
- `node --test scripts/check-kantoor-inzichten.mjs`: bronintegriteit, exacte kantoor- en reviewkoppelingen, datum, logo's en geen scorefilter.
- Gerichte lint en productiebuild.
- `node scripts/qa-kantoor-profielen.mjs <basis-url> aktimmo albert-diepenbeek bc-immo`: lokaal en live.
- `node scripts/qa-kantoor-inzichten.mjs <basis-url>`: regressie voor 48 bronverrijkte profielen.
- Visuele controle van de drie logo's en profielkoppen, zonder formulieren in te dienen. De wachtrij pas na geslaagde livecontrole bijwerken met exacte kandidaat-URL, profiel-URL en e-mail.

### Lokale resultaten

- 12/12 tests geslaagd; gerichte ESLint en `git diff --check` zonder fouten.
- Productiebuild geslaagd, inclusief TypeScript en contentcontrole voor 166 kennispagina's.
- 3/3 nieuwe kantoorprofielen geslaagd: logo, adres, reviews, bronverwijzingen, JSON-LD, formulier, overzicht en sitemap.
- 48/48 bronverrijkte kantoorprofielen geslaagd in de regressiecontrole.
- Alle drie de profielkoppen visueel gecontroleerd in de browser. Officiële logo's zijn zichtbaar en leesbaar; Google-scores en aantallen komen overeen met de gecontroleerde vestigingen. Geen formulieren ingediend.
