# Immo Beguin, vier vestigingen, 15 oktober 2026

## Scope en toestemming

Immo Beguin wordt toegevoegd als basisprofiel zonder premiumstatus, met vier vestigingen: Ronse, Waregem, Kortrijk en Deinze. Sophie Beguin, eigenaar van Immo Beguin en BIV-titularis, gaf op 15 oktober 2026 op LinkedIn toestemming ("Top, doe maar!") op dit bericht: "Als je wil, maak ik gratis een profiel aan voor Immo Beguin, met jullie kantoren in Ronse, Waregem, Kortrijk en Deinze." Geen e-mails verstuurd, geen formulieren ingevuld en niemand gecontacteerd.

De kantoorwebsite vermeldt acht kantoren. De toestemming dekt alleen de vier genoemde vestigingen. Lessen, Doornik, Moeskroen en Nieuwpoort zijn daarom niet opgenomen.

Het kantoor komt niet uit de Limburgse kandidatenlijst van `scripts/kantoor-queue.mjs`. Er is geen wachtrijbeslissing te markeren.

Topical role: lokale kantoorprofielen in de bestaande RealEstateAgent-template. Zoekintentie: de juiste vestiging herkennen, dienstverlening en publieke reviews bekijken en contact aanvragen. Centrale entiteiten: Immo Beguin en de vier vestigingen. Gerelateerde entiteiten: Ronse, Waregem, Kortrijk, Deinze, de Vlaamse Ardennen, de Leiestreek, de BIV-vermelding en vier afzonderlijke Google-bedrijfsprofielen. De extra waarde bestaat uit twee brongebaseerde gesprekspunten per vestiging. Geen resultaatgaranties, verkoopduur, klantenaantallen of teamgroottes overgenomen.

## Provincies, gidsen en filters

Ronse en Deinze liggen in Oost-Vlaanderen, Waregem en Kortrijk in West-Vlaanderen. Tot deze batch stond er geen enkel kantoor uit West-Vlaanderen op het platform; Oost-Vlaanderen had één profiel (Immo De Prins, Sint-Niklaas).

Zo werkt het vandaag:

- Provinciefilter op `/kantoor`: `OfficeDirectoryExplorer` bouwt de keuzelijst uit het veld `provincie` van alle kantoren. West-Vlaanderen verschijnt dus automatisch zodra er een kantoor met die provincie is. Het overzicht telt nu vijf provincies.
- Provinciegidsen: handmatige MDX-pagina's onder `content/vastgoedkantoren/` (Antwerpen, Limburg, Vlaams-Brabant), met `KantorenInProvincie` en een vaste lijst in `src/app/kantoor/page.tsx`. Een kantoorprofiel linkt alleen naar een gids als `provincieSlug` gezet is.
- Profiel: toont "Vastgoedkantoor in <gemeente>, <provincie>" en zet de provincie als `addressRegion` in de RealEstateAgent-JSON-LD.
- Vergelijking op het profiel: alleen kantoren uit dezelfde provincie met onderzochte inzichten. Waregem en Kortrijk vergelijken met elkaar; Ronse en Deinze met elkaar en met Immo De Prins. De Leiestreek in Waregem en Deinze telt niet over de provinciegrens.

Besluit: geen nieuwe provinciepagina. Ze is niet nodig om de vier profielen correct in provincie, gemeente, filter, schema en sitemap te tonen. De vier profielen krijgen geen `provincieSlug`, net zoals Immo De Prins in Oost-Vlaanderen. Een gids voor West-Vlaanderen zou vandaag alleen twee vestigingen van één organisatie bevatten. Dat is een dunne lokale hub. De spam-preventie-audit van 26 augustus zette twee van de vier lokale kantoorhubs op HOLD en noteert dat locatiepagina's alleen bestaan waar echt aanbod is. De gids Antwerpen ontstond met vijf kantoren van vijf organisaties. Een gids voor Oost- of West-Vlaanderen is een beslissing voor de operator zodra er meer zelfstandige kantoren zijn.

Nieuwe test: een `provincieSlug` op een kantoor moet naar een bestaande gids onder `content/vastgoedkantoren/` wijzen, zodat een latere batch geen dode provincielink kan maken.

Diensten: Woning verkopen, Gratis schatting en Nieuwbouw vallen onder de bestaande dienstfilters. Commercieel vastgoed en Fysieke en AI-staging zijn eigen dienstnamen van Immo Beguin en worden alleen op het profiel getoond. Verhuur is niet opgenomen: de kantoorwebsite biedt geen verhuurdienst aan; alleen de standaardtekst van de privacyverklaring noemt verhuuropdrachten. Geen gemeentegids aangemaakt.

## Gecontroleerde gegevens

