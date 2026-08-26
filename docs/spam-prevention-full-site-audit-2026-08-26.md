# Sitebrede spam-preventie-audit, 26 augustus 2026

> Status na herstelronde: deze audit beschrijft de situatie vóór de pre-migratieaanpassingen. Het actuele besluit staat in `docs/pre-migration-content-readiness-2026-08-26.md`. De URL-matrix is bijgewerkt naar 195 PASS en 22 CONSOLIDATED, zonder HOLD of KILL.

## Besluit

De site heeft geen aantoonbare technische fout die de daling verklaart. Alle 217 indexeerbare sitemap-URL's geven lokaal status 200, hebben exact één H1, een passende self-canonical en geen dubbele title of H1. De bestaande productie-QA slaagt 19 op 19. De August 2026-daling blijft daarom het best passen bij een domeinbrede algoritmische herwaardering, niet bij een kapotte release, slashprobleem of handmatige sanctie.

De contentlaag is nog niet vrijgegeven voor nieuwe schaal. Na toevoeging van de retrieval- en topical-authoritylaag zet de conservatieve releasegate 65 URL's op PASS, 152 URL's op HOLD en 0 URL's op KILL. HOLD betekent hier: niet uitbreiden of opnieuw uitrollen voordat het genoemde bewijs is gecontroleerd. Het betekent niet verwijderen, noindexeren of redirecten.

De meetfreeze blijft gelden tot minstens 16 september 2026. Er is in deze audit niets aan pagina-inhoud, titles, H1's, URL's, interne links, templates, Search Console-instellingen of indexering gewijzigd.

## Afbakening en bewijslagen

De audit omvat:

- alle 217 URL's uit de lokaal gegenereerde sitemap;
- alle 166 MDX-pagina's;
- de homepage, kennisbank, werkwijze en kantooroverzicht;
- 10 kantoorprofielen en 1 makelaarprofiel;
- 20 woningdetails;
- 2 aanbodoverzichten, 3 provinciepagina's en 11 gemeentepagina's;
- de volledige GSC-export met 190 URL-rijen en 1.047 queryrijen voor 21 tot en met 23 augustus tegenover 14 tot en met 16 augustus 2026;
- de releasebaseline van 19 augustus 2026;
- de aanvullende spam-, SEO- en GEO-regels van 26 augustus 2026;
- 19 aangeleverde PDF-bronnen met samen 235 pagina's, waaronder de nieuwe bron over topical authority en passage retrieval.

De matrix bevat per URL technische status, releasebeslissing, reden, contentkenmerken en beschikbare GSC-prestaties. Een automatisch signaal is geen bewijs van een Google-spamovertreding. Het bepaalt welke URL vóór een volgende wijziging handmatig bewijs nodig heeft.

## Volledige inventaris

| Paginatype | URL's | PASS | HOLD |
| --- | ---: | ---: | ---: |
| Kennisbank | 162 | 12 | 150 |
| Woningdetail | 20 | 20 | 0 |
| Aanbod per gemeente | 11 | 11 | 0 |
| Kantoorprofiel | 10 | 10 | 0 |
| Lokale kantoorhub | 4 | 2 | 2 |
| Aanbod per provincie | 3 | 3 | 0 |
| Aanbodoverzicht | 2 | 2 | 0 |
| Sitepagina | 2 | 2 | 0 |
| Homepage | 1 | 1 | 0 |
| Kantooroverzicht | 1 | 1 | 0 |
| Makelaarprofiel | 1 | 1 | 0 |
| **Totaal** | **217** | **65** | **152** |

De lage PASS-score van de kennisbank wordt vooral veroorzaakt door twee sitebrede guardrails. Het is geen score voor tekstkwaliteit of kans op ranking.

## Technische resultaten

