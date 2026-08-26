# Forensische spambeleid-audit, 24 augustus 2026

## Aanvulling van 26 augustus 2026

De blijvende release-, cohort-, entity-, lokale evidence- en meetregels staan in [de aanvullende SEO-, GEO- en spamupdate-regels](./seo-spam-update-aanvullende-regels-2026-08-26.md). Die aanvulling onderscheidt officiële Google-regels, eigen observaties, tests, hypotheses en interne guardrails. De historische vaststellingen hieronder blijven ongewijzigd.

## Besluit

De daling volgt nauw op de August 2026 Spam Update, maar Google Search Console toont geen handmatige actie en geen beveiligingsprobleem. De huidige hypothese is daarom een algoritmische domeinbrede herwaardering, niet een handmatige straf.

De prioriteit is niet een massale rewrite. Eerst moet het corpus aantoonbaar minder schaalmatig, beter onderbouwd en duidelijker gedifferentieerd worden. Pas daarna kunnen gerichte verbeteringen per cluster worden ingepland.

## Bewijs uit Search Console

Vergelijking van 21 tot en met 23 augustus met 14 tot en met 16 augustus 2026:

| Maatstaf | Huidige periode | Vergelijkingsperiode | Verandering |
| --- | ---: | ---: | ---: |
| Klikken | 8 | 44 | -81,8% |
| Vertoningen | 644 | 7.286 | -91,2% |
| Pagina's met vertoningen | 58 | 180 | -67,8% |
| België, vertoningen | 576 | 6.541 | -91,2% |
| Mobiel, vertoningen | 181 | 2.873 | -93,7% |
| Desktop, vertoningen | 438 | 4.004 | -89,1% |

De daling blijft vrijwel even groot wanneer trailing-slash-URL's worden uitgesloten: non-slash-URL's dalen van 6.838 naar 617 vertoningen, of -91,0%. De slashnormalisatie is dus geen afdoende verklaring.

De Google Search Status Dashboard vermeldt de August 2026 Spam Update als rankingupdate, gestart op 18 augustus en afgerond op 21 augustus. Zie https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history .

## Uitgesloten of minder waarschijnlijke oorzaken

| Signaal | Vaststelling | Betekenis |
| --- | --- | --- |
| Handmatige acties | Geen problemen gedetecteerd | Geen handmatige Google-sanctie zichtbaar |
| Beveiliging | Geen problemen gedetecteerd | Geen zichtbaar hacking- of malwareprobleem |
| Linkprofiel in GSC | 5 externe links totaal | Geen zichtbaar patroon van grootschalige linkspam, maar GSC is geen volledige backlinkaudit |
| Indexering | 247 geïndexeerd, 211 niet geïndexeerd | Geen plotselinge de-indexatie als hoofdverklaring |
| Kwaliteitsdrempel | 43 gecrawld maar niet geïndexeerd, 12 gevonden maar niet geïndexeerd | Bestaand kwaliteits- en selectiesignaal dat nader onderzoek vereist |
| Productierelease 19 augustus | Update startte een dag eerder | De release kan de initiële update niet verklaren, maar wordt niet als herstelmaatregel beschouwd |

## Corpusrisico's

### 1. Grote, herhaalbare contentstructuur

- 166 MDX-pagina's staan in het corpus.
- 144 pagina's gebruiken dezelfde commerciële bouwblokken, waaronder OfferteCheck, DecisionBox of TipBlock.
- 23 pagina's bevatten een eigen zichtbare bronsectie. Voor de overige pagina's worden bronnen grotendeels generiek door de template toegevoegd.
- 13 pagina's hebben expliciete redactionele metadata.

Een herbruikbare component is op zichzelf geen spam. De combinatie van veel sterk verwante onderwerpen, vergelijkbare commerciële CTA's en beperkt pagina-specifiek bronbewijs is wel een risico voor de beoordeling van schaalmatige inhoud. Google beschrijft scaled content abuse als het publiceren van veel pagina's hoofdzakelijk om rankings te manipuleren, zonder rekening te houden met de waarde voor gebruikers. Zie https://developers.google.com/search/docs/essentials/spam-policies#scaled-content-abuse .

### 2. Overlap in gereguleerde informatie

De site behandelt veel juridische, fiscale en technische vastgoedonderwerpen met verwante intenties. Vooral deze clusters zijn kwetsbaar voor overlap, herhaling en onvoldoende broncontext:

| Cluster | Risico | Eerste beslissing |
| --- | --- | --- |
| `/asbestattest/*` | 40 varianten rond prijs, plicht, locatie, verkoop en uitzonderingen | Geen nieuwe varianten. Per URL unieke intentie, lokale bron en inhoudelijke noodzaak bewijzen. Kandidaten zonder eigen vraag consolideren. |
| `/huis-verkopen-verplichtingen/*` | Hub plus attesten- en keuringsdetailpagina's overlappen met het asbestcluster | Centrale hub als eigenaar behouden. Detailpagina's alleen behouden bij aantoonbaar eigen proces of wettelijk scenario. |
| Registratierechten, notariskosten, akte en verkoopkosten | Hoge actualiteits- en aansprakelijkheidsgevoeligheid | Elke regel, prijs en termijn herleiden naar een primaire bron met controledatum. |
| Waardebepaling en verkoop | Commerciële intentie, generieke vergelijkingsclaims en CTA-dichtheid | Praktijkmethode, echte brondata en duidelijke begrenzing van de dienst versterken. |