| Profiel | Adres | Provincie | Google Place ID | Google bij controle |
| --- | --- | --- | --- | --- |
| `immo-beguin-ronse` | Grote Markt 35, 9600 Ronse | Oost-Vlaanderen | ChIJ3Y1-a9UEw0cRg6HXNHNus-8 | 4,5/5, 229 reviews |
| `immo-beguin-waregem` | Roterijstraat 202, 8790 Waregem | West-Vlaanderen | ChIJR0-LMjg_w0cRHwpgtCm0cAE | 4,8/5, 207 reviews |
| `immo-beguin-kortrijk` | Plein 16, 8500 Kortrijk | West-Vlaanderen | ChIJUYgQh6Y7w0cRIxfbUtNCWqg | 4,7/5, 70 reviews |
| `immo-beguin-deinze` | Gentstraat 14, 9800 Deinze | Oost-Vlaanderen | ChIJL-x6bLdrw0cR0guJ8qGchss | 5,0/5, 11 reviews |

Alle vier: info@immobeguin.be en 0486 60 66 00, BIV 504850 op naam van Sophie Beguin.

De Google Places API was bij deze controle niet bruikbaar: de sleutel is sinds 14 oktober verlopen. De Place IDs zijn gevonden via DataForSEO Business Listings (Google Maps-data, alle vier geclaimd door de eigenaar, telefoon 0486 60 66 00, website immobeguin.be) en daarna elk afzonderlijk geopend via een `place_id`-URL in Google Maps. Naam, adres en score kwamen overeen met de tabel. Niet-essentiële cookies zijn afgewezen. Google noemt Ronse en Waregem "Immobiliënkantoor" en Kortrijk en Deinze "Vastgoedadviseur". Ronse heeft ook eensterreviews; er is geen scorefilter toegevoegd, zoals bij de vorige batches. Scores staan alleen in deze notitie; het platform toont ze pas wanneer het ze zelf live ophaalt.

## Primaire bronnen, geraadpleegd op 15 oktober 2026