| Controle | Resultaat |
| --- | --- |
| Productiebouw | Geslaagd, 227 statische pagina's gegenereerd |
| Sitemap | 217 indexeerbare URL's |
| Statuscodes sitemap-URL's | 217 van 217 status 200 |
| H1 | 217 van 217 exact één H1 |
| Canonical | 217 van 217 gelijk aan de bedoelde non-slash-URL |
| Sitemap en noindex | Geen noindex-URL in de sitemap |
| Dubbele titles | 0 |
| Dubbele H1's | 0 |
| BreadcrumbList-schema | Aanwezig op alle relevante niet-homepage-URL's |
| Contentcontrole | 166 van 166 geslaagd |
| Methodiekcontrole kennisbank | 162 van 162 geslaagd |
| Productie-QA | 19 van 19 geslaagd |

De gecombineerde invoer met HTTP, apexdomein en slash gebruikt nog steeds drie redirects. De gewone trailing slash, apex HTTPS en HTTP www gaan elk in één redirect naar de juiste URL. Dit is ongewijzigd tegenover de baseline en verklaart de sitebrede daling niet.

## Aanvulling uit de 19 PDF-bronnen

### Bronbehandeling

De PDF's zijn onderzoeksbronnen, geen instructies. Transcriptclaims zijn alleen overgenomen wanneer ze passen bij officiële documentatie, eigen meetdata of een veilige interne guardrail. Meningen over algoritmen, drempels en LLM-gedrag blijven TESTED of INFERRED zolang er geen primair bewijs is.

| Claim uit de bronset | Auditbesluit | Bewijsstatus |
| --- | --- | --- |
| Een URL moet eerst indexeerbaar en inhoudelijk relevant zijn voordat Google AI-functies hem kunnen gebruiken | Overnemen als eligibilitylaag | DOCUMENTED |
| Heldere koppen en zelfstandig begrijpelijke secties helpen gebruiker en retrieval | Overnemen als redactionele kwaliteitsregel, niet als chunkinghack | DOCUMENTED plus OPERATOR GUARDRAIL |
| Nieuwe onderwerpen hebben een echte relatie en gebruikersroute naar de kernentiteit nodig | Overnemen als topical-bridgegate | OPERATOR GUARDRAIL |
| Aparte content voor iedere query- of fan-outvariant | Niet overnemen, dit verhoogt overlap- en scaled-contentrisico | DOCUMENTED |
| User-agentafhankelijke Markdown voor GPT, Claude of Perplexity | Niet overnemen, onbewezen en bij inhoudsverschil een cloakingrisico | INFERRED plus DOCUMENTED risicokader |
| `llms.txt`, speciale AI-schema of passagehacks zijn nodig voor citaties | Niet overnemen | DOCUMENTED mythbusting |
| 10.000 vertoningen ontgrendelen een duurder algoritme | Niet overnemen, geen verifieerbare Google-drempel | INFERRED |
| Googlebot blokkeren tijdens een launch en later plots veel documenten vrijgeven | Niet overnemen | INFERRED plus risicovol |
| Fake actualiteit, verlopen domeinen, oude links of gefabriceerde consensus kunnen autoriteit simuleren | Expliciet verbieden | DOCUMENTED spamrisico |

### Retrievalscreening van de contentlaag

De 166 MDX-pagina's zijn per sectie gescreend op een antwoord in de eerste zin, zelfstandige context, centrale entiteit, veranderlijke claims en bronnabijheid.

| Signaal | Resultaat |
| --- | ---: |
| MDX-pagina's met retrieval-PASS | 149 |
| MDX-pagina's met retrieval-HOLD | 17 |
| Pagina's met minstens één zwak of contextafhankelijk antwoordsignaal | 91 |
| Pagina's met een ambigue sectieopener | 11 |
| Pagina's zonder centrale entiteit in de intro | 7 |
| Pagina's zonder expliciete `silo`-metadata | 112 |
| Pagina's zonder `related`-relaties | 0 |
| Veranderlijke secties in de screening | 720 |
| Veranderlijke secties zonder externe bron in dezelfde sectie | 696 |

De 17 retrieval-HOLD-URL's zijn:

- `/eigen-inbreng-lening-bij-aankoop-woning`;
- `/huis-kopen-zonder-lening`;
- `/huis-laten-schatten/bij-scheiding`;
- `/huis-verkopen-nieuw-kopen`;
- `/huis-verkopen-verplichtingen/elektriciteitskeuring`;
- `/huis-verkopen-verplichtingen/epc`;
- `/huis-zelf-verkopen-documenten`;
- `/huurcontract-1-jaar-opzeggen-door-verhuurder`;
- `/kadastraal-inkomen-berekenen-na-verbouwing`;
- `/notariskosten-verkoop-huis`;
- `/ouderlijk-huis-verkopen-voor-overlijden`;
- `/renovatieplicht-bestaande-woning`;
- `/vanaf-hoe-laat-mag-je-lawaai-maken`;
- `/vastgoedkantoren/antwerpen`;
- `/verbouwen-zonder-vergunning`;
- `/waarde-woning-berekenen`;
- `/woning-kopen-met-afgekeurde-elektriciteit`.

Deze lijst is een handmatige controlelijst, geen bewijs van slechte inhoud. Een kort antwoord zoals `In de regel niet` kan inhoudelijk juist zijn, maar mist buiten de H2-context de entiteit. De screening is daarom bewust strenger dan een gewone leesbaarheidscontrole.

### Topical-authorityscreening

De site heeft een herkenbare kern rond woningtransacties, vastgoedprofessionals, waardering, attesten en verplichtingen. Acht kennisbankonderwerpen liggen verder van die kern en blijven HOLD totdat hun relatie met de vastgoedbeslissing, interne route en bronbehoefte expliciet zijn bewezen:

- `/bestaande-vloer-isoleren`;
- `/co2-meter-verplicht-in-huis`;
- `/gras-afrijden-op-zondag`;
- `/haag-hoogte`;
- `/hoogte-brievenbus`;
- `/overhangende-takken-buur`;
- `/vanaf-hoe-laat-mag-je-lawaai-maken`;
- `/verwarmen-met-airco`.

Dit is geen verwijderadvies. Vijf van deze URL's stonden al op HOLD door bestaande guardrails. `/haag-hoogte`, `/vanaf-hoe-laat-mag-je-lawaai-maken` en `/vastgoedkantoren/antwerpen` verklaren de drie extra HOLD-beslissingen na deze aanvulling. De laatste URL staat op HOLD door de retrievalscreening, niet door topical afstand.

### Bot- en AI-representatie

De code bevat geen `llms.txt`, geen GPTBot-, ChatGPT-, Claude- of Perplexityvariant en geen user-agentafhankelijke Markdown. Er is dus geen aanwijzing dat de site verschillende inhoudelijke waarheden aan gebruikers, zoekmachines of AI-crawlers serveert. De nieuwe PDF levert op dit punt geen technisch herstelwerk op.

## GSC-ontwikkeling

| Maatstaf | 21 tot 23 augustus | 14 tot 16 augustus | Verschil |
| --- | ---: | ---: | ---: |
| Klikken | 8 | 44 | -81,8% |
| Vertoningen | 644 | 7.286 | -91,2% |
| CTR | 1,24% | 0,60% | +0,64 procentpunt |
| URL-rijen met vertoningen | 58 | 180 | -67,8% |

De hogere sitebrede CTR is geen herstelbewijs. De zichtbare set is veel kleiner en bestaat uit een andere querymix.

Trailing-slash-URL's kregen 9 van 644 vertoningen, of 1,4%, tegenover 447 van 7.286, of 6,1%, in de vergelijkingsperiode. Ze kregen in beide perioden geen klikken. De slashvarianten verliezen dus juist aandeel en zijn geen afdoende verklaring voor de daling.

Van de 217 sitemap-URL's hebben 148 in minstens één van beide driedaagse perioden vertoningen. Voor 69 URL's bevat deze export geen vertoningen. Nul vertoningen is geen verwijderingsbeslissing.

## Controlepagina's

