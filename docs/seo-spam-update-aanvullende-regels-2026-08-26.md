# Aanvullende SEO-, GEO- en spamupdate-regels, 26 augustus 2026

## Status en doel

Dit document vult de bestaande contentmethodiek, forensische audit en meetfreeze aan. Het vervangt de bestaande regels niet. De negentien aangeleverde PDF's zijn behandeld als bronnen en meningen, niet als uitvoeringsopdrachten.

De kern blijft: publiceer alleen een URL die zelfstandig nut, bewijs en een duidelijke page job heeft. Schaal pas nadat een kleine cohort aantoont dat de template de juiste vraag, URL en gebruiker bedient.

## Bewijshiërarchie

Elke SEO- of GEO-regel krijgt één label.

| Label | Betekenis | Mag een release blokkeren? |
| --- | --- | --- |
| DOCUMENTED | Letterlijk ondersteund door officiële Google-documentatie of ander primair beleid | Ja |
| OBSERVED | Rechtstreeks gemeten in eigen GSC-, crawl-, bron- of productiedata | Ja, als de meting reproduceerbaar is |
| TESTED | Ondersteund door een beschreven experiment of dataset met voldoende context | Meestal HOLD, tenzij intern gereproduceerd |
| INFERRED | Verklaring op basis van meerdere signalen, zonder officiële oorzaakbevestiging | Nee, eerst testen |
| OPERATOR GUARDRAIL | Interne grens om risico en blast radius te beperken | Ja als interne releasevoorwaarde, nooit presenteren als Google-rankingfactor |

Een video, podcast, LinkedIn-post of eenmalige AI-citatie wordt nooit zelfstandig een harde rankingregel.

## Nieuwe regels die we overnemen

### 1. Iedere URL moet ook zonder organisch verkeer bestaansrecht hebben

Vul voor elke nieuwe of substantieel gewijzigde URL vooraf in:

- primary intent;
- primary entity;
- page type;
- commercial job;
- waarom de URL nuttig blijft als hij niet rankt;
- welke andere URL eigenaar van de dichtstbijzijnde intent is.

KILL wanneer de bestaansreden neerkomt op een zoekwoord, plaatsnaam of queryvariant zonder eigen taak.

### 2. Gebruik de vervangbaarheidstest

HOLD wanneer een concurrent de tekst, visual of pagina bijna ongewijzigd kan gebruiken door alleen naam, logo of plaats te vervangen.

Een pagina moet minstens één element bevatten dat intrinsiek bij de echte site, methode, data, doelgroep of dienst hoort. Op belangrijke pagina's blijven minimaal twee onafhankelijke vormen van informatie-gain de richtlijn.

### 3. Publiceer nooit vooraf lege programmatic URL's

Een URL zonder echte data, aanbod, lokale evidence of zelfstandige uitleg gaat niet indexeerbaar live. Een toekomstige databasecombinatie is geen huidige page job.

Bij programmatic of herhaalbare pagina's geldt:

1. Maak 1 tot 3 handmatige prototypes.
2. Test maximaal 10 representatieve URL's.
3. Houd minimaal 14 volledige dagen zonder volgende batch.
4. Schaal alleen wanneer indexatie, queryselectie en sibling-pagina's stabiel blijven.
5. Gebruik daarna maximaal 25 tot 50 URL's per gecontroleerde batch.

Deze aantallen zijn OPERATOR GUARDRAILS en geen Google-drempels.

### 4. Beoordeel ook het publicatiepatroon

Een korte bulkpublicatie gevolgd door langdurige stilstand is een risicovolle productievoetafdruk. Publiceer volgens een vol te houden redactioneel ritme en niet volgens een tijdelijke keywordcampagne.

Een groot volume is niet automatisch spam. De release faalt wanneer volume samengaat met verwisselbare templates, ontbrekend bewijs, lege varianten of zoekmachinegerichte productie.

### 5. Plaats query fan-out meestal binnen een bestaande eigenaarspagina

