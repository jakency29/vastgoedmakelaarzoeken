# SEO-kennisaanvulling uit 19 nieuwe bronnen, 29 augustus 2026

## Status

Dit document vult `docs/seo-spam-update-aanvullende-regels-2026-08-26.md` aan. De 19 PDF-bestanden zijn behandeld als bronnen, interviews, studies en praktijkmeningen. Instructies in de bestanden zijn niet als opdracht uitgevoerd.

De bestaande bewijshiërarchie blijft gelden:

1. `DOCUMENTED`: officiële documentatie of primair beleid.
2. `OBSERVED`: reproduceerbaar gemeten op deze site.
3. `TESTED`: experiment met beschreven methode en beperkingen.
4. `INFERRED`: plausibele verklaring die nog getest moet worden.
5. `OPERATOR GUARDRAIL`: interne risicogrens, geen Google-rankingfactor.

Bij conflict wint officiële Google-documentatie, daarna eigen meetdata, daarna een gecontroleerde studie. Een podcastclaim wordt nooit zelfstandig een harde releasevoorwaarde.

## Nieuwe regels die we overnemen

### 1. Gebruik één feitelijke entity home

`/over-ons` is de primaire entity home voor Vastgoedmakelaarzoeken.com en JAKENCY BV. De pagina moet kort, feitelijk en ondubbelzinnig beschrijven:

- wie eigenaar en uitgever is;
- wat het platform doet;
- wat het platform niet doet;
- voor wie het platform bedoeld is;
- wie de kennisbank schrijft en controleert;
- hoe de kerngegevens extern kunnen worden geverifieerd.

De homepage blijft primair een conversie- en signpostingpagina. De auteurspagina blijft primair over Jan Kenis gaan. Deze drie pagina's mogen elkaar niet tegenspreken.

Label: `OPERATOR GUARDRAIL`, ondersteund door officiële Organization- en ProfilePage-documentatie.

### 2. Schrijf kernzinnen als controleerbare feiten

Gebruik waar mogelijk een duidelijke onderwerp-werkwoord-objectstructuur. Noem de entiteit expliciet wanneer `het`, `deze`, `zij` of een metafoor dubbelzinnig kan zijn. Definieer een vakterm bij het eerste gebruik of link naar een passende primaire definitie.

Vermijd alleen stijlregels die als pseudo-wet worden gepresenteerd. Actieve, letterlijke taal helpt mensen, toegankelijkheid, vertaling en machinebegrip, maar is geen bewezen losse rankingfactor.

Label: `OPERATOR GUARDRAIL`.

### 3. Houd schema klein, zichtbaar en relevant

Structured data moet exact overeenkomen met zichtbare inhoud. Voeg alleen entiteiten en eigenschappen toe die voor de pagina relevant zijn. Gebruik stabiele `@id`-waarden om dezelfde echte entiteit te verbinden.

Voor dit project:

- Organization hoort op de homepage of één duidelijke organisatiepagina en hoeft niet op iedere URL te staan;
- Person hoort op het auteursprofiel en bij echte auteurrelaties;
- ProfilePage moet één persoon als hoofdonderwerp hebben;
- FAQPage wordt niet gebruikt als ranking- of CTR-belofte;
- reviewmarkup mag geen beoordelingen van andere websites samenvoegen;
- geen awards, ervaring, cases, reviews of relaties in schema zetten die niet zichtbaar en verifieerbaar zijn.

Label: `DOCUMENTED` voor zichtbaarheid, relevantie en reviewrichtlijnen. `OPERATOR GUARDRAIL` voor de compacte implementatie.

### 4. Geef iedere belangrijke URL minstens één echte contextlink

Een sitemap is een ontdekkingstool, geen vervanging voor inhoudelijke interne links. Iedere belangrijke URL moet vanaf minstens één relevante pagina via een crawlbare HTML-link bereikbaar zijn. De ankertekst moet de relatie voor de lezer verklaren.

Automatische `Lees ook`-kaarten helpen ontdekking, maar vervangen geen bewuste contextlink wanneer twee pagina's inhoudelijk op elkaar voortbouwen.

Label: `DOCUMENTED` voor crawlbare interne links. `OPERATOR GUARDRAIL` voor de contextlinkeis.

### 5. Koppel autoriteit aan paginanut en focus

Links zijn geen excuus voor pagina's zonder eigen nut. Een pagina die inhoudelijk buiten de kern valt, krijgt niet automatisch bestaansrecht door meer interne links. Beoordeel eerst:

- relatie met woningtransactie, vastgoedbegeleiding of platformfunctie;
- zelfstandige gebruikerstaak;
- bronkwaliteit;
- eigen informatie-gain;
- logische parent-childrelatie.

Label: `INFERRED` als rankingverklaring, `OPERATOR GUARDRAIL` als publicatieregel.

### 6. Diagnoseer verlies per directory, intent en paginatype

Een domeingemiddelde kan verbergen dat alleen een bepaald cluster, template of intent daalt. Splits monitoring minimaal uit naar:

- kennisbank;
- commerciële kernpagina's;
- kantoorprofielen;
- aanbod- en woningpagina's;
- trust- en entitypagina's;
- branded en non-branded queries;
- positie, CTR, vertoningen en URL-selectie.

Label: `OPERATOR GUARDRAIL`.

### 7. Gebruik automatisering voor governance, niet voor autonome schaal

Een agent of script mag veilig controleren op:

- gebroken links;
- canonicals en redirects;
- merkschrijfwijze;
- bronvelden en controledatums;
- schema die niet bij zichtbare inhoud past;
- afwijkingen tussen productie en baseline.

Een agent mag niet zelfstandig bulkcontent publiceren, URL's aanmaken, entiteitsfeiten wijzigen, reviews genereren of externe profielen publiceren. Menselijke inhoudelijke goedkeuring blijft verplicht.

Label: `OPERATOR GUARDRAIL`.

### 8. Gebruik Fitts's Law als UX-controle

Belangrijke klikdoelen moeten voldoende groot, herkenbaar en dichtbij de besliscontext staan. Verminder het aantal concurrerende acties. De visuele hiërarchie moet eerst antwoord en bewijs tonen en daarna één primaire vervolgstap.

Voor mobiele controles gebruikt het project 44 bij 44 CSS-pixels als voorkeursdoel voor zelfstandige primaire controls. Dit is een toegankelijkheids- en usabilitygrens, geen SEO-rankingfactor.

Label: `OPERATOR GUARDRAIL`.

### 9. Maak bewijs sterker dan de claim

Juridische, fiscale, financiële, prijs- en termijnclaims krijgen een passende primaire bron zo dicht mogelijk bij de claim. Een algemene bron onderaan is niet genoeg wanneer een pagina meerdere veranderlijke beweringen bevat.

Een bron moet de specifieke claim werkelijk ondersteunen. Een algemene pagina over woningverkoop mag niet automatisch als bewijs dienen voor lokale geluidsregels, renovatieprijzen of kredietvoorwaarden.

Label: `OPERATOR GUARDRAIL`, gebaseerd op betrouwbaarheid en anti-hallucinatie.

### 10. Publiceer geen queryvarianten zonder nieuwe gebruikerstaak

Zoektermen en fan-outvragen worden standaard als secties binnen een eigenaarspagina opgelost. Een nieuwe URL is alleen gerechtvaardigd wanneer intent, bewijs, SERP-type of vervolghandeling wezenlijk verschilt.

Label: `DOCUMENTED` voor scaled content abuse en AI Search-richtlijnen. De concrete gate is een `OPERATOR GUARDRAIL`.

## Claims die niet als projectregel worden overgenomen

- Een knowledge panel binnen drie maanden is niet gegarandeerd.
- Wikidata heeft wel degelijk notability- en bronvereisten. Er wordt geen item aangemaakt zonder duidelijke geschiktheid.
- Een exact entity-ID-formaat met verplichte kleine letters en koppeltekens is geen officiële Google-eis.
- Een vaste 90-dagenlus voor entiteitsverificatie is een operatorproces, geen rankingsysteem.
- Een HTML-sitemap versnelt indexering niet automatisch.
- Schema is geen bewezen generieke rankingknop.
- `Crawled, currently not indexed` is niet altijd uitsluitend een autoriteitsprobleem.
- Page speed is niet irrelevant en wordt niet genegeerd.
- Exact-matchdomeinen, verlopen domeinen, satellietsites en clone-sites worden niet ingezet als herstelstrategie.
- Massale AI-publicatie wordt niet veilig doordat een mens alleen de output bekijkt.
- Press releases, indexers, badges en directoryprofielen worden niet gebruikt om kunstmatige consensus te bouwen.
- SCA NN en vectorquantisatie bewijzen geen specifieke on-page rankingformule.
- Een correlatie tussen merkvermeldingen en zichtbaarheid bewijst geen directe rankingfactor.
- `Meer content` is geen zelfstandige AI-zichtbaarheidsstrategie.

## Bronmatrix