- [Contact en wettelijke vermeldingen](https://www.immobeguin.be/contact): acht kantoren met adres, één telefoonnummer en één e-mailadres voor alle kantoren, en de vermelding "Immo Beguin, BTW 0806.074.255, Vastgoedmakelaar bemiddelaar BIV 504850", toezichthouder BIV, BA en borgstelling via AXA Belgium.
- Vestigingspagina's: [Ronse](https://www.immobeguin.be/kantoor-ronse) (eerste kantoor, in 2009 geopend aan de Grote Markt; Vlaamse Ardennen), [Waregem](https://www.immobeguin.be/kantoor-waregem) (Roterijstraat 202, 8790 Waregem; verhuis naar een groter kantoor "binnenkort" aangekondigd, zonder nieuw adres of datum; Leiestreek), [Kortrijk](https://www.immobeguin.be/kantoor-kortrijk) (Plein 16, centrum van Kortrijk) en [Deinze](https://www.immobeguin.be/kantoor-deinze) (Gentstraat 14; Deinze en de ruime Leiestreek). Geen openingsuren op de website.
- [Verkopen](https://www.immobeguin.be/verkopen): verkooptraject in vier stappen (kennismaking, tweede afspraak met waardebepaling, analyse en verkoopstrategie, daarna pas het mandaat), in-house marketing, eigen juridische ondersteuning, fysieke staging en een gratis AI-tool voor staging.
- [DNA](https://www.immobeguin.be/dna): fotografie, video, dronebeelden, social advertising, Early Bird, vastgoedportalen en netwerk; administratie, planning, bezoeken en onderhandelingen uit handen. Early Bird wordt niet uitgelegd en is ook niet geïnterpreteerd.
- [Over ons](https://www.immobeguin.be/over-ons): lokale kantoren, affichering op zichtlocaties, ondersteuning van de makelaars en een WhatsApp-groep per woning.
- [Schatting aanvragen](https://www.immobeguin.be/schatting-aanvragen): vrijblijvende waardebepaling aan huis. Niets ingevuld.
- BIV-register als controle: [Sophie Beguin 504850](https://www.biv.be/vastgoedmakelaars/sophie-beguin-504850) is bemiddelaar (titularis) bij Immo Beguin, met hoofdkantoor Grote Markt 35, 9600 Ronse, website immobeguin.be en info@immobeguin.be. Het nummer staat ook in de wettelijke vermelding op de kantoorwebsite. Het wordt daarom voor alle vier gebruikt, zoals bij GVE, Swevers, Immosign+ en Sensimmo één nummer per groep wordt getoond.
- Officieel logo: het inline SVG-woordmerk uit de websiteheader (`a.c-logo`), ongewijzigd opgeslagen als `immo-beguin.svg`. Het logo is crème (#f5f1ec) en lichtblauw (#67b7d1) en staat op de site op een donkerblauwe kop (#1b2e40 in `main.css`). Zoals bij Consimmo zet een CSS-regel die alleen op dit bestand mikt een donkere achtergrond, voor contrast op profiel en overzichten. De SVG bevat geen scripts, eventhandlers of externe verwijzingen.

## Verschillen tussen bronnen

- Waregem: de kantoorwebsite vermeldt postcode 8790, Google 8793 voor hetzelfde adres. Het profiel volgt de website en noemt het verschil in de intro.
- Waregem: de website kondigt een verhuis aan. Adres, intro, inzicht en Google-profiel opnieuw controleren zodra het nieuwe adres bekend is.
- Het BIV-register vermeldt alleen het hoofdkantoor in Ronse en geen bijkantoren in Waregem, Kortrijk of Deinze. Bij GVE stonden de bijkantoren wel in het register. Niet opgelost; geen ander BIV-nummer gevonden op de website.
- Telefoonnotatie: +32 486 60 66 00 op de contactpagina, +32 486 606 600 op de vestigingspagina's, 0486 60 66 00 op Google. Hetzelfde nummer.
- Teamgrootte en aantal vestigingen verschillen per bron: de homepage-titel noemt 8 kantoren en meer dan 35 professionals, de vestigingspagina's meer dan 30, de Google-beschrijving meer dan 6 vestigingen. Niet overgenomen. Ook niet overgenomen: 20.000 zoekende kopers, 100% klantentevredenheid, "verkocht in 1 maand" en "toonaangevend".
- De Google-profielen van Kortrijk en Deinze linken naar de homepage, niet naar de vestigingspagina. Het profiel op het platform linkt naar de vestigingspagina.
- Openingsuren staan alleen op Google, niet op de kantoorwebsite. Ze zijn niet opgenomen.

## Google-reviews

De Places-sleutel is verlopen; op productie toont geen enkel profiel reviewdata. Na een nieuwe sleutel in Vercel (en `.env.local`) tonen ook de vier Beguin-profielen automatisch hun Google-score, na de dagelijkse ISR-verversing of een nieuwe deploy.

## Publicatie en QA

- Alleen de Beguin-wijzigingen publiceren. Bestaande lokale wijzigingen in de projectmap (SBC Vastgoed, woningcommits op de codex-branch en andere niet gecommitte bestanden) blijven buiten de commit.
- `node --test scripts/check-kantoor-inzichten.mjs`, met een nieuwe test voor de vier vestigingen en een test op provincielinks.
- Gerichte ESLint, `git diff --check` en `npm run build`.
- `node scripts/qa-kantoor-profielen.mjs <basis-url> immo-beguin-ronse immo-beguin-waregem immo-beguin-kortrijk immo-beguin-deinze`.
- `node scripts/qa-kantoor-inzichten.mjs <basis-url>` voor 59 bronverrijkte profielen.
- Provinciefilter op `/kantoor` voor Oost- en West-Vlaanderen, logo en profielkop visueel op desktop en mobiel. Geen formulieren indienen.

### Lokale resultaten

- 16/16 tests geslaagd; gerichte ESLint en `git diff --check` zonder fouten; geen em- of en-dashes in de nieuwe gegevens of in deze notitie.
- Productiebuild geslaagd op de basis van `origin/main`, inclusief TypeScript en contentcontrole van 167 pagina's (283 statische pagina's).
- `qa-kantoor-profielen.mjs` faalt op `Geen reviews` voor de nieuwe profielen, door de verlopen sleutel. Dezelfde controle faalt identiek voor het bestaande profiel `boes-en-boes`, lokaal en op productie.
- Dezelfde profielcontrole zonder het reviewdeel, aangevuld met gemeente en provincie in de profielkop, `addressRegion` in de JSON-LD, geen link naar een onbestaande provinciegids, title en dashcontrole: 4/4 geslaagd. Logo, adres, bronnen, schema met BIV-nummer, formulier, overzicht en sitemap in orde.
- 59/59 bronverrijkte profielen geslaagd in de regressiecontrole.
- Provinciefilter op `/kantoor` in de browser: West-Vlaanderen geeft 2 kantoren (Kortrijk, Waregem), Oost-Vlaanderen 3 (Deinze, Ronse, Immo De Prins). Het overzicht telt 59 profielen in 5 provincies.
- Profielkop en overzichtskaarten gecontroleerd op desktop en mobiel (375 px, geen horizontale scroll). Het logo is leesbaar: crème woordmerk met monogram op donkerblauw. Geen formulieren ingediend.

### Status

De commit staat op de lokale branch `main`, direct bovenop `origin/main` (f17a678, de GVE-batch, die intussen gepusht is). De gewone projectmap staat op `codex/kennisbank-jakency-methodiek`; die wijzigingen zitten niet in deze commit.

Lokaal gecommit, niet gepusht. Volgens de QA-afspraak gaat er niets live zolang een controle faalt, en de reviewcontrole faalt door de verlopen sleutel. Na akkoord van de operator volgen de push, de livecontrole en een aanvulling van dit document.
