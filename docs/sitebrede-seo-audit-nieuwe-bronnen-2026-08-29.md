# Sitebrede SEO-, entity- en bewijsaudit, 29 augustus 2026

## Herstelstatus, 30 augustus 2026

De vier structurele HOLD-signalen uit deze audit zijn op expliciet verzoek gecorrigeerd:

- alle 24 genoemde kennisbankpagina's hebben nu een zichtbare bronlink bij het relevante inhoudelijke antwoord;
- het aantal actieve pagina's zonder handmatige contextlink daalde van 15 naar 0;
- het aantal actieve pagina's zonder inhoudelijke inkomende bodylink daalde naar 0;
- Jan Kenis wordt zichtbaar en in Person-schema consequent beschreven als oprichter van Vastgoedmakelaarzoeken.com;
- Organization-schema staat alleen op de homepage en over-ons, Person-schema alleen op artikelen met een zichtbare auteur en op de auteurspagina.

De nieuwe controle slaagt voor 166 contentbestanden, 144 actieve pagina's en 22 geconsolideerde pagina's. De methodiekcontrole geeft 69 pagina's met 9 op 10 en 71 pagina's met 10 op 10. De historische vaststellingen hieronder blijven bewaard als auditspoor. De afzonderlijke bevinding over Google-reviewmarkup op kantoorprofielen valt buiten deze herstelopdracht en blijft open.

## Besluit

De live site is technisch gezond. De vier inhoudelijke en entitysignalen uit deze audit zijn op 30 augustus gecorrigeerd. De reviewmarkupbevinding blijft open.

- Alle 197 sitemap-URL's zijn bereikbaar met status 200.
- Alle 197 URL's hebben exact één H1 en een correcte self-canonical.
- Er zijn geen dubbele titles of descriptions gevonden.
- Er staan geen noindex-URL's in de sitemap.
- Alle gecontroleerde JSON-LD is syntactisch geldig.
- De productie-QA op `.com` slaagt 19 op 19.
- De 144 actieve MDX-pagina's slagen voor de bestaande automatische content- en methodiekcontroles.

De belangrijkste nieuwe bevinding is een aantoonbare structured-data-mismatch op de 10 kantoorprofielen. De site haalt Google-reviews op en voegt die samen in `aggregateRating` en `review` JSON-LD. Google zegt expliciet dat reviews of ratings van andere websites niet mogen worden samengevoegd voor reviewmarkup. Dit is de enige bevinding die als duidelijke technische beleidsfout een correctie tijdens de meetfreeze kan rechtvaardigen.

De audit vond oorspronkelijk vier structurele HOLD-signalen:

1. 24 kennisbankpagina's hebben geen bronlink in de artikeltekst en steunen alleen op één algemene frontmatterbron.
2. 15 pagina's hebben geen handmatige contextlink in de artikeltekst.
3. 39 pagina's ontvangen geen handmatige bodylink vanuit een ander MDX-artikel.
4. De zichtbare beschrijving van Jan Kenis en zijn schemafunctie zijn niet overal op dezelfde relatie geformuleerd.

De meetfreeze blijft gelden tot minstens 16 september 2026 voor nieuwe experimenten. De hierboven beschreven bron-, contextlink- en schemacorrecties zijn op expliciet verzoek uitgevoerd. Titles, H1's, URL's, Search Console-instellingen en indexeringsstatus zijn niet gewijzigd.

## Afbakening

De audit omvat:

- 19 nieuwe PDF-bronnen, samen 164 pagina's;
- de bestaande projectregels en audit van 26 augustus 2026;
- alle 197 live sitemap-URL's;
- alle 166 MDX-bestanden, waarvan 144 actief en 22 geconsolideerd of noindex;
- de homepage;
- 144 actieve kennisbank- en landingspagina's;
- 36 aanbodoverzichten;
- 10 kantoorprofielen;
- 1 makelaarprofiel;
- de kennisbankindex, kantoorindex, auteurspagina, werkwijze en over-ons;
- de globale en paginaspecifieke JSON-LD;
- desktopweergave op 1280 bij 720 pixels;
- mobiele weergave op 390 bij 844 pixels;
- productie-QA, migratiecontrole, contentcontrole en methodiekscore.

