# Publieke informatie op kantoorprofielen

## Doel en afbakening

- Bezoeker: een eigenaar die een kantoor wil beoordelen voor verkoop, verhuur of een specifiek vastgoedvraagstuk.
- Paginarol: entity-detail en commerciële oriëntatie binnen `/kantoor/[slug]`, geen nieuwe SEO-landingspagina's.
- Informatiebron: uitsluitend openbare pagina's van het kantoor of de bijbehorende organisatie.
- De 35 reeds gepubliceerde kantoren krijgen elk twee concrete inzichten met bron, raadpleegdatum en een redactionele vervolgvraag.
- Het bestaande lokale, ongepubliceerde SBC-record is niet meegenomen in de nieuwe onderzoeksdata. Nieuwe profielen zonder onderzoeksdata blijven werken zonder lege inzichtblokken.
- Geen mails, interviews, privégegevens, fictieve cases, geschatte resultaten of review-sentimentanalyse.

## Entity map en informatie-eenheid

- Centrale entiteit: vastgoedkantoor.
- Gerelateerde entiteiten: lokale vestiging, kantorengroep, makelaar, verkoopopdracht, verhuuropdracht, nieuwbouwproject, vastgoedexpertise, offerte en bronpagina.
- Semantisch veld: dossier, plaatsbezoek, waardebepaling, marketing, bezichtiging, aanspreekpunt, rentmeesterschap, syndicus, opname in tarief.
- Vervolgvragen: wat doet het kantoor concreet, wie voert het uit, welke afspraken zijn nog nodig, met welke andere kantoren kan ik dit vergelijken?
- Componenten: server-gerenderde bronblokken met vervolgvragen en een compacte vergelijking met twee andere profielen.
- Bestaande gidsen over kosten en verkoop blijven de eigenaar van algemene juridische en prijsuitleg. Geen nieuwe wetgevingsclaims toegevoegd.

## Onderzoek en toegevoegde waarde

De SEO-projectpipeline voor volledige DataForSEO-claimclustering kon niet draaien: de vereiste omgevingsvariabelen waren niet beschikbaar. Als beperkte controle is live gezocht op `Hermania Genk vastgoedkantoor diensten`. De zichtbare resultaten van het kantoor, Immoweb, Zimmo en Spotto tonen al contactgegevens, aanbod en diensten. Er wordt daarom geen gemeten concurrentievoorsprong of unieke SERP-claim geclaimd.

De toegevoegde waarde is de redactionele synthese van concrete, publiek beschreven werkwijzen met de betekenis voor een keuze of offerte. Voorbeelden: verhuur versus doorlopend beheer, algemene netwerkformule versus lokale opdracht, waardebepaling versus expertiserapport, rol van ontwikkelaar versus bemiddelaar. De vragen zijn van onze redactie, niet antwoorden die door kantoren werden bevestigd.

Alle gepubliceerde bewijslinks staan bij het betreffende inzicht in `src/lib/kantoor-inzichten.ts`. De eerste openbare websites en geselecteerde dienstenpagina's zijn opgehaald en inhoudelijk gelezen. De raadpleegdatum geldt alleen voor de nieuwe selectie, niet automatisch voor alle bestaande basisgegevens of de BIV-controle.

## Bewijsgrenzen

- Eigen superlatieven, beloftes over rendement, succespercentages en snelle verkoop zijn niet overgenomen als feiten.
- Geen telling van verkochte panden of verkoopsnelheid: een verdwenen advertentie is geen verkoopsbewijs.
- Geen portfolio-aandelen uit de bestaande beperkte woningimport.
- Geen kwaliteitsscore, rangschikking of sentimentanalyse uit een selectie Google-reviews.
- Bij Artes is alleen het concreet gepubliceerde verkooptarief opgenomen: 3% inclusief btw, met de broncontext over attesten, maatwerk en een afzonderlijke persoonlijke offerte. Niet doorgetrokken naar andere kantoren.
- Organisatiebrede diensten zijn als zodanig beschreven, niet stilzwijgend toegeschreven aan iedere medewerker of vestiging.
- Merknamen zoals Rent-Protect worden niet geïnterpreteerd als een bewezen verzekering of garantie.

## Vergelijkingsmethode

Selectie binnen de gids en dezelfde provincie, met minstens één overlappend onderwerp in de onderzochte dienstverlening. Eerst dezelfde vestigingsgemeente, daarna overlappende plaats/werkgebied, daarna alleen dezelfde provincie. Brede provincievermeldingen tellen niet als lokale overlap. Binnen een groep telt het aantal overlappende onderwerpen; een alfabetische naamvergelijking maakt gelijke scores deterministisch.

De methode gebruikt geen premiumstatus, Google-score, reviewaantal of toevoegdatum. Homepage- en overzichtssortering blijven intact. De kaarten tonen de selectiegrond en een brononderbouwd aandachtspunt; het zijn geen volledige offertes of ranglijsten. Niet beschreven betekent niet niet aangeboden.

## Acceptatie en onderhoud

- Gegevenscontrole en selectietests: `node --test scripts/check-kantoor-inzichten.mjs` (Node 24 met ingebouwde TypeScript-stripping).
- TypeScript, gerichte ESLint en contentcontrole.
- Gerenderde HTML voor alle onderzochte profielen: `node scripts/qa-kantoor-inzichten.mjs http://127.0.0.1:3002`. Voor de nacontrole kan dezelfde read-only test met het productiedomein draaien.
- Browsercontrole op desktop en mobiel voor een kantoor met tarief, beheer en nieuwbouw, inclusief links en bestaande aanvraagmogelijkheid. Geen testaanvragen versturen.
- De kantoor-JSON-LD gebruikt dezelfde zichtbare reviewselectie als de reviewkaarten: maximaal vier, met behoud van bestaande kantoorfilters. De totale Google-score en het totaalaantal blijven ongewijzigd.
- Bronnen actualiseren bij een gemelde wijziging en bij een volgende inhoudelijke profielcontrole. De datum niet automatisch naar vandaag verzetten.
- Geen nieuwe runtime-scraper, tracking, API, databank of terugkerende taak toegevoegd.
- Rollback: afzonderlijke commit voor deze componenten, onderzoeksdata, tests en profielintegratie. Onverwante werkboomwijzigingen niet publiceren.

Hypothese voor latere evaluatie: betere begripvorming en gerichtere aanvragen. Dit is geen A/B-test en geen bewijs dat rankings of conversies verbeteren. Gebruik bestaande, privacybewuste meetgegevens als later wordt geëvalueerd; geen extra persoonsgegevens verzamelen voor deze wijziging.