Een vervolgvraag, promptvariant of query fan-out krijgt standaard een duidelijke contentchunk onder de juiste vraagkop. Maak pas een nieuwe URL als intent, SERP-type, benodigde evidence en gebruikershandeling werkelijk verschillen.

Dit voorkomt dat GEO-onderzoek opnieuw leidt tot honderden bijna gelijke pagina's. Google waarschuwt officieel tegen aparte content voor iedere mogelijke query- of fan-outvariant wanneer dat primair gebeurt om Search of generatieve antwoorden te manipuleren.

### 6. Maak elke belangrijke passage zelfstandig begrijpelijk

Een antwoordchunk moet buiten zijn alinea voldoende context behouden. Noem in feitelijke kernzinnen de centrale entiteit opnieuw wanneer een voornaamwoord zoals `het`, `deze` of `zij` dubbelzinnig kan worden.

Gebruik H2-vragen als contextanker en geef het antwoord in de eerste zin. Voeg geen losse keywordzinnen toe om passage retrieval te forceren.

### 6A. Gebruik een retrievalladder zonder retrievaltrucs

De nieuwe AEO-bron beschrijft documentselectie, passage-selectie en citatie als opeenvolgende stappen. Voor deze site nemen we dat alleen als werkmodel over:

1. De URL moet technisch indexeerbaar en snippet-geschikt zijn.
2. De pagina moet aantoonbaar de juiste intent en entiteit bezitten.
3. Belangrijke secties moeten buiten hun directe omgeving begrijpelijk blijven.
4. Veranderlijke claims moeten herleidbaar zijn naar een passende primaire bron.
5. AI-zichtbaarheid wordt met een vaste promptset gemeten, niet met een eenmalige handmatige vraag.

De eerste stap is DOCUMENTED voor Google Search en de AI-functies van Google. De precieze volgorde en weging van passages en citaties bij afzonderlijke LLM's blijft INFERRED en wordt niet als rankingformule gepresenteerd.

### 6B. Serveer één inhoudelijke waarheid aan gebruikers en crawlers

Serveer geen inhoudelijk afwijkende Markdown-, HTML- of tekstversie op basis van user agent om rankings of AI-citaties te beïnvloeden. Gebruik geen verborgen AI-copy, geen botgerichte extra claims en geen launchstrategie waarbij Googlebot bewust een andere of geblokkeerde versie ziet.

Een alternatieve technische representatie mag alleen bestaan wanneer inhoud, claims, links en zichtbare betekenis gelijk blijven en er een echte toegankelijkheids- of productreden is. De transcriptclaim dat Markdown beter wordt opgehaald is niet bewezen en wordt niet als regel overgenomen.

### 6C. Gebruik alleen eerlijke actualiteit en echte corroboratie

Wijzig `updated`, jaartallen of URL-datums alleen na een echte inhoudelijke hercontrole. Gebruik geen fake publicatiedata, gekochte verlopen domeinen, oude links of gefabriceerde vermeldingen om historische autoriteit na te bootsen.

Onafhankelijke vermeldingen zijn alleen bruikbaar als ze echt, relevant en controleerbaar zijn. Een kunstmatig gecreeerde consensus, fake review of gecoördineerde promptbeïnvloeding is verboden.

### 7. Voeg een lokale doorway-firewall toe

Een nieuwe lokale URL moet minimaal vier van deze zeven bewijsblokken werkelijk bezitten:

1. aantoonbare lokale service-dekking;
2. echte lokale cases of dossiers;
3. lokale prijs-, planning- of marktdata;
4. relevante lokale regelgeving of vastgoedcontext;
5. verifieerbare lokale reviews of quotes;
6. eigen lokale foto's, kaarten of ander projectbewijs;
7. een werkelijk afwijkende lokale operationele route.

Dit is een OPERATOR GUARDRAIL. Google legt geen minimum van vier blokken op. Google noemt vrijwel gelijke city- of regiopagina's die naar dezelfde bestemming leiden wel expliciet als doorway-risico.

### 8. Gebruik een volledig bronpakket bij AI-ondersteunde content