Google Search Console is in deze audit niet opnieuw uitgelezen. Actuele queryselectie, CTR en indexstatus zijn daarom niet gemeten en worden niet ingevuld op basis van aannames.

## Gebruikte controles

| Controle | Resultaat |
| --- | --- |
| `npm run lint` | PASS |
| `npm run check:content` | PASS, 166 pagina's |
| `npm run check:methodiek` | PASS, 140 gecontroleerde inhoudspagina's |
| `npm run score:methodiek` | 84 pagina's met 9 op 10, 56 met 10 op 10, 0 onder 9 |
| `npm run check:migration` | PASS, 144 actief, 22 noindex, 22 redirects |
| `npm run qa:production` met `.com` als basis | PASS, 19 op 19 |
| Volledige live sitemapcrawl | PASS, 197 op 197 technisch geldig |

Een automatische score van 9 of 10 bewijst alleen dat de controleerbare vormregels slagen. De score bewijst niet dat iedere claim door de beste bron wordt ondersteund of dat iedere URL organisch bestaansrecht heeft.

## Live inventaris

| Paginatype | Aantal |
| --- | ---: |
| Kennisbank en inhoudelijke landingspagina's | 144 |
| Woning- en aanbodoverzichten | 36 |
| Kantoorprofielen | 10 |
| Trust- en entitypagina's | 3 |
| Homepage | 1 |
| Kennisbankindex | 1 |
| Kantoorindex | 1 |
| Makelaarprofiel | 1 |
| Totaal | 197 |

De crawl vond:

- 0 fetchfouten;
- 0 statusfouten;
- 0 canonicalafwijkingen;
- 0 H1-problemen;
- 0 ongeldige JSON-LD-scripts;
- 0 knowledge-URL's zonder zichtbare auteur;
- 0 knowledge-URL's zonder zichtbare FAQ;
- 0 interne doelen buiten de bedoelde sitemap- en trustset;
- 0 dubbele titles;
- 0 dubbele descriptions.

## Bevindingen per prioriteit

### P0. Google-reviewdata wordt opnieuw gemarkeerd als eigen reviewmarkup

Betrokken template:

- `src/app/kantoor/[slug]/page.tsx`

Betrokken URL's:

- `/kantoor/we-invest-demervallei`
- `/kantoor/hillewaere-vastgoed`
- `/kantoor/heylen-vastgoed`
- `/kantoor/vastgoed-michoel`
- `/kantoor/immo-de-prins`
- `/kantoor/immo-plees`
- `/kantoor/living-stone-dilbeek`
- `/kantoor/coga-vastgoed`
- `/kantoor/just-wonen`
- `/kantoor/homerun`

De site haalt via de Google Places API een gemiddelde, reviewaantal en maximaal vijf individuele Google-reviews op. De pagina toont de bron zichtbaar, maar zet dezelfde gegevens ook als `aggregateRating` en `review` onder `RealEstateAgent` in JSON-LD.

Google's actuele reviewrichtlijn zegt:

- voeg geen reviews of ratings van andere websites samen;
- ratings moeten rechtstreeks van gebruikers komen;
- een reviewsite mag reviewmarkup gebruiken wanneer zij zelf reviews over andere bedrijven verzamelt, maar niet wanneer zij alleen Google-reviewdata herpubliceert.

Advies: verwijder alleen `aggregateRating` en `review` uit de JSON-LD zolang Vastgoedmakelaarzoeken.com de reviews niet zelf verzamelt. De zichtbare, correct toegeschreven Google-reviewsectie kan los daarvan blijven bestaan, onder voorbehoud van de Google Places-weergavevoorwaarden.

Status: `DOCUMENTED TECHNICAL ERROR`. Dit mag tijdens de freeze worden gecorrigeerd, maar is in deze audit niet uitgevoerd.

Officiële bron: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

### P1. De productie-QA gebruikt standaard nog het oude `.be`-domein

Bestand:

- `scripts/run-production-qa.mjs:3`

Zonder `QA_BASE_URL` controleert het script `https://www.vastgoedmakelaarzoeken.be`. Na de migratie krijgt de QA daardoor redirects waar zij directe 200-responses en `.be`-canonicals verwacht. De standaardrun rapporteert fout, terwijl dezelfde controle op `.com` 19 op 19 slaagt.