### 3. Bronnen staan te vaak los van de concrete claim

Bijvoorbeeld: `/prijs-bouwgrond-berekenen` noemt bedragen en verwijst in tekst naar Statbel en een notarisbarometer, maar bevat geen controleerbare bronlink bij die cijfers. Op dergelijke pagina's moeten prijs, datum, geografische afbakening en primaire bron direct bij de relevante claim staan. Algemene bronlinks onderaan zijn onvoldoende als bewijs voor veranderlijke regels of bedragen.

## Prioriteit 0: direct onderzoeken, nog niet massaal wijzigen

| URL of cluster | GSC-signaal | Auditbeslissing |
| --- | --- | --- |
| `/waarde-woning-berekenen` | 637 naar 7 vertoningen, positie 42,7 naar 91,1 | Eerst inhoud, bronnen, claimbegrenzing en unieke methode volledig auditen. |
| `/prijs-bouwgrond-berekenen` | 431 naar 15 vertoningen, positie 6,8 naar 44,0 | Bronnen voor prijsclaims en lokale variatie verifiëren. Geen generieke gemiddelden zonder datum en bron. |
| `/kosten-verkoop-huis` | 484 naar 70 vertoningen, positie 19,4 naar 58,3 | Afgrenzen tegenover notariskosten, makelaarskosten en verkoopverplichtingen. Alle bedragen herleiden. |
| `/huis-verkopen-verplichtingen` | 409 naar 47 vertoningen, positie 26,6 naar 76,4 | Hubrol herstellen, dubbele detailvragen inventariseren. |
| `/akte-verlijden` | 302 naar 4 vertoningen | Juridische en fiscale actualiteit per claim controleren. |
| `/woning-verkopen` | Nog niet geïndexeerd | Los technisch en kwaliteitsdossier. Niet compenseren met extra links of tekst zonder diagnose. |
| `/kantoor` | 297 naar 7 vertoningen | Controleer onderscheidende kantoorinformatie, bronherkomst, actualiteit en directorynut. |

## Fase 2: claimregister prioriteit-0

Deze controle vergelijkt de zichtbare belofte, de werkelijke implementatie en het beschikbare bronbewijs. Een risicosignaal is geen bewijs van een spambeleidsovertreding. Het bepaalt wel welke inhoud niet zonder verificatie mag blijven staan.

| URL | Vaststelling | Risico | Besluit vóór publicatiewijziging |
| --- | --- | --- | --- |
| `/waarde-woning-berekenen` | De intro zegt dat een tool adres en woningkenmerken met recente transacties vergelijkt. De daadwerkelijke quickscan vraagt enkel oppervlakte, een zelf ingevoerde lokale prijs per m2 en een zelf gekozen correctie. | Hoog. De belofte van een automatische, datagedreven schatting komt niet overeen met de toolwerking. | Herformuleer als zelf in te vullen rekenhulp. Verwijder de claim over automatische vergelijking met recente transacties tenzij een echte bron en dataverwerking worden toegevoegd. |
| `/waarde-woning-berekenen` | De pagina noemt 250 tot 500 euro voor een officiële schatting en stelt dat die voor verkoop nodig is. | Hoog. Prijsrange heeft geen bron; een officiële schatting is niet algemeen vereist om te verkopen. | Splits verkoopadvies, nalatenschap en krediet. Gebruik voor nalatenschap de voorwaarden van de Vlaamse Belastingdienst en vermijd een algemene verplichtingsclaim. |
| `/prijs-bouwgrond-berekenen` | De pagina noemt 210 tot 310 euro per m2 als gemiddelde grondprijs in Vlaanderen, zonder directe bronlink, verslagperiode of geografische afbakening. | Hoog. Veranderlijk prijsgegeven zonder controleerbaar bewijs. | Schrap de bandbreedte of vervang die door een gedateerde primaire statistiek met methode, periode en gebied. |
| `/kosten-vastgoedmakelaar` | De pagina noemt 2% tot 4% en "geen verkoop, geen commissie" als gebruikelijk, terwijl de BIV alleen bevestigt dat tarieven vrij zijn. | Middel tot hoog. Een vrije markt kent geen algemeen tarief of uniforme betalingsvoorwaarde. | Houd de calculator, maar label het percentage als enkel voorbeeld. Verwijder algemene betalingsclaims tenzij de verkoopopdracht dat bepaalt. |
| `/huis-verkopen-verplichtingen` | De centrale checklist behandelt EPC, asbest, bodem en overstromingsinformatie en heeft primaire bronnen. Dezelfde onderwerpen bestaan ook in meerdere detailclusters. | Middel. Niet de bronkwaliteit, maar de overlap en eigenaarschap van zoekintenties vormen het risico. | Behoud als centrale Vlaamse verkoopchecklist. Beslis per detailpagina of ze een uniek scenario behandelt of naar de hub moet worden geconsolideerd. |
| `/akte-verlijden` | De pagina bevat tarief- en termijnaanspraken, waaronder verkooprecht en indicatieve attestprijzen. | Hoog. Juridische en prijsclaims zijn tijd- en situatiegebonden. | Claim voor claim naast Notaris.be, Vlaanderen.be en OVAM leggen. Bedragen alleen tonen met datum en bron bij de tabel. |
| `/woning-verkopen` | De pagina heeft een bronsectie en duidelijke begrenzing voor Vlaanderen, maar overlapt met kosten, verplichtingen, zelf verkopen, notariële verkoop en opkopers. | Middel. Kans op een te brede hub die andere pagina's inhoudelijk dupliceert. | Behoud als proceshub. Verplaats detailuitleg naar eigenaarspagina's en houd op de hub alleen beslismomenten, routes en unieke verkoopplanning. |
| `/kantoor` | De directory leunt op gecontroleerde BIV- en kantoorinformatie, maar bronherkomst en controledatum bepalen de waarde. | Hoog. Een directory zonder aantoonbaar actuele en volledige records is inhoudelijk zwak. | Per profiel vastleggen: primaire bron, controledatum, BIV-status, gebied en reden van opname. Profielen zonder controleerbare kerngegevens niet als vergelijkingsbron positioneren. |

