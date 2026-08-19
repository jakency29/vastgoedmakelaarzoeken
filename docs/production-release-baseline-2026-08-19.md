# Productierelease en nulmeting 19 augustus 2026

## Release

- Releasecommit: `8707c52 Voer SEO en GEO handboek uit`
- Technische follow-up: `98ffb31 Corrigeer 404 metadata en voeg productie QA toe`
- Branch: `main`
- Productie actief op: `https://www.vastgoedmakelaarzoeken.be`
- QA-datum: 19 augustus 2026
- Afbakening: alleen de SEO- en GEO-release, zonder de lokale Instagrambestanden

## Productie-QA

De automatische controle omvatte 19 URL's: homepage, kantorengids, zes commerciële en inhoudelijke kernpagina's, vier opportunitypagina's, drie kantoorprofielen, twee provinciepagina's, privacy, voorwaarden en een expres onbestaande URL.

Resultaat:

- alle bedoelde pagina's geven status 200;
- de expres onbestaande URL geeft status 404;
- elke indexeerbare pagina heeft exact één H1;
- title en canonical zijn aanwezig;
- formulieren zijn aanwezig op de commerciële, inhoudelijke, kantoor- en provinciepagina's;
- formulieren tonen een link naar het privacybeleid;
- alle gecontroleerde pagina's hebben interne links;
- op 390 en 1280 pixels is geen horizontale overflow gevonden;
- het mobiele menu bevat alle kernroutes;
- de browser rapporteerde geen fouten of waarschuwingen.

De 404-pagina bleek aanvankelijk de homepagecanonical te erven. De kleine technische correctie is gedeployed en opnieuw live getest: status 404, eigen title, `noindex` en geen canonical. Er zijn geen titles, H1's of hoofdcontent opnieuw herschreven. De herhaalde productiecontrole slaagt voor alle 19 URL's.

## Redirectmatrix

| Invoer | Keten | Resultaat |
| --- | --- | --- |
| `https://www.../kantoor/` | 301, 200 | Goed, exact één redirect naar de non-slash-URL |
| `https://www.../asbestattest/bij-verkoop` | 301, 200 | Goed, exact één legacyredirect |
| `http://www.../kantoor` | 308, 200 | Eén hostingredirect naar HTTPS |
| `https://vastgoedmakelaarzoeken.be/kantoor` | 308, 200 | Eén hostingredirect naar www |
| `http://vastgoedmakelaarzoeken.be/kantoor/` | 308, 308, 301, 200 | Open punt: drie redirects door protocol, host en slash apart |

De kritieke slash- en legacytests slagen met één 301. Alleen de gecombineerde variant met HTTP, apexdomein en slash heeft nog een keten. Dit moet in de domein- of hostingconfiguratie worden opgelost, niet met een nieuwe contentwijziging.

## Sitemap en Search Console

- De live sitemap bevat op het meetmoment 217 URL's.
- Search Console toonde vóór herindiening 214 ontdekte pagina's.
- De sitemap had status `Succesvol` en was laatst gelezen op 17 augustus 2026.
- De bestaande volledige sitemap-URL is op 19 augustus 2026 één keer opnieuw ingediend.
- Search Console bevestigde `Sitemap ingediend`.
- Er zijn geen 166 individuele indexeringsverzoeken verstuurd.

## URL-inspecties van de 15 controlepagina's