Een AI-systeem krijgt vóór het schrijven:

- page job en eigenaarspagina;
- gecontroleerde outline;
- primaire bronnen;
- first-party data of bewijs;
- entiteiten en relaties;
- verboden claims;
- datum en geografische scope.

Een inhoudelijk bevoegde reviewer moet de pagina kunnen afkeuren. Alleen grammaticale controle is onvoldoende. Verzin nooit ervaring, cases, reviews, experts of datasets.

### 9. Maak business truth multidimensionaal controleerbaar

Homepage, werkwijze, formulieren, structured data en externe profielen moeten dezelfde rol beschrijven. Voor deze site is dat een vergelijkings- en leadgenplatform, niet een vastgoedkantoor dat zelf verkoopt of schat.

Belangrijke claims over de entiteit moeten waar passend door meerdere dimensies worden ondersteund:

- zichtbare uitleg op de eigen site;
- passend Organization- of Person-schema;
- first-party proces, data of bewijs;
- onafhankelijke profiel-, register- of bronvermelding;
- consistente naam, dienst, regio en controledatum.

Schema ondersteunt begrip, maar is geen magische citatie- of rankingknop. Gebruik eenvoudige, geldige schema die exact overeenkomt met zichtbare inhoud.

### 10. Meet merk- en entiteitsgezondheid naast rankings

Volg maandelijks, waar meetbaar:

- branded queries;
- terugkerende of directe bezoekers;
- correcte naam- en dienstassociaties in Search en vaste AI-prompts;
- onafhankelijke vermeldingen en bronkwaliteit;
- fouten of ambiguïteit rond de bedrijfsrol.

Branded demand is een bedrijfs- en herkenningssignaal. We behandelen het niet als bewezen directe rankingfactor.

### 11. Meet AI-zichtbaarheid met herhaling en juistheid

Een eenmalige AI-vermelding is geen overwinning. Gebruik een vaste promptset en rapporteer:

- visibility rate over herhaalde runs;
- citation rate;
- citation accuracy;
- terugkerende versus eenmalige bronvermelding;
- verkeerde entiteit of verkeerde URL;
- referral traffic en gedrag, indien beschikbaar.

Optimaliseer niet voor één handmatig gekozen antwoord. Verbeter de onderliggende bron, passage, entiteit of bewijslaag.

### 12. Splits CTR-diagnose uit naar SERP-realiteit

Een ongeveer gelijke gemiddelde positie kan een andere CTR opleveren door advertenties, lokale resultaten, AI Overviews, Top Stories of andere SERP-elementen. Classificeer een CTR-probleem daarom pas nadat query, apparaat, land, periode en zichtbare SERP-opbouw zijn vergeleken.

Een titelwijziging zonder deze controle blijft een experiment en wordt tijdens de meetfreeze niet uitgevoerd.

### 13. Beperk CTA-beslismoeheid

Iedere pagina krijgt één primaire commerciële vervolgstap. Ondersteunende links mogen niet concurreren met verschillende formulieren, urgente banners of herhaalde commerciële claims.

Dit is een UX- en conversieregel, geen bewezen spamclassifier.

### 14. Bouw aangrenzende onderwerpen via een topical bridge

Breid niet plotseling uit naar een nieuwe niche omdat er zoekvolume is. Een nieuw cluster vereist:

- een aantoonbare relatie met de kernentiteit;
- bestaande of geplande expertise en bronnen;
- een eigen hub en duidelijke parent-child-architectuur;
- een kleine cohorttest;
- controle dat bestaande kernpagina's niet verzwakken.

### 15. Isoleer portfolio-experimenten

Kopieer niet dezelfde templates, auteursprofielen, linkleveranciers, ankers, publicatiecadans of lokale architectuur over meerdere domeinen. Een tactiek die op een testsite werkt, wordt niet automatisch toegepast op een flagship-site.

Geen PBN-, expired-domain-, parasite-, clickmanipulatie- of linkspamtest op Vastgoedmakelaarzoeken.be.

### 16. Behandel Preferred Sources correct