### Gecontroleerde primaire bronnen

- De Vlaamse Belastingdienst beschrijft wanneer een schatting door een erkende schatter-expert voor een nalatenschap wordt aanvaard en aan welke voorwaarden ze moet voldoen: https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/erfbelasting/informatie-voor-erkende-schatters-experten .
- Het BIV bevestigt dat vastgoedmakelaars hun commissie vrij bepalen en dat er geen aanbevolen of verplichte tarieven zijn: https://www.biv.be/kb/het-beroep/tarieven-en-erelonen .
- Vlaanderen.be bundelt de verplichte informatie bij woningverkoop, waaronder EPC, bodemattest en asbestattest: https://www.vlaanderen.be/bouwen-wonen-en-energie/kopen-en-verkopen/een-huis-verkopen .
- OVAM vermeldt het asbestattest voor gebouwen van vóór 2001 bij verkoop: https://ovam.vlaanderen.be/web/eerlijkhuis/het-asbestattest .

## Eerste gecontroleerde herstelbatch

Op 24 augustus 2026 is uitsluitend deze beperkte batch uitgevoerd, zonder nieuwe URL's, redirects of indexeringsaanvragen:

1. De belofte en toelichting van de woningwaarde-quickscan zijn afgestemd op de drie werkelijke invoervelden en de berekening.
2. De niet-onderbouwde prijsbandbreedte voor bouwgrond is verwijderd en vervangen door een methode voor lokale referenties.
3. Algemene aanspraken over makelaarscommissies en het betaalmoment zijn vervangen door de contract- en offerteafhankelijke uitleg. Het rekenvoorbeeld blijft expliciet een rekenvoorbeeld.
4. Op `/akte-verlijden` zijn niet-geverifieerde prijsbedragen en een vaste rechtenvermindering verwijderd. De pagina verwijst direct naar Vlaanderen.be en OVAM voor voorwaarden en actuele regels.

De contentcontrole slaagde na de batch op 24 augustus 2026. Meet vanaf deze datum minimaal 14 dagen voordat een tweede batch volgt. De overige pagina's worden in de cluster-matrix beoordeeld, niet via een bulkrewrite.

## Uitvoeringsvolgorde

1. Geen nieuwe programmatische of sterk vergelijkbare kennisbankpagina's publiceren.
2. Voor elk prioriteit-0-item een claimregister maken: claim, bron, controledatum, eigenaar, behoud of verwijdering.
3. Voor het asbest- en verplichtingencluster een URL-matrix maken: primaire vraag, unieke informatie, bron, verkeer, interne links en consolidatiebeslissing.
4. Pas na die matrix kiezen tussen herschrijven, samenvoegen, 301-redirect of noindex. Geen keuze louter op basis van lage traffic.
5. Na elke kleine batch 14 dagen meten op indexering, queryselectie, vertoningen en positie.

## Niet doen

- Geen massale herschrijving met dezelfde template.
- Geen bulkverwijdering of bulk-noindex zonder URL-matrix.
- Geen disavow zonder concreet bewijs van onnatuurlijke links.
- Geen nieuwe SEO-experimenten of indexeringsaanvragen als reactie op de daling.

## Bronnen

- Google Search Status Dashboard: https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
- Google Search spam updates: https://developers.google.com/search/docs/appearance/spam-updates
- Google spambeleid, scaled content abuse: https://developers.google.com/search/docs/essentials/spam-policies#scaled-content-abuse
- GSC-export: `vastgoedmakelaarzoeken.be-Performance-on-Search-2026-08-24.xlsx`
