# Adrescheck: proef op drie woningpagina's

## Doel en scope

Bezoekers die een bezichtiging overwegen helpen om gerichte vragen te stellen.
Primaire entiteit: de bestaande woning met exact adres en feed-id. Gerelateerde
entiteiten: perceel, gebouw, P-score, G-score, internetaansluiting, busnummer,
We Invest, BIPT en Coördinatiecommissie Integraal Waterbeleid (CIW).

Topical role: beslissingsondersteuning binnen een bestaande woningdetailpagina.
Page type: woningadvertentie, geen nieuwe landingspagina of aparte adres-URL.
Intent: wat moet ik voor dit specifieke pand nagaan voor bezoek of bod?
Primaire actie blijft contact met de bestaande makelaar. Geen extra formulier.

Pilot:

| ID | Adres | Vermelde P / G |
| --- | --- | --- |
| 170319 | Ulfortstraat 73, 3581 Beringen | B / A |
| 170252 | Jeugdstraat 18, 3583 Beringen | D / D |
| 168856 | Guido Gezellelaan 131/1, 3550 Heusden-Zolder | A / A |

Alle andere panden blijven ongewijzigd. Matching gebeurt op id, adres, postcode en
gemeente zodat een later gewijzigd adres niet stilzwijgend oud onderzoek krijgt.
De bestaande niet-gecommitteerde woning- en kantoorwijzigingen horen niet bij deze proef.

## Bronnen en beperkingen

De drie publieke We Invest-fiches zijn op 15 september 2026 gelezen. Dat is een
raadpleegdatum, geen rapportdatum en geen datum van een plaatsbezoek.

- https://weinvest.be/nl-BE/property/for-sale/beringen/house/170319
  Vermeldt B/A, twee overstromingsrapporten voor 1247H en 1247K, weiland en 40 panelen.
- https://weinvest.be/nl-BE/property/for-sale/beringen-paal/house/170252
  Vermeldt D/D, kelder op straatniveau, dak/verwarming/panelen en nog af te werken sanitair.
  De fiche vermeldt ook 'geen overstromingsgebied'. Dit niet gelijkstellen aan geen
  overstromingskans; de scores expliciet tonen met uitleg en rapportverwijzing.
  De bron vermeldt inmiddels EPC B, 194 kWh/m2 per jaar, certificaat
  20260909-0003940575-RES-2. De oude C/246-vermelding is voor dit pand consequent
  bijgewerkt in de vijf betrokken JSON-velden (label, verbruik, code, troef en tekst).
- https://weinvest.be/nl-BE/property/for-sale/heusden-zolder/apartment/168856
  Vermeldt A/A, EPC F, niet in het EPC opgenomen raam- en deurwerken, tuingebruiksrecht
  en doorgang voor de buur. Geen nieuw EPC-label afleiden uit de werken.
- https://www.integraalwaterbeleid.be/nl/nieuws/vernieuwde-watertoets-en-informatieplicht
  Primaire uitleg van A/B/C/D en afzonderlijke perceel- en gebouwscores.
- https://waterinfo.vlaanderen.be/informatieplicht
  Publieke route om het perceel en het overstromingsrapport te controleren.

Onderliggende individuele waterdocumenten zijn niet afzonderlijk geverifieerd.
Dat staat zichtbaar bij de scores. Geen claim dat de overheid deze proef heeft
gevalideerd. Geen kopieën van persoonlijke attesten of eigenaarsgegevens opslaan.

### Internet: link in plaats van herpublicatie

https://www.bipt-data.be/nl/projects/atlas/landline is via de publieke UI onderzocht.
De gebruiksvoorwaarden op https://www.bipt-data.be/nl/terms bevatten in artikel 2
een beperking op commercieel gebruik. Zonder afzonderlijk bevestigde hergebruiklicentie
worden geen adresresultaten, providers, snelheden, kaarten of screenshots gepubliceerd.
Geen reverse engineering of koppeling aan een ongedocumenteerde API.