| URL | Indexstatus | Google-canonical | Laatste crawl |
| --- | --- | --- | --- |
| `/` | Geïndexeerd | Gecontroleerde URL | 16 aug 2026, 19:57 |
| `/kantoor` | Geïndexeerd | Gecontroleerde URL | 30 jul 2026, 06:02 |
| `/kosten-vastgoedmakelaar` | Geïndexeerd | Gecontroleerde URL | 17 aug 2026, 05:56 |
| `/huis-laten-schatten` | Geïndexeerd | Gecontroleerde URL | 8 aug 2026, 00:44 |
| `/woning-verkopen` | Niet geïndexeerd: gecrawld, momenteel niet geïndexeerd | Gecontroleerde URL | 13 jul 2026, 19:56 |
| `/kosten-verkoop-huis` | Geïndexeerd | Gecontroleerde URL | 14 aug 2026, 04:52 |
| `/akte-verlijden` | Geïndexeerd | Gecontroleerde URL | 10 aug 2026, 09:58 |
| `/prijs-bouwgrond-berekenen` | Geïndexeerd | Gecontroleerde URL | 17 aug 2026, 06:45 |
| `/bod-intrekken-huis` | Geïndexeerd | Gecontroleerde URL | 13 aug 2026, 14:05 |
| `/huis-gekocht-wat-nu` | Geïndexeerd | Gecontroleerde URL | 18 aug 2026, 05:20 |
| `/kantoor/we-invest-demervallei` | Geïndexeerd | Gecontroleerde URL | 8 jul 2026, 21:29 |
| `/kantoor/hillewaere-vastgoed` | Geïndexeerd | Gecontroleerde URL | 18 aug 2026, 03:47 |
| `/kantoor/heylen-vastgoed` | Geïndexeerd | Gecontroleerde URL | 19 aug 2026, 19:53 |
| `/vastgoedkantoren/limburg` | Geïndexeerd | Gecontroleerde URL | 24 jul 2026, 23:07 |
| `/vastgoedkantoren/antwerpen` | Geïndexeerd | Gecontroleerde URL | 11 aug 2026, 04:28 |

Voor alle inspecties waren crawlen toegestaan, ophalen geslaagd en de door de site aangegeven canonical gelijk aan de gecontroleerde URL. Veertien van de vijftien controlepagina's zijn geïndexeerd. Voor `/woning-verkopen` is op 19 augustus één gerichte herindexering aangevraagd. Search Console bevestigde dat de URL aan de prioriteitscrawlwachtrij is toegevoegd. Er zijn geen andere individuele aanvragen verstuurd.

## GSC-pre-releasebaseline

Bronnen zijn de sitebrede exports van 19 augustus 2026 voor de afgelopen drie maanden en de afgelopen 24 uur. Slash- en non-slashvarianten zijn per logische URL samengevoegd. De cijfers zijn een nulmeting, geen effectmeting van de release.

| URL | 3 mnd klikken | 3 mnd vertoningen | 3 mnd CTR | 3 mnd positie | 24 u klikken | 24 u vertoningen | 24 u CTR | 24 u positie |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 24 | 13.787 | 0,17% | 31,59 | 0 | 14 | 0,00% | 49,79 |
| `/kantoor` | 0 | 267 | 0,00% | 35,57 | 0 | 19 | 0,00% | 20,53 |
| `/kosten-vastgoedmakelaar` | 9 | 3.453 | 0,26% | 34,16 | 1 | 49 | 2,04% | 25,96 |
| `/huis-laten-schatten` | 24 | 6.820 | 0,35% | 19,09 | 1 | 33 | 3,03% | 20,39 |
| `/woning-verkopen` | 0 | 0 | 0,00% | n.v.t. | 0 | 0 | 0,00% | n.v.t. |
| `/kosten-verkoop-huis` | 136 | 23.672 | 0,57% | 12,01 | 1 | 97 | 1,03% | 15,25 |
| `/akte-verlijden` | 45 | 16.575 | 0,27% | 7,84 | 0 | 177 | 0,00% | 8,50 |
| `/prijs-bouwgrond-berekenen` | 110 | 12.448 | 0,88% | 8,83 | 1 | 134 | 0,75% | 5,87 |
| `/bod-intrekken-huis` | 174 | 7.460 | 2,33% | 8,29 | 2 | 62 | 3,23% | 5,65 |
| `/huis-gekocht-wat-nu` | 80 | 3.898 | 2,05% | 13,43 | 0 | 26 | 0,00% | 7,88 |
| `/kantoor/we-invest-demervallei` | 0 | 119 | 0,00% | 6,91 | 0 | 2 | 0,00% | 9,50 |
| `/kantoor/hillewaere-vastgoed` | 0 | 186 | 0,00% | 15,16 | 0 | 0 | 0,00% | n.v.t. |
| `/kantoor/heylen-vastgoed` | 2 | 401 | 0,50% | 11,25 | 0 | 8 | 0,00% | 8,50 |
| `/vastgoedkantoren/limburg` | 8 | 1.422 | 0,56% | 21,25 | 0 | 17 | 0,00% | 30,06 |
| `/vastgoedkantoren/antwerpen` | 1 | 108 | 0,93% | 26,91 | 0 | 20 | 0,00% | 22,05 |