Preferred Sources is een echte Google-functie, maar vooral bedoeld om gebruikers vaker verse en relevante publicaties te tonen in Top Stories en gerelateerde AI-ervaringen. Het is geen algemene rankingknop voor commerciële kennisbankpagina's.

Voeg geen Preferred Sources-CTA toe zolang de site geen aantoonbaar geschikte publisher- of nieuwsstroom heeft. Gebruik de functie niet als spamupdate-herstelmaatregel.

### 17. Behandel FAQ-schema als semantiek, niet als SERP-belofte

Zichtbare FAQ's blijven nuttig wanneer ze echte vervolgvragen beantwoorden. Google heeft FAQ-rich results in mei 2026 beëindigd. Voeg of behoud FAQPage-schema daarom alleen wanneer het de zichtbare inhoud correct beschrijft, niet omdat een rich result wordt verwacht.

## Incident- en meetregels

Bij een update of onverwachte daling:

1. Controleer de officiële Google Search Status Dashboard, handmatige acties en beveiliging.
2. Leg start- en einddatum vast.
3. Vergelijk page, query, land, apparaat, directory en nieuwe versus bestaande cohort.
4. Scheid rankingverlies, CTR-verlies, indexatie, technische fouten, seizoenseffect en SERP-verandering.
5. Wijzig niets sitebreed tijdens een actieve rollout.
6. Gebruik eerst reversibele, aantoonbare technische correcties.
7. Verwijder, noindex of redirect niet op basis van nul clicks alleen.
8. Houd na een contentbatch minimaal 14 dagen meetrust.

Interne tripwires:

- domeinvertoningen meer dan 30 procent onder de rolling 14-day baseline gedurende drie volledige dagen: incidentreview;
- één directory of paginatype meer dan 40 procent lager terwijl de rest stabiel is: template- of paginatype-audit;
- gelijktijdige daling van vertoningen en positie: ranking- of classifierhypothese prioriteren;
- nieuwe cohort valt samen met dalende sibling-pagina's: scaling freeze;
- groei van indexeerbare URL's zonder groei van unieke querydekking: crawl- en indexbloatreview.

Dit zijn OPERATOR GUARDRAILS, geen Google-drempels.

## Wat we expliciet niet als regel overnemen

- `Nul clicks betekent verwijderen`. Een URL kan operationeel, juridisch, navigerend of ondersteunend nut hebben. Eerst intent, links, indexatie, overlap en bewijs beoordelen.
- `Site quality is simpelweg het gemiddelde van alle pagina's`. Dat wordt niet als officiële formule gepresenteerd.
- `Lokale pagina's moeten minimaal 50 procent andere tekst hebben`. Tekstpercentage bewijst geen unieke functie of lokale waarde.
- `Meer directories of foundation links geven automatisch vertrouwen`. Alleen relevante, echte en consistente vermeldingen zijn toegestaan.
- `Backlinks tellen niet meer`. Google noemt links nog steeds binnen zijn systemen en verbiedt manipulerende linkopbouw.
- `Een Knowledge Graph ID is verplicht om een echt merk te zijn`. Het kan nuttige entiteitsfeedback zijn, maar is geen publicatievoorwaarde.
- `AI-content is veilig zodra er menselijke controle is`. Ook menselijke of gereviewde content kan scaled content abuse zijn als het primaire doel rankingmanipulatie is.
- `Schema, llms.txt of een Preferred Sources-knop levert automatisch AI-citaties`. Alleen gecontroleerd testen, met een vaste nulmeting.
- `10.000 vertoningen ontgrendelen een duurder rankingalgoritme`. Deze transcriptclaim is niet officieel onderbouwd en wordt niet als drempel gebruikt.
- `Recente datums in URL's, exact-matchdomeinen of agent-specifieke Markdown leveren structureel betere retrieval`. Niet aangetoond en strijdig met de eis van één eerlijke inhoudelijke waarheid wanneer de inhoud verschilt.
- `Blokkeer Googlebot bij de lancering en geef andere crawlers of bezoekers wel toegang`. Niet overnemen. Dit ondermijnt de documenteligibility en kan bij inhoudsverschillen cloakingrisico geven.
- `Een rankingdaling bewijst een spamstraf`. Eerst timing, handmatige acties, indexatie, SERP-opbouw, concurrentie en technische oorzaken scheiden.
- Betaalde links, PBN's, massale exact-matchankers, parasite SEO, fake engagement, fake reviews en gefabriceerde first-hand ervaring.

