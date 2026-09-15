# Sensimmo Genk toegevoegd

## Scope

Op verzoek van de gebruiker is het hoofdkantoor op Berglaan 40, 3600 Genk als aparte vestiging toegevoegd op `/kantoor/sensimmo-genk`. De kwalificatie hoofdkantoor komt uit de door de gebruiker aangeleverde e-mail van Sensimmo. Er is geen e-mail verstuurd.

Topical role: lokaal kantoorprofiel. Page type: bestaande RealEstateAgent-template. Centrale entiteit: Sensimmo Genk. Zoekintentie: dit kantoor identificeren, diensten en reviews bekijken en een aanvraag doen. Gerelateerde entiteiten: Sensimmo, Mustafa Sak, Genk en de afzonderlijke vestiging Maasmechelen. Geen nieuwe layout of algemene SEO-claims.

## Publieke bronnen

Gecontroleerd op 15 september 2026:

- [Officiële contactpagina](https://www.sensimmo.be/contact): adres, telefoon, algemeen e-mailadres, BIV-vermelding 505902 op naam van Mustafa Sak en openingsuren. Het nummer is gecontroleerd op de kantoorwebsite, niet als nieuwe onafhankelijke BIV-registercontrole.
- [Officiële website](https://www.sensimmo.be/nl-be): verkoop, verhuur, gratis waardebepaling, projecten en projectadvies.
- Google Places API: `ChIJV4WOkyzZwEcRFmVp2fxiCaM`, Sensimmo Vastgoed, Berglaan 40, 3600 Genk. Op controledatum 4,6/5 en 92 reviews, met vijf beschikbare reviewteksten. De bestaande component toont maximaal vier door Google aangeleverde reviews en een link naar alle reviews. Geen handmatige selectie op score, geen gekopieerde reviews van Maasmechelen en geen hardcoded score.

## Logo

Het oorspronkelijke logopad van Maasmechelen blijkt een egaal vlak. Voor Genk is daarom het SVG-pad uit de `.logo`-regel van de [officiële stylesheet](https://staticnew.skarabee.net/Views/Sites/Sensimmo_RP5/Styles/styles.min.css?marker3=20230510) gebruikt. Het witte beeldmerk staat op de bijbehorende officiële achtergrondkleur `#856e50`, zodat het op de witte profielpagina zichtbaar blijft. De originele logo-geometrie is ongewijzigd. Lokaal bestand: `public/afbeeldingen/kantoren/sensimmo.svg`. De bestaande Maasmechelen-vermelding is niet aangepast.

## Onderscheid en beperkingen

Het profiel bevat twee brononderbouwde aandachtspunten met een eigen raadpleegdatum: de ontvangst in Genk en het verschil tussen waardebepaling en projectadvies. Het adres staat zichtbaar in de intro. Het algemene kantooradres voor e-mail is `info@sensimmo.be`; het persoonlijke e-mailadres uit de aangeleverde e-mail wordt niet nodig geacht voor de openbare vermelding. De bestaande contactformulierroute blijft behouden.

De bestaande Google-koppeling vernieuwt reviews via de cache-instellingen van de website. Een rating is geen eigen kwaliteitsbeoordeling. Openingstijden kunnen veranderen; de bronlink blijft zichtbaar. Geen gemeten SEO-winst, unieke SERP-positie of rendement geclaimd.

## Verificatie

- `node --test scripts/check-kantoor-inzichten.mjs`
- `npx eslint src/lib/kantoren.ts src/lib/kantoor-inzichten.ts scripts/check-kantoor-inzichten.mjs scripts/qa-sensimmo-genk.mjs`
- `npm run build`
- `node scripts/qa-sensimmo-genk.mjs <basis-url>`: profiel, zichtbaar logo, vestigingsadres, Google-reviews, bronnen, schema, formulier, kantooroverzicht en sitemap.
- Visuele controle van het gepubliceerde logo en profiel.

Publiceer alleen deze vestiging, de inzichten, het logo en bijbehorende tests/documentatie. Bestaande lokale wijzigingen voor SBC Vastgoed en het extra woningrecord blijven buiten deze publicatie.