Advies:

- maak `.com` de standaardbasis;
- behoud afzonderlijke redirectcases voor `.be`;
- vervang de oude productiebaseline niet, maar maak een nieuwe post-migratiebaseline met datum en commit.

Status: `OBSERVED TOOLING ERROR`. Dit is geen rankingprobleem, maar maakt monitoring onbetrouwbaar.

### P1. Auteur- en oprichtersrelatie is niet overal eenduidig

Zichtbare formuleringen:

- `/over-ons`: Jan Kenis is oprichter van Vastgoedmakelaarzoeken.com.
- authorbox: Jan Kenis is oprichter van Vastgoedmakelaarzoeken.com.
- `/auteur/jan-kenis`: Jan Kenis is oprichter van Jakency.
- Person-schema: job title noemt oprichter van Jakency en SEO-, GEO- en AI-consultant.
- Person-schema: `worksFor` verwijst naar JAKENCY BV.

Deze uitspraken kunnen tegelijk waar zijn, maar de relatie wordt niet als één gecontroleerde feitenreeks uitgelegd. Voor entity consistency moet de site, na feitelijke bevestiging, één zin gebruiken die beide rollen zonder ambiguïteit verbindt.

Veilige modelstructuur na verificatie:

`Jan Kenis is oprichter van Vastgoedmakelaarzoeken.com. Het platform is eigendom van JAKENCY BV, waar Jan Kenis [feitelijk bevestigde functie] is.`

Vul de functie tussen blokhaken alleen in als deze juridisch of publiek verifieerbaar is.

Status per 30 augustus 2026: `PASS`. De zichtbare teksten en `jobTitle` gebruiken nu overal `Oprichter van Vastgoedmakelaarzoeken.com`. De relatie met JAKENCY BV blijft als eigendom en affiliatie beschreven.

### P1. Bronnabijheid was onvoldoende op 24 pagina's

Van de 144 actieve MDX-pagina's hebben:

- 141 een frontmatterbron;
- 84 een zichtbare `SourceNote` in de artikeltekst;
- 118 minstens één externe bronlink in de MDX-body;
- 24 alleen een algemene frontmatterbron en geen bronlink in de inhoud.

De 24 pagina's zijn:

- `/aankoopmakelaar`
- `/doorgeefschenking`
- `/eigen-inbreng-lening-bij-aankoop-woning`
- `/gras-afrijden-op-zondag`
- `/heropname-lening`
- `/hoeveel-kost-een-totaalrenovatie`
- `/huis-kopen-om-te-verhuren`
- `/huis-verkopen-met-makelaar`
- `/huurprijs-berekenen`
- `/hypothecair-mandaat`
- `/kangoeroewoning`
- `/leeftijdsgrens-overbruggingskrediet`
- `/meerwaardebelasting-vastgoed`
- `/mobiscore`
- `/nieuwbouw-kopen-waar-op-letten`
- `/notariskosten-verkoop-huis`
- `/prijs-bouwgrond-berekenen`
- `/schuldsaldoverzekering-prijs`
- `/verschil-erfpacht-en-opstal`
- `/verwarmen-met-airco`
- `/voorkooprecht-betekenis`
- `/waarde-woning-berekenen`
- `/woning-verkoopklaar-maken`
- `/zonevreemde-woning-kopen`

Dertien van deze pagina's tellen ongeveer 900 woorden of meer. De generieke bronselectie onderaan is niet altijd passend. Voorbeelden:

- lokale regels over grasmaaien vragen lokale politiereglementen, niet een algemene notarisbron;
- totaalrenovatieprijzen vragen een herleidbare kostendataset of duidelijke indicatieve rekenmethode, niet alleen een vergunningenpagina;
- bouwgrondprijzen per gemeente vragen bronjaar, meeteenheid, aggregatiemethode en dekking naast de tabel;
- krediet- en verzekeringsclaims vragen een bron bij het exacte productkenmerk of rekenvoorbeeld.

