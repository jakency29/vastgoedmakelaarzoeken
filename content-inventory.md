# Content-inventaris vastgoedmakelaarzoeken.be

Bron: page-sitemap.xml (142 URL's), opgehaald 2026-07-06. local-sitemap.xml bevat enkel
`locations.kml` (Google Maps), geen extra pagina's. robots.txt disallowt enkel /wp-admin/.

## Core / monetisatie (leadgen — EERST afwerken)
- `/` — homepage + leadformulier
- `/waarde-woning-berekenen/` — waardebepaling (lead-intent hoog)
- `/huis-laten-schatten/` — schatting (lead-intent hoog)
- `/kosten-vastgoedmakelaar/` — makelaarskosten
- `/huis-verkopen-met-makelaar/` — makelaar inschakelen (lead-intent)

## Silo: asbestattest (hub /asbestattest/ + kinderen)
Hub: `/asbestattest/`
Informationeel:
- /asbestattest/wie/, /vanaf-wanneer/, /geen/, /bij-erfenis/, /hoe-lang-moet-je-wachten/
- /bij-verhuur/, /wie-betaalt/, /goedkoop/, /uitstel/, /renovatie/, /asbestsanering/
- /notaris/, /wetgeving/, /asbestkeuring/, /bij-schenking/, /geldigheid/, /garage/
- /verplicht/, /appartement/, /asbestinventaris/, /asbestinventaris/verplicht/
- /bij-verkoop/, /laten-opmaken/, /compromis/
Stad-pagina's (lokaal): /brugge/, /lier/, /lokeren/, /leuven/, /sint-niklaas/, /dendermonde/,
  /herentals/, /hasselt/, /oudenaarde/, /turnhout/, /gent/, /antwerpen/
Provincie-pagina's: /limburg/, /vlaams-brabant/, /west-vlaanderen/, /oost-vlaanderen/

## Silo: huis-verkopen-verplichtingen (hub + kinderen)
Hub: `/huis-verkopen-verplichtingen/`
- /asbestattest/ , /asbestattest/prijs/ , /asbestattest/gemeenschappelijke-delen/
- /epc/ , /elektriciteitskeuring/ , /elektriciteitskeuring/prijs/
- /bodemattest/ , /mazouttank/ , /asbest-verwijderen/
LET OP: asbestattest bestaat in TWEE silo's (/asbestattest/... en /huis-verkopen-verplichtingen/asbestattest/...).
Bij herbouw consolideren of canonicals/redirects zorgvuldig zetten.

## Silo: registratierechten
Hub: `/registratierechten/` -> /eerste-woning/ , /tweede-woning/

## Silo: notariskosten
Hub: `/notariskosten-verkoop-huis/` -> /wie-betaald/ (LET OP typfout "betaald" ipv "betaalt")

## Silo: vastgoedkantoren (agent-office pagina's -> relevant fase 2)
- /vastgoedkantoren/limburg/ , /vastgoedkantoren/vlaams-brabant/
- /agencies/ (waarschijnlijk WP-plugin directory-pagina)

## Losse informatieve artikelen (outer-sectie, linken terug naar core)
Verkoop/koop-proces: /compromis-verkoop-huis/, /akte-verlijden/, /verkoop-uit-de-hand/,
  /openbare-verkoop-huis/, /bieden-op-een-huis/, /bod-intrekken-huis/, /optie-nemen-op-huis/,
  /opschortende-voorwaarde/, /minimum-tijd-tussen-compromis-en-akte/, /huis-gekocht-wat-nu/,
  /huis-zelf-verkopen-documenten/, /huis-verkopen-na-1-jaar/, /huis-verkopen-nieuw-kopen/,
  /huis-verkopen-boven-geschatte-waarde/, /huis-verkopen-met-meerdere-erfgenamen/,
  /kosten-verkoop-huis/, /verborgen-gebreken-huis/
Financiering/lening: /hoeveel-spaargeld-voor-een-huis/, /eigen-inbreng-lening-bij-aankoop-woning/,
  /huis-kopen-zonder-lening/, /heropname-lening/, /lening-overzetten-op-ander-huis/,
  /hypothecair-mandaat/, /hypothecaire-volmacht/, /schuldsaldoverzekering-prijs/,
  /leeftijdsgrens-overbruggingskrediet/, /renteloos-renovatiekrediet/
Belasting/erf/schenking: /registratierechten/, /meerwaardebelasting-vastgoed/, /miserietaks-2/,
  /successierechten-vermijden/, /belasting-tweede-verblijf-vermijden/, /huis-schenken-aan-kinderen/,
  /schenking-onroerend-goed/, /erfenis-huis-ouders/, /ouderlijk-huis-verkopen-voor-overlijden/,
  /kadastraal-inkomen-appartement/, /kadastraal-inkomen-berekenen-na-verbouwing/
Huren/verhuren: /huurprijs-berekenen/, /garage-verhuren/, /kamer-verhuren-in-eigen-huis/,
  /onderverhuren/, /huurcontract-niet-geregistreerd/, /huurcontract-1-jaar-opzeggen-door-verhuurder/,
  /welke-verzekeringen-zijn-verplicht-als-huurder/, /gemeenschappelijke-kosten-appartement-huurder/,
  /blokpolis-appartement/, /huis-kopen-om-te-verhuren/
Bouwen/verbouwen/EPC: /bouwen-of-verbouwen/, /modulair-bouwen/, /staalbouw-woning/,
  /sleutel-op-de-deur-woning/, /wetgeving-containerwoning/, /prijs-bouwgrond-berekenen/,
  /hoeveel-kost-een-totaalrenovatie/, /renovatieplicht-bestaande-woning/, /renovatieplicht-2030/,
  /verbouwen-zonder-vergunning/, /tuinhuis-zonder-vergunning/, /bestaande-vloer-isoleren/,
  /epc-waarde-verlagen/, /bewoonbare-oppervlakte-berekenen/, /nieuwbouw-kopen-waar-op-letten/,
  /co2-meter-verplicht-in-huis/, /verwarmen-met-airco-2/, /zonevreemde-woning-kopen/,
  /woning-kopen-met-afgekeurde-elektriciteit/
Juridisch/eigendom: /erfpacht/, /verschil-erfpacht-en-opstal-2/, /voorkooprecht-betekenis/,
  /overhangende-takken-buur/, /hoogte-brievenbus/, /gras-afrijden-op-zondag/, /kangoeroewoning/,
  /lijfrente-huis-kopen/, /huurkoop-woning/, /alleenstaande-huis-kopen/, /duurste-gemeente-belgie/,
  /wallonie/

## Utility (niet in page-sitemap, wel bestaand)
- /contact/ , /kantoor/

## Aandachtspunten migratie
- Slugs met suffix `-2` (miserietaks-2, verschil-erfpacht-en-opstal-2, verwarmen-met-airco-2)
  zijn WP-duplicaatslugs. Bij herbouw schone slug + 301 van oude.
- Typfout-slug /wie-betaald/ -> overweeg /wie-betaalt/ met 301.
- Dubbele asbestattest-silo consolideren.
- Alle 142 oude URL's moeten 301-redirect krijgen naar de nieuwe structuur bij launch.
