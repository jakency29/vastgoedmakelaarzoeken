# Immo Beguin, vier extra vestigingen, 19 oktober 2026

## Scope en toestemming

Immo Beguin krijgt vier extra basisprofielen zonder premiumstatus: Lessen (Lessines), Doornik (Tournai), Moeskroen (Mouscron) en Nieuwpoort. Ronse, Waregem, Kortrijk en Deinze staan live sinds 16 oktober (commit 32516fa, zie `docs/kantoren-batch-2026-10-15.md`).

Sophie Beguin, eigenaar van Immo Beguin en BIV-titularis (504850), gaf op 18 oktober 2026 op LinkedIn toestemming voor de overige kantoren: "De andere mogen er ook bij!" De operator besliste op 19 oktober dat ook de Waalse vestigingen erbij komen. Geen e-mails verstuurd, geen formulieren ingevuld en niemand gecontacteerd.

Sophie Beguin bevestigde ook dat Waregem bij de verhuis postcode 8790 krijgt. Het Waregemse profiel is daarom geneutraliseerd (zie verder).

Het kantoor komt niet uit de Limburgse kandidatenlijst van `scripts/kantoor-queue.mjs`. Er is geen wachtrijbeslissing te markeren.

Topical role: lokale kantoorprofielen in de bestaande RealEstateAgent-template. Zoekintentie: de juiste vestiging herkennen, dienstverlening bekijken en contact aanvragen. Centrale entiteiten: Immo Beguin en de vier vestigingen. Gerelateerde entiteiten: Lessen, Doornik, Moeskroen, Nieuwpoort, het Pays des Collines, Picardisch Wallonië, de kust, de BIV-vermelding en drie Google-bedrijfsprofielen. De extra waarde bestaat uit twee brongebaseerde gesprekspunten per vestiging. Geen resultaatgaranties, klantenaantallen, teamgroottes of aantallen kantoren overgenomen.

## Wallonië: wat nodig was

Het platform beschrijft zichzelf als vergelijkingsdienst voor "Vlaanderen en Brussel". Lessen, Doornik en Moeskroen liggen in Henegouwen. Zo werkt het nu:

- Datamodel: `provincie` is een vrij tekstveld. Henegouwen verschijnt automatisch in het provinciefilter op `/kantoor`, in de profielkop ("Vastgoedkantoor in Lessen (Lessines), Henegouwen"), als `addressRegion` in de RealEstateAgent-JSON-LD en in de sitemap. Het overzicht telt nu zes provincies.
- Gemeentenaam: Nederlandse naam met de Franse erbij, zoals "Lessen (Lessines)". De kantoornaam volgt de Nederlandstalige website van Immo Beguin ("Immo Beguin Lessen"). Straatnamen staan zoals op de kantoorwebsite (Porte d'Ogy, Place de Lille, Rue du Bois de Boulogne). Zoeken op "Lessines", "Tournai" of "Mouscron" in het overzicht vindt het profiel via het gemeenteveld.
- Geen provinciegids voor Henegouwen en dus geen `provincieSlug`, om dezelfde reden als bij Oost- en West-Vlaanderen in de vorige batch: een gids met drie vestigingen van één organisatie is een dunne lokale hub.
- BIV: het BIV (IPI in het Frans) is federaal. Het BIV-blok op het profiel klopt dus ook voor Waalse vestigingen; niets aangepast.
- Aangepast, omdat het anders fout werd op deze profielen:
  - `src/lib/kantoor-inzichten.ts`: "henegouwen" toegevoegd aan de brede regio's. Anders telde de provincienaam Henegouwen als lokale overlap in de vergelijking ("Beide profielen vermelden Henegouwen"). Picardisch Wallonië telt wel als gedeelde regio (Doornik en Moeskroen).
  - `src/app/kantoor/[slug]/page.tsx`: de profiel-FAQ "Wat kost ... bij de verkoop van een woning?" noemt de Vlaamse commissievork (2% tot 4%) niet meer voor een vestiging in een Waalse provincie. Daar staat nu dat er geen wettelijk tarief is en dat de commissie in de bemiddelingsopdracht wordt vastgelegd. Vlaamse profielen zijn ongewijzigd.
- Niet aangepast, wel gemeld aan de operator: site-brede teksten en schema's die de scope als "Vlaanderen en Brussel" of "heel Vlaanderen" beschrijven (homepage, werkwijze, `site.ts`, Organization-schema). De lijst staat onderaan.

## Gecontroleerde gegevens

| Profiel | Adres | Provincie | Google Place ID | Google bij controle |
| --- | --- | --- | --- | --- |
| `immo-beguin-lessen` | Porte d'Ogy 78, 7860 Lessen (Lessines) | Henegouwen | ChIJO8DVoZGpw0cRpHYx-9L9HHA | "Immo Beguin Lessines", 4,8/5, 42 reviews |
| `immo-beguin-doornik` | Place de Lille 22, 7500 Doornik (Tournai) | Henegouwen | ChIJz1tnZcLfwkcRtUJgRLMvRVw | "Immo Beguin Tournai", 5,0/5, 28 reviews |
| `immo-beguin-moeskroen` | Rue du Bois de Boulogne 1/3, 7700 Moeskroen (Mouscron) | Henegouwen | ChIJ0ZwOGp0lw0cRcZuWAjW7Xb0 | "Immo Beguin Mouscron", 5,0/5, 18 reviews |
| `immo-beguin-nieuwpoort` | Lombardsijdestraat 1, 8620 Nieuwpoort | West-Vlaanderen | geen gevonden | geen Google-bedrijfsprofiel |

Alle vier: info@immobeguin.be en 0486 60 66 00, BIV 504850 op naam van Sophie Beguin, het bestaande logo `immo-beguin.svg`.

De Google Places API was niet bruikbaar (sleutel verlopen sinds 14 oktober). Lessen en Doornik zijn gevonden via DataForSEO Business Listings (geclaimd, telefoon 0486 60 66 00, website immobeguin.be). Moeskroen staat nog niet in de Business Listings-database; de Place ID komt uit het `google_reviews`-element van een DataForSEO-SERP voor "Immo Beguin Mouscron" (zelfde telefoon en website in het kennispaneel). Alle drie zijn daarna afzonderlijk geopend via een `place_id`-URL in Google Maps; naam, adres, telefoon en score kwamen overeen met de tabel. Niet-essentiële cookies zijn afgewezen.

Nieuwpoort: geen resultaat in DataForSEO Business Listings (op naam en op categorie rond Nieuwpoort), geen Beguin-kennispaneel in de SERP (wel een ander kantoor, Agence Nieuwpoort, Lombardsijdestraat 5b) en geen Nieuwpoortse vestiging bij een zoekopdracht in Google Maps. Het profiel heeft daarom geen `googlePlaceId` en toont geen reviewblok. Zodra er een Google-bedrijfsprofiel bestaat, kan de Place ID worden toegevoegd.

Scores staan alleen in deze notitie; het platform toont ze pas wanneer het ze zelf live ophaalt.

## Primaire bronnen, geraadpleegd op 19 oktober 2026

- [Contact en wettelijke vermeldingen](https://www.immobeguin.be/contact): acht kantoren met adres, waaronder Lessen (Porte d'Ogy 78, 7860), Tournai (Place de Lille 22, 7500), Moeskroen (Rue du Bois de Boulogne 1/3, 7700) en Nieuwpoort (Lombardsijdestraat 1, 8620), één telefoonnummer en één e-mailadres, en ongewijzigd "Immo Beguin, BTW 0806.074.255, Vastgoedmakelaar bemiddelaar BIV 504850".
- Vestigingspagina's: [Lessen](https://www.immobeguin.be/kantoor-lessen) (op de grens van het Pays des Collines; verkoop, aankoop of investering), [Doornik](https://www.immobeguin.be/kantoor-doornik) (centraal aan de Place de Lille; aanbod onder "Wonen in Picardisch Wallonië") en [Moeskroen](https://www.immobeguin.be/kantoor-moeskroen) (nieuw kantoor, lokaal team, groei in Picardisch Wallonië). Alle drie vermelden nu openingsuren: maandag tot vrijdag 9 tot 18 uur, zaterdag 9 tot 12 uur.
- [Bericht over het kantoor in Nieuwpoort](https://www.immobeguin.be/insights/nieuw-kantoor-nieuwpoort), 6 augustus 2026: "dit jaar" een vestiging aan de Lombardsijdestraat 1, de stad waar Sophie Beguin opgroeide, omdat het kantoor vaker de vraag kreeg om vastgoed aan de kust te verkopen.
- [Bericht over Waregem en Moeskroen](https://www.immobeguin.be/insights/nieuw-kantoor-waregem), 5 juni 2026: Moeskroen als derde Waals kantoor na Doornik en Lessen. Gebruikt voor die ene zin in de intro van Moeskroen.
- [Verkopen](https://www.immobeguin.be/verkopen): tekst ongewijzigd t.o.v. 15 oktober; noemt nu kantoren in alle acht gemeenten. Gebruikt voor schatting en verkooptraject (Lessen) en onderhandelen en ontzorgen (Nieuwpoort).
- [Early Bird](https://www.immobeguin.be/early-bird): gratis Facebookgroep waarin nieuwe panden eerst verschijnen, met onder meer Doornik, Lessines en Ath als regio's (Doornik).
- [Aankoopbelofte](https://www.immobeguin.be/aankoopbelofte): document om een bod uit te brengen, terug te bezorgen via de makelaar of het algemene e-mailadres (Moeskroen).
- [Waregem](https://www.immobeguin.be/kantoor-waregem): adres Roterijstraat 202, 8790 Waregem; voor het nieuwe neutrale inzicht.
- BIV-register als controle: [Sophie Beguin 504850](https://www.biv.be/vastgoedmakelaars/sophie-beguin-504850), bemiddelaar (titularis) bij Immo Beguin, hoofdkantoor Grote Markt 35, 9600 Ronse. Ongewijzigd.
- Externe berichten (HLN, KW, Immoweb, Immovlan, Zimmo) zijn alleen gezien in de zoekresultaten en niet als bron gebruikt.

## Waregem geneutraliseerd

- Intro: de zin over de verhuis ("vraag daarom bij een afspraak het actuele adres na") en de zin over postcode 8793 op Google zijn weg. Het profiel noemt alleen Roterijstraat 202, 8790 Waregem.
- Inzicht "Verhuis naar een groter kantoor aangekondigd" vervangen door "Vestiging in de Roterijstraat" (aanwezigheid in Waregem en de regio, aanbod onder de noemer Leiestreek, openingsuren), met bron geraadpleegd op 19 oktober. Het tweede inzicht (marketing en Early Bird volgens de DNA-pagina) is ongewijzigd.
- Google vermeldt Waregem nog altijd met postcode 8793. De vestigingspagina kondigt nog altijd een verhuis aan, zonder nieuw adres. Adres en Google-profiel opnieuw controleren zodra het nieuwe adres bekend is.

## Verschillen tussen bronnen

- De verkooptekst op de vestigingspagina's van Lessen, Doornik en Moeskroen zegt dat het team de vastgoedmarkt "in de Vlaamse Ardennen" kent; dat is dezelfde tekst als op de Vlaamse vestigingspagina's. Niet overgenomen.
- Doornik: de kop van de vestigingspagina vermeldt "7500 Tournai", de voettekst "7500 Doornik", de contactpagina "Kantoor TOURNAI". Google: "Immo Beguin Tournai".
- Moeskroen: website "Rue du Bois de Boulogne 1/3", Google "Rue du Bois de Boulogne 1" (in Google Maps in het Nederlands "Boulogne Bosstraat 1"), het bericht van 5 juni "Rue du Bois du Boulogne 1". Het profiel volgt de contact- en vestigingspagina.
- Lessen: Google noemt het profiel "Immo Beguin Lessines" (DataForSEO geeft ook de titel "Immo Beguin") en schrijft "Prte d'Ogy 78".
- Nieuwpoort heeft geen eigen vestigingspagina: de menulink "Kantoor Nieuwpoort" gaat naar `/contact#offices`. Het profiel linkt daarom naar de contactpagina. Het bericht van 6 augustus spreekt van een opening "dit jaar"; of het kantoor al dagelijks open is, staat nergens. Dat is de vraag in het eerste inzicht.
- Het BIV-register vermeldt alleen het hoofdkantoor in Ronse, geen bijkantoren. Zoals in de vorige batch wordt BIV 504850 uit de wettelijke vermelding voor alle vestigingen gebruikt.
- Niet overgenomen: 20.000 zoekende kopers of klanten, meer dan 30 of 35 medewerkers, "6 kantoren" of "8 kantoren", "toonaangevend".
- Diensten zijn dezelfde als bij de eerste vier vestigingen (organisatiebrede diensten uit de verkooppagina). Verhuur is niet opgenomen.

## Site-brede teksten met de scope "Vlaanderen en Brussel" (niet aangepast)

- `src/lib/site.ts`, `site.description`: "Belgische vergelijkingsdienst voor eigenaars die vastgoedmakelaars in Vlaanderen en Brussel willen vergelijken voor verkoop, verhuur of waardebepaling." Voedt ook de Organization-description in de JSON-LD.
- `src/lib/jsonld.ts`, Organization `areaServed`: "Vlaanderen" en "Brussels Hoofdstedelijk Gewest".
- `src/app/page.tsx`: FAQ "Vastgoedmakelaar Zoeken is een Belgische vergelijkingsdienst voor eigenaars in Vlaanderen en Brussel." en "Voor heel Vlaanderen en Brussel. ..."; hero "Voor heel Vlaanderen en Brussel"; introtekst "vastgoedmakelaars in Vlaanderen en Brussel helpt vergelijken"; kenmerk "Vlaanderen en Brussel"; "Via ... vind je erkende vastgoedmakelaars en immokantoren in heel Vlaanderen en Brussel"; kantorenblok "Erkende kantoren uit heel Vlaanderen op ons platform." Dat laatste blok toont de acht nieuwste profielen (na de premiumpartner) en bevat na deze batch drie Henegouwse vestigingen, en zeven kaarten van Immo Beguin.
- `src/app/werkwijze/page.tsx`: "Vastgoedmakelaar Zoeken is een Belgische vergelijkingsdienst die eigenaars in Vlaanderen en Brussel helpt om vastgoedkantoren te vinden ..."
- Niet de scope van het platform, wel Vlaams van inhoud: de FAQ en de tekst op `/kantoor` en de homepage met "De commissie ligt in Vlaanderen meestal tussen 2% en 4%", en de link naar `/kosten-vastgoedmakelaar` onder de inzichten op elk profiel.

## Publicatie en QA

- Alleen deze wijzigingen publiceren, via een worktree op `main` (gelijk aan `origin/main`, 8f54acc). De projectmap staat op `codex/kennisbank-jakency-methodiek` met een niet-gecommitte SBC Vastgoed-wijziging; die zit niet in deze commit.
- `node --test scripts/check-kantoor-inzichten.mjs`, met een nieuwe test voor de vier vestigingen (adres, provincie, Place ID of bewust geen, bronnen, geen marketingcijfers, vergelijking binnen Henegouwen, FAQ-regel) en aangepaste asserties voor Waregem (geen 8793, geen verhuis).
- ESLint, `git diff --check` en `npm run build`.

### Lokale resultaten

- `node --test scripts/check-kantoor-inzichten.mjs`: 18/18 geslaagd.
- `npm run lint` en `git diff --check` zonder fouten; geen em- of en-dashes in de nieuwe gegevens of in deze notitie.
- Productiebuild geslaagd op de basis van `origin/main` (8f54acc), inclusief TypeScript en contentcontrole van 167 pagina's (284 statische pagina's).
- Build-uitvoer: de sitemap bevat de vier nieuwe profiel-URL's. De profielkop toont "Vastgoedkantoor in Lessen (Lessines), Henegouwen", idem voor Doornik (Tournai) en Moeskroen (Mouscron), en "Nieuwpoort, West-Vlaanderen"; `addressRegion` in de JSON-LD is telkens dezelfde provincie. Het provinciefilter op `/kantoor` toont Henegouwen; het overzicht telt 60 profielen in 6 provincies. De Waalse profielen bevatten de Vlaamse commissievork niet, Nieuwpoort en Waregem wel. Het Waregemse profiel bevat geen "8793" en geen "verhuis" meer.
- `qa-kantoor-profielen.mjs` is niet gedraaid: die faalt voor elk profiel op de reviews zolang de Places-sleutel verlopen is, en Nieuwpoort heeft bewust geen Place ID.

### Status

Lokaal gecommit op `main`, niet gepusht. Na akkoord van de operator volgen de push, de livecontrole en een aanvulling van dit document.

## Bijsturing 19 oktober 2026 (operator)

- Nieuwpoort is voorlopig niet gepubliceerd: geen Google-bedrijfsprofiel, geen eigen vestigingspagina, en het
  persbericht van 6 augustus zegt alleen dat het kantoor "dit jaar" opent. Toevoegen zodra Sophie Beguin bevestigt
  dat het open is. Gegevens om dan te hergebruiken: Lombardsijdestraat 1, 8620 Nieuwpoort, telefoon 0486 60 66 00.
- De zin boven het kantorenblok op de homepage is "Erkende kantoren op ons platform." geworden (was: "uit heel
  Vlaanderen"), omdat er nu ook Henegouwse vestigingen op staan. De andere teksten die de scope "Vlaanderen en
  Brussel" noemen, blijven voorlopig staan; beslissing van de operator volgt.