Status per 30 augustus 2026: `PASS VOOR DE 24 GEMELDE PAGINA'S`. Elke genoemde pagina heeft nu een zichtbare bronlink naast het relevante antwoordblok. De links verwijzen waar mogelijk naar primaire overheids-, notaris-, NBB-, Statbel- of Wikifinbronnen.

### P1. De handmatige contextlinkgraph was ongelijk

Alle actieve pagina's hebben automatische related-links en een commerciële vervolgstap. Zij zijn dus niet technisch verweesd. De handmatige contextlinks in de artikeltekst zijn wel ongelijk verdeeld:

- 15 pagina's hebben 0 handmatige bodylinks;
- 33 pagina's hebben 1 handmatige bodylink;
- 71 pagina's hebben minstens 3 handmatige bodylinks;
- 39 pagina's ontvangen 0 handmatige bodylinks vanuit andere MDX-pagina's.

Pagina's zonder handmatige bodylink:

- `/akte-verlijden`
- `/bieden-op-een-huis`
- `/compromis-verkoop-huis`
- `/huis-verkopen-boven-geschatte-waarde`
- `/huis-verkopen-nieuw-kopen`
- `/huis-verkopen-verplichtingen/mazouttank`
- `/huurcontract-1-jaar-opzeggen-door-verhuurder`
- `/kangoeroewoning`
- `/meerwaardebelasting-vastgoed`
- `/minimum-tijd-tussen-compromis-en-akte`
- `/modulair-bouwen`
- `/notariskosten-verkoop-huis/wie-betaalt`
- `/registratierechten/eerste-woning`
- `/schenking-onroerend-goed`
- `/syndicus`

Dit is geen advies om een vaste linkdichtheid af te dwingen. Voeg alleen een link toe wanneer de bronpagina logisch de volgende vraag oproept en de doelpagina de lezer werkelijk verder helpt.

Status per 30 augustus 2026: `PASS`. Er zijn 0 actieve pagina's zonder handmatige bodylink en 0 actieve pagina's zonder inhoudelijke inkomende bodylink.

Officiële bron: https://developers.google.com/search/docs/crawling-indexing/links-crawlable

### P2. De globale entitygraph was breder dan nodig

De root layout publiceert op alle 197 URL's:

- JAKENCY BV als Organization;
- Vastgoedmakelaarzoeken.com als Organization;
- WebSite;
- Jan Kenis als Person.

Google adviseert Organization-data op de homepage of één organisatiepagina en zegt expliciet dat dit niet op iedere pagina nodig is. Een Person-entiteit op kantoor- en woningpagina's is meestal niet relevant voor het hoofdonderwerp.

Advies na de freeze:

- behoud WebSite en de uitgeverrelatie waar functioneel;
- plaats de volledige Organization-graph primair op de homepage of `/over-ons`;
- plaats Person primair op `/auteur/jan-kenis` en verbind Article-pagina's via `author`;
- voorkom losse Person-data op kantoor- en aanbodpagina's waar Jan niet zichtbaar de maker of het onderwerp is.

Status per 30 augustus 2026: `PASS`. De root layout publiceert alleen WebSite. Organization staat op de homepage en over-ons. Person staat op Article-pagina's met zichtbare auteur en op `/auteur/jan-kenis`.

Officiële bronnen:

- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies

### P2. FAQPage staat op 192 van de 197 URL's

De FAQ's zijn zichtbaar en de JSON-LD komt inhoudelijk overeen. Er is dus geen verborgen-markupprobleem. Voor een commerciële vastgoedsite levert FAQPage normaal geen FAQ-rich result op. Google beperkt dit type rich result tot bekende gezaghebbende overheids- en gezondheidssites.

Advies:

- behoud nuttige zichtbare FAQ's;
- gebruik FAQPage niet als ranking- of CTR-belofte;
- verwijder overbodige FAQ-structured data alleen als onderdeel van een latere, gecontroleerde schemasimplificatie;
- maak niet op iedere template FAQ's verplicht wanneer de pagina geen echte vervolgvragen heeft.

Status: `PASS WITH NOTE`. Geen onmiddellijke actie nodig.

Officiële bron: https://developers.google.com/search/blog/2023/08/howto-faq-changes

### P2. Silo-eigenaarschap is niet formeel ingevuld op 102 van 144 actieve MDX-pagina's

