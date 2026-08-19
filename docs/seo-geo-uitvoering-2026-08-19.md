# SEO- en GEO-uitvoering 19 augustus 2026

## Scope

Dit rapport beschrijft de lokale uitvoering van het SEO- en GEO-handboek voor VastgoedmakelaarZoeken. Na lokale controle is deze afgebakende release op verzoek gecommit en gepusht. Er zijn geen handmatige deployment- of Google Search Console-acties uitgevoerd. Bestaande, niet-gerelateerde wijzigingen in de werkmap zijn behouden.

## Samenvatting

De technisch en inhoudelijk uitvoerbare verbeteringen uit het handboek zijn lokaal toegepast. De belangrijkste resultaten zijn:

- consistente non-slash-URL's met één permanente 301-redirect;
- een bruikbare 404-pagina en aanvullende privacy- en voorwaardenpagina's;
- duidelijkere homepage-intentie en navigatie;
- sterkere kantoor-, provincie- en kantorengidspagina's op basis van aanwezige data;
- expliciete zoekintentie en query-eigenaarschap voor kosten, schatting en akte;
- duidelijkere interne links tussen hoofd- en detailpagina's;
- een herhaalbare interne-linkaudit met 490 contextuele links en nul dubbele targets per bronpagina;
- privacyuitleg bij alle leadformulieren;
- lokale build-, lint-, content-, type- en browsercontroles.

## Uitgevoerd

| Onderdeel | Status | Lokale uitvoering |
| --- | --- | --- |
| URL-normalisatie | Gereed | Trailing-slash-URL's krijgen één 301 naar de non-slashvariant. Queryparameters blijven behouden. |
| Canonicals | Gereed | De geteste parameter-URL gebruikt de schone canonieke URL. |
| 404-pagina | Gereed | Eigen 404 met herstelroutes naar zoeken, kantoren en kennisbank. |
| Privacy en voorwaarden | Gereed met open juridisch punt | Nieuwe pagina's, footerlinks en privacyuitleg bij formulieren toegevoegd. |
| Homepage-intentie | Gereed | H1 en metadata richten zich op vastgoedmakelaars vergelijken in de regio. Vrijblijvendheid en controle van BIV-data zijn verduidelijkt. |
| Hoofdnavigatie | Gereed | Vergelijken, kantoren, schatten, verkopen en kennisbank staan eerst. Aanbodpagina's blijven bereikbaar. |
| Kantorengids | Gereed | Filters voor gecontroleerde BIV-data en beschikbare reviewdata, feitelijke statistieken en werkwijzelink toegevoegd. |
| Kantoorprofielen | Gereed | Feitenblok met plaats, BIV, diensten en controledatum plus link naar de verificatiemethode. |
| Provinciepagina's | Gereed | Automatisch feitenblok met kantoren, gemeenten, meest voorkomende dienst en recentste BIV-check. |
| Makelaarskosten | Gereed | Zoekintentie, titel, eerste antwoord, percentage versus vaste prijs en kantoorroute verduidelijkt. |
| Totale verkoopkosten | Bewust beperkt | Sterke bestaande pagina behouden. Alleen dubbele interne link gecorrigeerd. |
| Akte verlijden | Gereed | Pagina herschikt rond de dag zelf, voorbereiding, betaling, ondertekening, sleuteloverdracht en gevolgen van ontbrekende stukken. |
| Huis laten schatten | Gereed | Duidelijk onderscheid tussen makelaarsschatting, online indicatie en formeel verslag. |
| Verkoophub | Gereed | Actualiteitsdatum en contextuele route naar kantoren toegevoegd. |
| Verplichtingencluster | Gereed | Detailpagina's linken terug naar de centrale verplichtingenpagina. |
| Interne links | Gereed | Auditgenerator, CSV-export, validatie van bekende app-routes en trailing-slashcontrole toegevoegd. |
| Semantische templates | Gereed | Feitenblokken gebruiken beschrijvingslijsten en de werkwijzepagina gebruikt AboutPage-structured data. |
| Formuliertransparantie | Gereed | Doel, doorsturen naar één of meer kantoren en privacylink staan bij elk formulier. |
| Omgevingsdocumentatie | Gereed | Web3Forms-configuratie in `.env.example` verduidelijkt. |

## Query naar URL-eigenaarschap

