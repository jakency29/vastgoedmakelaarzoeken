# GVE Immobiliën, vier vestigingen, 14 oktober 2026

## Scope en toestemming

GVE Immobiliën, publiek ook bekend als Immo GVE, wordt toegevoegd als basisprofiel zonder premiumstatus. Christophe Ombelet, bestuurder van GVE Immobiliën, gaf op LinkedIn toestemming om gratis een profiel aan te maken. Geen e-mails verstuurd, geen formulieren ingevuld en niemand gecontacteerd.

Het kantoor komt niet uit de Limburgse kandidatenlijst van `scripts/kantoor-queue.mjs`; het werkt in Vlaams-Brabant. Er is daarom geen wachtrijbeslissing te markeren.

Topical role: lokale kantoorprofielen in de bestaande RealEstateAgent-template. Zoekintentie: de juiste vestiging herkennen, dienstverlening en publieke reviews bekijken en contact aanvragen. Centrale entiteiten: GVE Immobiliën en zijn vier vestigingen. Gerelateerde entiteiten: Leuven, Tienen, Aarschot, Bertem, de genoemde deelgemeenten, de BIV-vermeldingen en vier afzonderlijke Google-bedrijfsprofielen. De extra waarde bestaat uit twee brongebaseerde gesprekspunten per vestiging. Geen resultaatgaranties, verkoopduur of transactieaantallen overgenomen.

## Vestigingen en categorieën

GVE vermeldt vier kantoren. Zoals bij Living Stone, Sensimmo, Immosign+ en Swevers krijgt elke vestiging een eigen profiel met een eigen Google Place ID. Logo, BIV-vermelding, telefoon en e-mailadres zijn gedeeld.

Geen nieuwe categorie nodig:

- Provincie: de bestaande gids `/vastgoedkantoren/vlaams-brabant` toont via `KantorenInProvincie` en `provincieSlug: "vlaams-brabant"` nu zes kantoren in Aarschot, Bertem, Dilbeek, Grimbergen, Leuven en Tienen. Het provinciefilter op `/kantoor` werkt via het bestaande provincieveld.
- Diensten: Woning verkopen, Verhuur, Rentmeesterschap, Gratis schatting en Nieuwbouw vallen onder de bestaande dienstfilters (verkoop, verhuur, schatting, nieuwbouw, vastgoedbeheer). Investeren in vastgoed is de eigen dienstnaam van GVE en wordt alleen op het profiel getoond.
- Onderwerpen voor de vergelijking: verkoop, verhuur, schatting, nieuwbouw en beheer.
- Geen gemeentegids aangemaakt. De bestaande gemeentepagina Heusden-Zolder is een afzonderlijke contentpagina en geen vast onderdeel van een kantoorbatch.

## Gecontroleerde gegevens

| Profiel | Adres | Google Place ID | Google bij controle |
| --- | --- | --- | --- |
| `gve-immobilien-leuven` | Dirk Boutslaan 4, 3000 Leuven | ChIJO9BGn9lgwUcRtfYozWPSqnc | 4,5/5, 24 reviews |
| `gve-immobilien-tienen` | Goossensvest 1A, 3300 Tienen | ChIJrXGO8mtswUcR21NWve2cWq4 | 4,3/5, 47 reviews |
| `gve-immobilien-aarschot` | Leuvensesteenweg 25, 3200 Aarschot | ChIJ9_vz9NVdwUcRfgpy2QqHu-s | 5,0/5, 2 reviews |
| `gve-immobilien-bertem` | Gemeenteplein 3, 3060 Bertem | ChIJwyB17sRhwUcRPOr6Ka-Y2OM | 4,5/5, 17 reviews |

Alle vier: info@immogve.be en 016 56 56 14, BIV 503132 op naam van Kristof Van Eycken.