De inhoud heeft vaak wel breadcrumbs en related-links, maar slechts 42 actieve pagina's hebben expliciete `silo`-metadata. Daardoor kan de automatische kwaliteitscontrole niet betrouwbaar afdwingen welke hub eigenaar is, welke pagina sibling is en wanneer een nieuw onderwerp buiten de kern valt.

Advies:

- vul na de freeze alleen redactionele silo-eigenaarschapmetadata in;
- wijzig geen bestaande URL's om de mappenstructuur mooier te maken;
- gebruik hubs en contextlinks om topical relaties zichtbaar te maken;
- maak een nieuwe URL pas wanneer de page job echt verschilt.

Status: `HOLD` voor governance, niet voor indexatie.

### P2. De auteurspagina is feitelijk maar bevat weinig verifieerbare bewijslaag

`/auteur/jan-kenis` bevat ongeveer 144 woorden en drie uitlegsecties. De pagina benoemt de redactionele rol en beperkingen, maar toont geen foto, publicatieoverzicht, concrete reviewverantwoordelijkheid of verifieerbare voorbeelden van bijgewerkte clusters.

Advies na de freeze:

- toon dezelfde echte foto als in de authorbox;
- voeg een automatisch publicatieoverzicht toe;
- beschrijf alleen feitelijk bevestigde ervaring en functies;
- link naar echte externe profielen;
- verzin geen opleiding, certificering, dossiers of beroepservaring.

Status: `HOLD`. Geen reden voor een onmiddellijke rewrite.

### P3. Het mobiele menudoel is 40 bij 40 pixels

De mobiele pagina's hebben geen horizontale overflow. De primaire formulierknoppen zijn groot en duidelijk. De zelfstandige menuknop meet 40 bij 40 pixels, kleiner dan de interne voorkeursgrens van 44 bij 44 pixels.

Status: `LOW UX`. Bij een toekomstige normale UI-release vergroten, niet als SEO-herstelactie.

## Inhoudelijke dekking

De 144 actieve MDX-pagina's bevatten samen ongeveer 192.172 woorden:

- gemiddeld 1.335 woorden;
- mediaan 1.175 woorden;
- 132 Article-pagina's;
- 7 Service-pagina's;
- 5 WebPage-pagina's;
- 141 pagina's tonen de introductie direct onder de H1;
- 144 pagina's hebben een leadformulier;
- 144 pagina's hebben FAQ's;
- 144 pagina's hebben related-links;
- 144 pagina's hebben `about` en `mentions`.

Vier grote gidsen verdienen na de freeze een handmatige compactheidscontrole, niet omdat lengte verkeerd is, maar omdat zij meer dan 3.000 woorden en ongeveer 50 of meer koppen bevatten:

- `/asbestattest`
- `/huis-verkopen-zonder-makelaar`
- `/huis-verkopen-verplichtingen/elektriciteitskeuring`
- `/huis-verkopen-verplichtingen/epc`

De controle moet alleen doublures, te late antwoorden en overlappende vervolgstappen verwijderen. Volledige informatie die de gebruiker nodig heeft, blijft behouden.

## Topical focus

De kern van de site is duidelijk:

- een vastgoedmakelaar zoeken en vergelijken;
- een woning verkopen, kopen, schatten of verhuren;
- attesten en verplichtingen rond vastgoedtransacties;
- kosten, notaris, registratierechten en financiering;
- actueel woningaanbod van aangesloten kantoren.

De volgende onderwerpen liggen verder van die kern en blijven HOLD voor uitbreiding:

- `/bestaande-vloer-isoleren`
- `/co2-meter-verplicht-in-huis`
- `/gras-afrijden-op-zondag`
- `/haag-hoogte`
- `/hoogte-brievenbus`
- `/overhangende-takken-buur`
- `/vanaf-hoe-laat-mag-je-lawaai-maken`
- `/verwarmen-met-airco`

Dit is geen verwijderadvies. De bestaande URL's kunnen gebruikersnut hebben. Er komen geen nieuwe varianten of aangrenzende clusters voordat de relatie met woningbeslissing, bronnen en interne route is bewezen.

## Templatebeoordeling