| Zoekintentie | Primaire URL | Uitvoering |
| --- | --- | --- |
| vastgoedmakelaar zoeken of vergelijken | `/` en `/kantoor` | Homepage als vergelijkingsingang, kantorengids als selectieomgeving |
| vastgoedmakelaar kosten of commissie | `/kosten-vastgoedmakelaar` | Gericht op ereloon, commissie, percentage en vaste prijs |
| totale kosten bij verkoop | `/kosten-verkoop-huis` | Bestaande brede kostenpagina behouden |
| huis laten schatten door makelaar | `/huis-laten-schatten` | Menselijke schatting en verkoopadvies centraal |
| waarde indicatief berekenen | `/woningwaarde-berekenen` en `/waarde-woning-berekenen` | Bestaande tool- en uitlegroute behouden |
| akte verlijden | `/akte-verlijden` | Gebeurtenissen op de dag van de akte centraal |
| verkoopverplichtingen | `/huis-verkopen-verplichtingen` | Centrale hub met detailpagina's voor attesten en keuringen |
| woning verkopen | `/woning-verkopen` | Proceshub met routes naar waardebepaling, verplichtingen, kosten en kantoren |

## Niet uitgevoerd

| Onderdeel | Reden | Nodig voor uitvoering |
| --- | --- | --- |
| Handmatige productie-deployment en productie-QA | De release is gepusht, maar een eventueel automatisch hostingproces is geen onderdeel van de lokale uitvoering. | Wachten op de hostingdeployment en daarna de productiecontrole uitvoeren. |
| Google Search Console-acties | Externe GSC-wijzigingen horen niet bij een lokale implementatie. | Toegang en expliciete opdracht voor sitemap, inspectie en herindexering. |
| Analyse van de 17 dekkings-URL's uit het handboek | De bijbehorende actuele GSC-export zat niet bij deze opdracht. | Actuele Coverage- of Pages-export. |
| GEO-nulmeting en maandelijkse LLM-monitoring | Dit vraagt een gekozen meetprotocol, vaste prompts, meetmomenten en externe resultaten over tijd. | Goed te keuren promptset, platformkeuze en rapportagefrequentie. |
| Resultaatmeting na 3 tot 4 weken en 90 dagen | De meetperiode is nog niet verstreken en vereist externe GSC-data. | Nieuwe GSC-export na de afgesproken meetperiode. |
| Eigen marktbenchmarks en vergelijkingsdata | Er is geen gecontroleerde dataset om betrouwbare cijfers te publiceren. | Voldoende echte aanvragen, offertes en toestemming voor geaggregeerde publicatie. |
| Juridisch volledige identificatie | Ondernemingsnummer en volledig openbaar adres zijn niet geverifieerd en daarom niet verzonnen. | Gecontroleerde juridische naam, ondernemingsnummer en vestigingsadres plus juridische review. |
| Externe actualiteitscontrole van alle kantoorrecords | Bestaande controledatums zijn getoond, maar niet op 19 augustus opnieuw extern geverifieerd. | BIV- en kantoorbroncontrole per profiel. |
| Nieuwe reviews of kantoorclaims | Het handboek verbiedt niet-verifieerbare gegevens en de lokale dataset bevat niet voor elk profiel reviewdata. | Verifieerbare brondata met datum en herkomst. |

## Kwaliteitscontrole

| Controle | Resultaat |
| --- | --- |
| Contentcontrole | 166 pagina's, metadata en interne links geldig |
| Interne-linkaudit | 490 contextuele links, nul dubbele targets op dezelfde bronpagina |
| TypeScript | Geslaagd |
| ESLint | Geslaagd |
| Productiebouw | Geslaagd, 227 statische pagina's |
| Redirecttest | Slash-URL naar non-slash met 301, doelpagina 200 |
| Oude asbestroute | 301 naar de actuele verplichtingenroute |
| 404-test | Onbekende URL geeft 404 met bruikbare herstelpagina |
| Canonicaltest | Parameter-URL verwijst naar de schone canonieke URL |
| Visuele controle | Homepage, kantorengids en aktepagina op desktop en mobiel gecontroleerd |

## Belangrijke bestanden

- `src/proxy.ts`: URL-normalisatie met 301.
- `src/app/not-found.tsx`: eigen 404-pagina.
- `src/app/privacy/page.tsx` en `src/app/voorwaarden/page.tsx`: vertrouwenspagina's.
- `src/components/FormPrivacyNote.tsx`: uniforme privacyuitleg bij formulieren.
- `src/components/OfficeDirectoryExplorer.tsx`: nieuwe kantoorfilters.
- `src/components/mdx.tsx`: provinciefeiten en semantische presentatie.
- `scripts/generate-internal-link-audit.mjs`: herhaalbare linkaudit.
- `docs/internal-link-audit-2026-08-19.csv`: huidige linkinventaris.

## Aanbevolen volgende stap

Controleer na deployment vooral de nieuwe juridische pagina's, de formuliertekst en de gewijzigde kernpagina's op de live site. Vul daarna de geverifieerde juridische identiteit aan. De reeds aanwezige Instagrambestanden zijn niet in deze release opgenomen.