De Google Places API was bij deze controle niet bruikbaar: de lokale sleutel geeft `API key expired`. De Place IDs zijn daarom gevonden via DataForSEO Business Listings (Google Maps-data, alle vier geclaimd door de eigenaar, telefoon 016 56 56 14, website immogve.be) en daarna elk afzonderlijk geopend via een `place_id`-URL in Google Maps. Naam, adres en score kwamen overeen met de tabel. Niet-essentiële cookies zijn afgewezen. Leuven, Tienen en Bertem hebben ook eensterreviews; er is geen scorefilter toegevoegd, zoals bij de vorige batches.

## Primaire bronnen, geraadpleegd op 14 oktober 2026

- [Contact en wettelijke vermeldingen](https://www.immogve.be/contact): vier vestigingen met adres en openingsuren, info@immogve.be, 016 56 56 14, maatschappelijke zetel GVE Immobiliën bvba aan Dirk Boutslaan 4 in Leuven en de BIV-lijst. Erkend vastgoedmakelaar bemiddelaar: Kristof Van Eycken 503 132, Laurens Puyneers 510 571, Lotte Thijs 513 133, Anne-Leen Vanbrusselen 515 157 en Sven Van Extergem 518 208. Christophe Ombelet 503 121 staat er vermeld als erkend vastgoedmakelaar syndicus.
- Vestigingspagina's: [Leuven](https://www.immogve.be/contact/immo-gve-leuven) (centrum, Heverlee, Kessel-Lo, Wilsele, Wijgmaal; waardebepaling op basis van transacties, ligging, staat, EPC, asbestattest en renovatieplicht), [Tienen](https://www.immogve.be/contact/immo-gve-tienen) (verkoop, verhuur en rentmeesterschap; maandag tot zaterdag op afspraak), [Aarschot](https://www.immogve.be/contact/immo-gve-aarschot) (Aarschot centrum, Langdorp, Gelrode, Rillaar, Begijnendijk; op afspraak) en [Bertem](https://www.immogve.be/contact/immo-gve-bertem) (maandag, woensdag en vrijdag van 10u00 tot 12u30, verder op afspraak).
- [Over ons](https://www.immogve.be/over-ons): opgericht in 2012 door Kristof Van Eycken en Christophe Ombelet, beiden bestuurder; vier kantoren en het team. Marketingcijfers over transacties, portefeuille, gemiddelde verkoopduur en jaren ervaring zijn niet overgenomen.
- [Gratis schatting](https://www.immogve.be/gratis-schatting): schattingsverslag met nabespreking, attesten, fotograaf, lancering op de eigen website en daarna op externe portalen.
- Diensten: [rentmeesterschap](https://www.immogve.be/diensten/rentmeesterschap) (administratief, financieel-juridisch en technisch beheer via Rentio), [verhuren](https://www.immogve.be/diensten/verhuren) (tot de intrek van de huurder), [nieuwbouw](https://www.immogve.be/diensten/nieuwbouw) (voortraject en koop- of huurtraject) en [verkopen](https://www.immogve.be/diensten/verkopen).
- BIV-register als controle: [Kristof Van Eycken 503132](https://www.biv.be/vastgoedmakelaars/kristof-van-eycken-503132) is bemiddelaar (titularis) met hoofdkantoor Dirk Boutslaan 4, bijkantoren Gemeenteplein 3 in Bertem en Goossensvest 1A in Tienen, en de vennootschap in Aarschot. Hij is daarmee de enige BIV-houder die zowel op de website als in het register aan alle vier de vestigingen gekoppeld is. Daarom wordt zijn nummer voor alle vier gebruikt, zoals bij Swevers, Immosign+ en Sensimmo één nummer per groep wordt getoond.
- Officieel logo: het woordmerk uit de header-CSS van de kantoorwebsite (`/css/main.css`, regel `header .logo a::after`, de versie met zwarte letters voor een lichte achtergrond). De data-URI is gedecodeerd en ongewijzigd opgeslagen als `gve-immobilien.svg`. De SVG bevat geen scripts, eventhandlers of externe verwijzingen. De witte variant voor donkere achtergronden is niet gebruikt.

## Verschillen tussen bronnen

- Tienen: Google vermeldt Goossensvest 1, de kantoorwebsite en het BIV-register Goossensvest 1A. Het profiel volgt de website en noemt het verschil in de intro.
- Aarschot: het BIV-register vermeldt Aarschotsesteenweg 25; de kantoorwebsite en Google vermelden Leuvensesteenweg 25. Het profiel volgt de website.
- Christophe Ombelet staat op de website als syndicus vermeld en in het BIV-register als bemiddelaar (titularis). Niet opgelost; zijn nummer wordt niet als kantoornummer gebruikt.
- De privacypagina noemt nog Tervuursesteenweg 206 in Bertem. Dat adres komt nergens anders terug en is niet gebruikt.
- De Google-profielen van Leuven, Bertem en Aarschot linken naar `/contact/kantoor-<plaats>`, dat vandaag een 404 geeft. De actuele vestigingspagina's staan op `/contact/immo-gve-<plaats>`.

## Google-reviews

De Places-sleutel is verlopen. Op productie toont vandaag geen van de 51 bestaande profielen reviewdata (`Geen Google-reviewdata beschikbaar` op `/kantoor`). Op 24 september slaagde de reviewcontrole nog. Dit staat los van deze batch. Na een nieuwe sleutel in Vercel (en `.env.local`) tonen ook de vier GVE-profielen automatisch hun Google-score, na de dagelijkse ISR-verversing of een nieuwe deploy.

## Publicatie en QA

- Alleen de GVE-wijzigingen publiceren. Bestaande lokale wijzigingen voor SBC Vastgoed en andere niet gecommitte bestanden blijven buiten de commit.
- `node --test scripts/check-kantoor-inzichten.mjs`, inclusief een nieuwe test voor de vier vestigingen.
- Gerichte ESLint, `git diff --check` en `npm run build`.
- `node scripts/qa-kantoor-profielen.mjs <basis-url> gve-immobilien-leuven gve-immobilien-tienen gve-immobilien-aarschot gve-immobilien-bertem`.
- `node scripts/qa-kantoor-inzichten.mjs <basis-url>` voor 55 bronverrijkte profielen.
- Logo en profielkop visueel controleren op desktop en mobiel. Geen formulieren indienen.

### Lokale resultaten

- 14/14 tests geslaagd; gerichte ESLint en `git diff --check` zonder fouten.
- Productiebuild geslaagd op de basis van `origin/main`, inclusief TypeScript en contentcontrole van 167 pagina's.
- `qa-kantoor-profielen.mjs` faalt op `Geen reviews` voor alle vier, door de verlopen sleutel. Dezelfde controle faalt identiek voor het bestaande profiel `boes-en-boes`, lokaal en op productie.
- Dezelfde profielcontrole zonder het reviewdeel (logo, adres, bronnen, schema met BIV-nummer, formulier, provincielink, title, overzicht en sitemap): 4/4 geslaagd.
- 55/55 bronverrijkte profielen geslaagd in de regressiecontrole.
- Profielkoppen gecontroleerd in de browser op desktop en mobiel. Het logo is leesbaar: zwarte letters en een groene balk op wit. Geen formulieren ingediend.

### Status

De commit staat op de lokale branch `main`, direct bovenop `origin/main`. De gewone projectmap staat op `codex/kennisbank-jakency-methodiek`, met twee woningcommits die nog niet op main staan; die zitten niet in deze commit. Build, tests en QA hierboven zijn op deze main-basis herhaald.

Lokaal gecommit, niet gepusht. Volgens de QA-afspraak gaat er niets live zolang een controle faalt, en de reviewcontrole faalt door de verlopen sleutel. Na akkoord volgen de push, de livecontrole en een aanvulling van dit document.