De bezoeker kan het adres kopiëren en de atlas zelf openen. Het exacte huisnummer
moet op de kaart gekozen worden. Voor het appartement moet bus 1 bij de provider
bevestigd worden. Niet gevonden of niet bevestigd is niet hetzelfde als niet beschikbaar.
De link vult geen adres in en deelt bij paginalaad geen gegevens met BIPT.

### Officieel beeldmerk bij score D

https://www.integraalwaterbeleid.be/nl/beleidsinstrumenten/informatieplicht/symbool-overstromingsgevoelig-gebied
stelt de symbolen beschikbaar voor publiciteit met score D. Het gebouwsymbool is
ongewijzigd gedownload uit:
https://www.integraalwaterbeleid.be/nl/beleidsinstrumenten/informatieplicht/symbool-overstromingsgevoelig-gebied/overstroming-symbool.jpg/@@download/file/huisjeTekengebied%201.png

## Component en ontwerp

Positie: na de beschrijving en vóór de indeling. Bestaande navy/amber-kleuren,
leesbare kaarten, één H2 in vraagvorm, H3-subvragen, losse definitielijst voor P/G.
Op mobiel stapelen de scorekaarten. Scores bevatten altijd tekst, niet alleen kleur.
De kopieerknop heeft een focusstijl, 44px tikhoogte en live-statusmelding; bij een
clipboardfout blijft handmatig kopiëren mogelijk. Broninhoud is servergerenderd,
ook zonder JavaScript leesbaar. Alleen de kopieerknop is een clientcomponent.

Informatievoordeel: adresgebonden synthese met twee concrete bezoekvragen, aparte
scores en expliciete onbekenden. Geen gemeten claim van uniciteit tegenover SERP-
concurrenten. Geen rating, kwaliteitsrangschikking of garantie op SEO-resultaten.

## Onderhoud, test en terugdraaien

Eigenaar: redactie Vastgoedmakelaar Zoeken. Opnieuw controleren bij wijzigingen in
de woningfiche en voor uitbreiding van de proef. Datum alleen aanpassen na hercontrole.
Actuele providerbeschikbaarheid altijd afzonderlijk laten bevestigen.

Controles:

```text
node --test scripts/check-woning-adreschecks.mjs
node scripts/qa-woning-adreschecks.mjs http://127.0.0.1:3002
node scripts/qa-woning-adreschecks.mjs https://www.vastgoedmakelaarzoeken.com
npm run build
```

Browseracceptatie: desktop en mobiel, geen horizontale overflow, bronbestemmingen,
kopiëren met toetsenbord, begrijpelijke statusmelding, bestaande contactlinks en
officieel D-symbool zichtbaar. Geen contactbericht versturen tijdens testen.

Uitgevoerde QA: productiebuild en zeven unitcontroles geslaagd; drie proefpagina's
en één controlepagina slagen voor HTML-controles. Desktop en 390px mobiel visueel
gecontroleerd. Knop reageert op Enter en klik met de succesmelding. Op 320px past
het nieuwe blok binnen het scherm, maar de bestaande, ongewijzigde header loopt
circa 20px uit door logo en menuknop. Dit bestaande headerpunt valt buiten de proef.
De tijdelijke browser-viewport is na de controles hersteld.

Pilotbeoordeling na voldoende bezoek: begrijpen bezoekers het onderscheid P/G,
vinden zij de officiële check en leveren de vragen bruikbare contactgesprekken op?
Er is nu geen apart meetinstrument voor tool- of contactkliks toegevoegd. Geen
conversieverbetering claimen zonder meting; uitbreiding is een nieuwe beslissing.

Rollback: revert uitsluitend de commit voor deze proef, of verwijder de drie records
uit woningAdreschecks om de bestaande weergave terug te krijgen. Geen feed- of
databasewijziging nodig.