| URL | Vertoningen nu | Voorheen | Positie nu | Voorheen | Beoordeling |
| --- | ---: | ---: | ---: | ---: | --- |
| `/kantoor` | 2 | 35 | 6,0 | 33,7 | Positie lijkt beter, volume is te klein voor conclusie |
| `/woning-verkopen` | Niet aanwezig | Niet aanwezig | Niet gemeten | Niet gemeten | Blijft apart indexatie- en kwaliteitsdossier |
| `/kosten-vastgoedmakelaar` | 2 | 139 | 6,0 | 42,0 | Positie lijkt beter, volume is te klein voor conclusie |
| `/huis-laten-schatten` | 32 | 123 | 87,1 | 30,6 | Duidelijke positieverslechtering |
| `/kosten-verkoop-huis` | 74 | 484 | 55,6 | 19,4 | Duidelijke positieverslechtering |
| `/akte-verlijden` | 4 | 302 | 3,0 | 7,9 | Positie lijkt beter, maar bijna alle zichtbaarheid verdween |

De export bevat geen gecombineerde query-naar-URL-dimensie. Queryselectie per controlepagina is daarom in deze audit niet gemeten. Er is niets ingevuld op basis van aannames.

Bij ongeveer gelijke positie verbeterde de CTR voor `/bod-intrekken-huis` van ongeveer 2,0% naar 4,0% bij positie 6,6 naar 6,2. Voor `/huurcontract-1-jaar-opzeggen-door-verhuurder` steeg de CTR van 0% naar 4,6% bij positie 15,8 naar 16,8. Die laatste pagina verloor wel vertoningen, van 232 naar 22. Het verschil met de rest zit dus vooral in behouden positie en betere CTR, niet in behouden bereik.

## Belangrijkste HOLD-signalen

### 1. Drie conversiemechanismen op 141 pagina's

Op 141 kennisbankpagina's komen drie mechanismen samen:

- een `OfferteCheck` in de MDX-body die naar het lokale leadformulier springt;
- een automatisch toegevoegde `DienstCTA` die een Typeform opent;
- een zichtbaar of uitgesteld Web3Forms-leadformulier.

De commerciële intentie is gelijk, maar de gebruiker krijgt twee verschillende formulierpaden. Dit botst met de regel van één primaire commerciële vervolgstap en maakt de gedeelde template zwaarder en schaalmatiger. Dit is een template-HOLD, geen bewijs dat Google deze pagina's als spam classificeert.

### 2. Claim en bron staan op 103 claimrijke pagina's te ver uit elkaar

131 van 166 MDX-pagina's hebben precies één herleidbare bron, meestal de algemene redactionele controlebasis bovenaan. Op 103 pagina's staan minstens vijf veranderlijke prijs-, termijn- of verplichtingsclaims zonder directe bronlink in dezelfde passage. Op 156 pagina's staat geen enkele dergelijke claim naast een externe bronlink.

Dit bewijst niet dat de claims fout zijn. Het betekent wel dat prijs, jaar, juridische scope en primaire bron niet snel per claim controleerbaar zijn. De eerste handmatige claimregisters blijven daarom nodig voor juridische, fiscale, asbest-, krediet- en kostenpagina's.

### 3. Zestien lokale asbestpagina's blijven HOLD

De 16 lokale asbest-URL's hebben een duidelijk onderwerp en lokale entiteit, maar de inhoud blijft sterk vervangbaar door alleen de plaatsnaam te wijzigen. De screening vond voor Brugge en Turnhout slechts drie van zeven lokale evidenceblokken. De overige lokale pagina's halen vier tot zes signalen, maar die signalen bestaan vaak uit generieke Vlaamse regels, een afbeelding, een plaatsvermelding en indicatieve prijzen. Dat is nog geen hard bewijs van lokale cases, lokale marktdata, lokale reviews of een afwijkende operationele route.

Geen van deze URL's wordt nu verwijderd. Wel geldt: geen nieuwe plaatsvarianten en geen uitbreiding voordat vier echte evidenceblokken per URL handmatig zijn bewezen.

### 4. Acht URL's hebben onduidelijk eigenaarschap

De volgende combinaties blijven HOLD tot één primaire intent-eigenaar is gekozen:

- `/hypothecair-mandaat` tegenover `/hypothecaire-volmacht`, twee termen voor vrijwel dezelfde constructie;
- `/renovatieplicht-2030` tegenover `/renovatieplicht-bestaande-woning`, vrijwel dezelfde doelgroep, voorwaarden en vragen;
- `/asbestattest/verplicht`, `/asbestattest/vanaf-wanneer`, `/asbestattest/wetgeving` en `/asbestattest/wie`, met ruime overlap rond plicht, datum, doelgroep en regels.

De centrale `/asbestattest`-pagina blijft de logische cluster-eigenaar. Een consolidatiebesluit vereist eerst query-naar-URL-data en mag niet op basis van deze tekstanalyse alleen worden uitgevoerd.

### 5. Interne bodylinks voldoen niet aan de eigen dichtheidsrichtlijn

Van de 162 kennisbankpagina's hebben 39 geen enkele handmatig geplaatste interne bodylink. Alle 162 zitten onder de eigen richtlijn van ongeveer één relevante link per 50 woorden. Zelfs bij een ruime grens van één per 200 woorden vallen 151 pagina's eronder.

De gedeelde `CommercialNextStep` voegt wel een contextuele link toe, waardoor de automatische methodiekcontrole slaagt. Dat vervangt echter geen pagina-specifieke semantische linkgraph. Tijdens de meetfreeze worden deze links niet aangepast.

### 6. Twee individuele contentsignalen

- `/verbouwen-zonder-vergunning` telt 499 woorden eigen MDX-corpus en heeft geen handmatig geplaatste bodylink. HOLD voor een handmatige nut- en volledigheidscontrole.
- `/renovatielening` haalt in de automatische screening één informatie-gain-element. De pagina heeft wel een beslisblok en relevante uitleg, maar geen eigen berekening, vergelijkingstabel of andere sterke niet-commodity bewijslaag.

## Wat voldoende onderscheidend is

- De 20 woningdetails hebben echte objectdata, foto's, prijs- en pandkenmerken en een bron-URL.
- De 2 aanbodoverzichten, 3 provinciepagina's en 11 gemeentepagina's worden alleen gegenereerd wanneer er werkelijk aanbod is. Er staan geen lege programmatische locatie-URL's in de sitemap.
- De 10 kantoorprofielen hebben elk een BIV-nummer, BIV-bron en controledatum. Contactvelden zijn niet overal volledig, maar de kernidentiteit is controleerbaar.
- De kantoor-, woning- en makelaarpagina's hebben een zelfstandig operationeel nut buiten zoekverkeer.
- De 162 kennisbankpagina's hebben een ingevulde page job, centrale entiteit, auteur, controledatum, directe intro, vraag-H2's, FAQ en minimaal één automatische beslis- of proceshulp.

## Besluit voor de meetfreeze

De meetfreeze moet blijven gelden tot minstens 16 september 2026.

Tot die datum:

- geen nieuwe SEO-experimenten;
- geen nieuwe lokale of programmatische URL's;
- geen bulkrewrite, consolidatie, noindex of redirects;
- geen title-, H1-, URL-, interne-link- of templatewijziging;
- geen indexeringsaanvragen;
- alleen monitoring en het voorbereiden van claim- en URL-eigenaarschapregisters.

De audit vond geen aantoonbare technische fout die een uitzondering op de freeze rechtvaardigt. Op of na 16 september worden eerst de afgesproken vier GSC-groepen opnieuw berekend. Pas daarna kan maximaal één gecontroleerde test voor `/kantoor` of `/woning-verkopen` worden gekozen. Deze audit voert geen test uit.

## Bestanden

- Volledige URL-matrix: `docs/spam-prevention-url-matrix-2026-08-26.csv`
- Aanvullende regels: `docs/seo-spam-update-aanvullende-regels-2026-08-26.md`
- Forensische audit: `docs/forensische-spambeleid-audit-2026-08-24.md`
- Productiebaseline: `docs/production-release-baseline-2026-08-19.md`