| Template | Status | Reden |
| --- | --- | --- |
| Homepage | PASS | Duidelijke waardepropositie, bewijsclaims, groot formulier en geen mobiele overflow |
| Kennisbankartikel | PASS | Direct antwoord, bronblok, auteur onder FAQ, contextlinks, related-links en één uitgesteld formulier |
| Kantoorprofiel | TECHNICAL HOLD | Eigen profieldata en BIV-controle zijn nuttig. Google-reviewmarkup moet worden verwijderd |
| Aanbodoverzicht | PASS | Alleen echte voorraad, filters, prijsrange, EPC en duidelijke beschikbaarheidswaarschuwing |
| Over ons | PASS | Eigenaar, ondernemingsnummer, rol en beperkingen zijn zichtbaar en feitelijk |
| Auteurspagina | PASS | Rolformulering, zichtbare auteursinformatie en Person-schema zijn consistent |
| Werkwijze | PASS | Legt controle, commerciële badges en beperkingen uit |
| Globale schema | PASS | WebSite globaal, Organization op homepage en over-ons, Person alleen waar inhoudelijk relevant |

## Wat de nieuwe PDF's niet bewijzen

De bronset bewijst niet dat de daling een specifieke spamstraf, schemafout, crawlbudgetprobleem of entiteitsfout was. Zij bewijst evenmin dat een knowledge panel, HTML-sitemap, exact-matchdomein, grote contentbatch of meer schema herstel zal veroorzaken.

De veiligste conclusie blijft:

- technische productie is stabiel;
- het grootste resterende controleerbare risico uit deze audit is de reviewmarkup op kantoorprofielen;
- GSC moet het effect per pagina- en querygroep bevestigen;
- brede wijzigingen vóór 16 september zouden de meting opnieuw vervuilen.

## Actievolgorde

### Toegestaan vóór 16 september 2026

1. Verwijder Google-reviewdata uit `aggregateRating` en `review` JSON-LD op kantoorprofielen.
2. Corrigeer de standaardbasis van productie-QA naar `.com` en behoud `.be` als redirecttest.
3. Maak een nieuwe, gedateerde post-migratiebaseline zonder de oude baseline te overschrijven.
4. Verzamel GSC-data read-only per afgesproken controlegroep.
5. Bereid claimregisters en bronvervangingen voor zonder pagina's te wijzigen.

Alleen de eerste twee acties zijn technische correcties. Deze audit heeft ze niet uitgevoerd.

### Niet uitvoeren vóór 16 september 2026

- geen nieuwe kennisbank- of locatie-URL's;
- geen bulkrewrite;
- geen URL-wijzigingen of consolidaties;
- geen massale interne-linkronde;
- geen title- of H1-experiment;
- geen indexeringsaanvragen;
- geen nieuw schema-experiment;
- geen knowledge-panelcampagne;
- geen link-, review- of press-releasecampagne.

### Op of na 16 september 2026

De controlepagina's worden eerst in vier groepen verdeeld:

1. positie stabiel en CTR hoger;
2. vertoningen of positie hoger met lage CTR;
3. juiste URL op positie 10 tot 20;
4. verkeerde URL of geen indexatie.

Daarna mag maximaal één gecontroleerde test worden gekozen voor `/kantoor` of `/woning-verkopen`. De bron- en interne-linkverbeteringen zijn al op 30 augustus uitgerold en mogen niet opnieuw onderdeel worden van die test.

## Eindstatus

| Onderdeel | Status |
| --- | --- |
| Technische crawlbaarheid | PASS |
| Migratiecanonicals en sitemap | PASS |
| Productie-QA | PASS op `.com`, toolingfix nodig |
| Review structured data | FAIL |
| Entity consistency | PASS |
| Bronnabijheid voor de 24 gemelde pagina's | PASS |
| Interne contextlinks | PASS |
| Kennisbankvorm en directe antwoorden | PASS |
| Lokale en programmatische schaal | FREEZE |
| Nieuwe SEO-experimenten | NIET TOEGESTAAN vóór 16 september 2026 |

De site is technisch klaar om stabiel te blijven draaien. Zij is nog niet klaar voor een nieuwe content- of templatebatch. De meetfreeze moet blijven gelden.