## Slashconsolidatie

| Periode | Slash-URL's met data | Klikken | Vertoningen | Aandeel van alle vertoningen |
| --- | ---: | ---: | ---: | ---: |
| Afgelopen 3 maanden | 80 | 1.077 | 192.041 | 58,6% |
| Afgelopen 24 uur | 14 | 0 | 120 | 5,3% |

De 24-uursmeting laat al zien dat het grootste deel van de vertoningen op non-slash-URL's terechtkomt. Dit is nog geen oorzakelijk bewijs van de release. Dezelfde meting moet op vaste momenten worden herhaald.

## Interne-linkgraph

De audit bevat 490 contextuele links.

| Commerciële of centrale URL | Contextuele inbound links |
| --- | ---: |
| `/huis-verkopen-verplichtingen` | 42 |
| `/huis-laten-schatten` | 29 |
| `/kosten-vastgoedmakelaar` | 25 |
| `/kosten-verkoop-huis` | 12 |
| `/kantoor` | 3 |
| `/woning-verkopen` | 3 |

Conclusie:

- verplichtingen, schatting en makelaarskosten worden duidelijk als prioriteit behandeld;
- `/kantoor` en `/woning-verkopen` krijgen relatief weinig contextuele inbound links;
- het meest gebruikte anker is `kosten van een vastgoedmakelaar` met 15 van de 490 links, of 3,1%;
- meerdere sterke informatieve pagina's linken nog niet naar een commerciële kernroute, waaronder `/prijs-bouwgrond-berekenen`, `/optie-nemen-op-huis`, `/sleutel-op-de-deur-woning`, `/bod-intrekken-huis`, `/nieuwbouw-kopen-waar-op-letten`, `/hoeveel-kost-een-totaalrenovatie` en `/zonevreemde-woning-kopen`;
- sterke pagina's zoals `/waarde-woning-berekenen` en `/huis-verkopen-met-meerdere-erfgenamen` sturen wel gericht door naar relevante kernpagina's.

Er zijn nu geen extra links toegevoegd. Eerst wordt de release gemeten. Na twee tot vier weken kan een kleine, inhoudelijk relevante linktest naar `/kantoor` en `/woning-verkopen` worden overwogen.

## Conversiebaseline

Niet beschikbaar in de GSC-export:

- leads;
- formulierstarts;
- formuliercompletions;
- leadkwaliteit per ontvangend kantoor.

Deze waarden mogen niet op nul worden gezet, omdat nul een gemeten waarde zou impliceren. Voor een bruikbare conversiebaseline is Analytics-, formulier- of CRM-data nodig met dezelfde deploymentdatum.

## Bewust niet uitgevoerd

- geen tweede grote contentrewrite;
- geen massale title- of H1-wijzigingen;
- geen nieuwe URL-migratie;
- geen massale interne-linkwijziging;
- geen individuele indexeringsaanvragen voor alle pagina's;
- geen bedrijfsgegevens, reviews, marktdata of kantoorclaims verzonnen;
- geen ranking- of conversiewinst aan deze release toegeschreven;
- geen wijziging aan domeinredirects zonder toegang tot de hostingconfiguratie;
- geen conversiecijfers ingevuld zonder meetbron.

## Meetmomenten

1. Dag 0: deze nulmeting en technische productie-QA.
2. Na 7 dagen: statuscodes, canonicals, sitemapstatus en slashvertoningen controleren.
3. Na 14 tot 28 dagen: querymix, CTR bij vergelijkbare positie en URL-selectie beoordelen.
4. Na 90 dagen: structurele impact per wijzigingscategorie evalueren.

Tijdens deze periode blijven content, titles, H1's, URL's en de brede interne-linkgraph bevroren, behalve bij aantoonbare technische fouten.