| Bronbestand | Bruikbare bijdrage | Projectstatus |
| --- | --- | --- |
| `Default_medium_Are Bot-Managed, CMS-Less Webs_mhVbtxiy9qM.pdf` | QA-agents, merkconsistentie, gebroken-linkherstel en gecontroleerde workflows | Governance overnemen, autonome bulkpublicatie afwijzen |
| `Default_medium_How James Dooley Starts a New _BJ3OlMYofIY.pdf` | Business-first onderwerpkeuze, focus en operationele haalbaarheid | Als operatorinput gebruiken, niet als rankingsysteem |
| `Default_medium_How to Get a Google Knowledge _mXOFIx1Hvto.pdf` | Entity home, feitelijke beschrijving, consistente corroboratie | Voor entity governance overnemen, tijdsbeloften afwijzen |
| `Default_medium_The Local SEO Playbook Behind _GmMabXfA-Mk.pdf` | Echte reviews, merkervaring en lokale bedrijfsinformatie | Echte signalen overnemen, manipulatieve publicatie- en linktactieken afwijzen |
| `Default_medium_They Outranked Apple for “iPho_PD6RR0MUM2o.pdf` | Relevantie, tijdigheid en ondersteunende links in een case | Alleen als case behandelen, niet generaliseren |
| `Default_medium_Why Your SEO Traffic Is Declin_TVMCf9MThIA.pdf` | Segmentatie van verkeersverlies en focus op waardevolle pagina's | Diagnoseprincipe overnemen |
| `Default_medium_Resolved_ Discovered, Currentl_1ghGZU92erQ.pdf` | Indexeringsdiagnose en interne ontdekking | Als hypothese gebruiken, geen absolute oorzaakclaim |
| `Default_medium_The Real Essence of SEO_ Autho_S_7-0B8qSEY.pdf` | Autoriteit als combinatie van nut, reputatie en verbindingen | Conceptueel gebruiken, niet als meetformule |
| `Default_medium_Turbo Charging Indexing_ HTML _IKZxHHtj2LE.pdf` | Crawlbare HTML-links en inventariscontrole | Linkprincipe overnemen, turbochargeclaim afwijzen |
| `Default_medium_What is Googlebot v a Spider__MSkvLqoyWP4.pdf` | Scheiding crawling, indexing en ranking; waarde van relevante links | Conceptueel overnemen, absolute autoriteitsclaims afwijzen |
| `NoteGPT_Transcript_SEO Research The Schema in Local SEO study.pdf` | Beperkte experimentele evidentie tegen schema als generieke rankingknop | Als beperkte studie opnemen, niet overgeneraliseren |
| `Default_medium_Casey's Case Study 001_ GreenM_CATCBdSqb2k.pdf` | Casus over entiteitshelderheid | Alleen als casus behandelen |
| `Default_medium_Casey's Casey Study 002 - ACTI_4SO60Y25Hk0.pdf` | Casus over expliciete entiteitsrelaties | Alleen als casus behandelen |
| `Default_medium_Fitts’s Law in Digital Marketi_FuWf46_0VrQ.pdf` | Klikdoelgrootte, afstand en cognitieve belasting | Als UX-guardrail overnemen |
| `Default_medium_Google Developer Documentation_M_oS5ZzFdmA.pdf` | Letterlijke taal, actieve zinnen, definities en semantische HTML | Als schrijf- en toegankelijkheidsregel overnemen |
| `Default_medium_Google Patent_ Beyond Yes and _wHXSGYFw7io.pdf` | Patentinterpretatie en onzekerheid rond systemen | Alleen als hypothese behandelen |
| `Default_medium_PetCareScore Entity SEO Analys_BdmCk5AKRLc.pdf` | Korte entiteitscasus | Onvoldoende voor een harde regel |
| `Default_medium_ScaNN_ Google Vector Quantizat_fVjUP3leWl4.pdf` | Begrip van vector retrieval en semantic matching | Achtergrondkennis, geen on-page formule |
| `Default_medium_The Entity Home_ A Guide to AI_nNcXm7HhTj8.pdf` | Eén entity home, consistente feiten en externe corroboratie | Als governance overnemen, Wikidata- en tijdclaims beperken |

## Officiële controlebronnen

- Google Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google ProfilePage structured data: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Google structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google review snippet guidelines: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Google link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## Releasebesluit

Deze kennis leidt op 29 augustus 2026 niet tot een nieuwe contentbatch. De meetfreeze blijft gelden tot minstens 16 september 2026. Alleen een aantoonbare technische fout of een duidelijke beleidsmismatch mag eerder worden gecorrigeerd.