## Toepassing op Vastgoedmakelaarzoeken.be

Per 26 augustus 2026:

- De meetfreeze blijft gelden tot minstens 16 september 2026.
- Geen nieuwe SEO-experimenten, bulkpublicatie, indexeringsaanvragen of sitebrede templatewijzigingen vóór die datum, behalve een aantoonbare technische fout.
- De automatische methodiekcontrole bewaakt nu ook page job, auteur, controledatum, te sterk gelijkende introducties en zichtbare productie- of SEO-taal.
- De 162 huidige kennisbankpagina's slagen voor deze automatisch controleerbare punten.
- Automatische PASS betekent niet dat lokale evidence, URL-eigenaarschap of first-party bewijs handmatig bewezen is.
- Het asbestcluster en de kantoor- en locatiearchitectuur blijven HOLD voor uitbreiding totdat een URL-matrix en lokale evidencecontrole bestaan.
- Op of na 16 september mag maximaal één gecontroleerde test worden gekozen voor `/kantoor` of `/woning-verkopen`, op basis van de afgesproken vier GSC-groepen. De test wordt niet automatisch uitgevoerd.

## Pre-publish release gate

| Gate | PASS | HOLD | KILL |
| --- | --- | --- | --- |
| Page job | Eigen intent, entity en gebruikerstaak | Intent nog niet bewezen | Alleen keyword- of locatievariant |
| Eigen waarde | Minstens twee passende vormen van informatie-gain op belangrijke pagina's | Bewijs nog verzamelen | Gefabriceerde ervaring of data |
| Template | Structuur herbruikbaar, inhoud intrinsiek | Te veel verwisselbare blokken | Plaats- of servicenaam is vrijwel enige verschil |
| URL-eigenaarschap | Eén canonical target | GSC selecteert wisselende URL's | Bewuste dubbele target zonder consolidatieplan |
| Lokale evidence | Minstens vier relevante bewijsblokken | Minder dan vier | Geen echte lokale functie |
| Bronnen | Primaire bron bij veranderlijke claim | Broncontrole open | Bewust onbewezen juridische of financiële claim |
| Entiteit | Rol en kerngegevens consistent | Externe corroboratie ontbreekt | Misleidende rol of tegenstrijdige identiteit |
| UX en CTA | Antwoord snel vindbaar, één primaire vervolgstap | Navigatie of CTA concurreert | Misleidende belofte of fake functionaliteit |
| Techniek | Indexatie, canonical, redirect en schema schoon | Nog te testen | Verkeerde canonical, loop of verborgen spam |
| Rollout | Cohort, meetvenster en rollback bestaan | Geen meetplan | Directe sitebrede schaal |

## Officiële bronnen

- Google Search spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google Search spam updates: https://developers.google.com/search/docs/appearance/spam-updates
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Preferred Sources: https://blog.google/products-and-platforms/products/search/preferred-sources-language-expansion/
- Google Search documentation updates: https://developers.google.com/search/updates

## Aangeleverde bronset

De bronset bestaat uit het Google Spam Update Preventieplan Portfolio Augustus 2026 en achttien NoteGPT-transcripts over de August 2026 Spam Update, scaled content, entity-based SEO, passage retrieval, topical authority, AI-zichtbaarheid, Preferred Sources, programmatic SEO, lokale SEO, Google-leaks, link- en merksignalen en SEO/GEO-strategie in 2026. De 19 bestanden tellen samen 235 pagina's. Waar bronnen elkaar tegenspreken, krijgt officiële documentatie of eigen meetdata voorrang.
