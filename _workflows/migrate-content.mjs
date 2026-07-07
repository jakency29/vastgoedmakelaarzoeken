export const meta = {
  name: 'migrate-content',
  description: 'Migreer WP-pagina naar compliant MDX: fetch, SERP-check, herschrijven, verifiëren',
  phases: [
    { title: 'Migreren', detail: 'per pagina: live content ophalen, cijfers verifiëren, compliant MDX schrijven' },
    { title: 'Verifiëren', detail: 'per pagina: harde regels en structuur controleren' },
  ],
}

const ROOT = 'C:/Users/jakency/.claude/vastgoedmakelaarzoeken'

// Slugs die zowel een eigen pagina zijn als kinderen hebben -> schrijf naar <slug>/index.mdx.
const HUBS = new Set([
  'asbestattest',
  'asbestattest/asbestinventaris',
  'huis-verkopen-verplichtingen',
  'huis-verkopen-verplichtingen/asbestattest',
  'huis-verkopen-verplichtingen/elektriciteitskeuring',
  'registratierechten',
  'notariskosten-verkoop-huis',
])

// Alle geldige interne slugs (voor related-links en interne verwijzingen; geen 404's).
const ALL_SLUGS = [
  'huis-laten-schatten','waarde-woning-berekenen','kosten-vastgoedmakelaar','huis-verkopen-met-makelaar',
  'kosten-verkoop-huis','huis-zelf-verkopen-documenten','huis-verkopen-na-1-jaar','huis-verkopen-nieuw-kopen',
  'huis-verkopen-boven-geschatte-waarde','huis-verkopen-met-meerdere-erfgenamen','huis-gekocht-wat-nu',
  'compromis-verkoop-huis','akte-verlijden','verkoop-uit-de-hand','openbare-verkoop-huis','bieden-op-een-huis',
  'bod-intrekken-huis','optie-nemen-op-huis','opschortende-voorwaarde','minimum-tijd-tussen-compromis-en-akte',
  'verborgen-gebreken-huis','hoeveel-spaargeld-voor-een-huis','eigen-inbreng-lening-bij-aankoop-woning',
  'huis-kopen-zonder-lening','heropname-lening','lening-overzetten-op-ander-huis','hypothecair-mandaat',
  'hypothecaire-volmacht','schuldsaldoverzekering-prijs','leeftijdsgrens-overbruggingskrediet','renteloos-renovatiekrediet',
  'registratierechten','registratierechten/eerste-woning','registratierechten/tweede-woning','meerwaardebelasting-vastgoed',
  'miserietaks','successierechten-vermijden','belasting-tweede-verblijf-vermijden','huis-schenken-aan-kinderen',
  'schenking-onroerend-goed','erfenis-huis-ouders','ouderlijk-huis-verkopen-voor-overlijden','kadastraal-inkomen-appartement',
  'kadastraal-inkomen-berekenen-na-verbouwing','huurprijs-berekenen','garage-verhuren','kamer-verhuren-in-eigen-huis',
  'onderverhuren','huurcontract-niet-geregistreerd','huurcontract-1-jaar-opzeggen-door-verhuurder',
  'welke-verzekeringen-zijn-verplicht-als-huurder','gemeenschappelijke-kosten-appartement-huurder','blokpolis-appartement',
  'huis-kopen-om-te-verhuren','bouwen-of-verbouwen','modulair-bouwen','staalbouw-woning','sleutel-op-de-deur-woning',
  'wetgeving-containerwoning','prijs-bouwgrond-berekenen','hoeveel-kost-een-totaalrenovatie','renovatieplicht-bestaande-woning',
  'renovatieplicht-2030','verbouwen-zonder-vergunning','tuinhuis-zonder-vergunning','bestaande-vloer-isoleren',
  'epc-waarde-verlagen','bewoonbare-oppervlakte-berekenen','nieuwbouw-kopen-waar-op-letten','co2-meter-verplicht-in-huis',
  'verwarmen-met-airco','zonevreemde-woning-kopen','woning-kopen-met-afgekeurde-elektriciteit','erfpacht',
  'verschil-erfpacht-en-opstal','voorkooprecht-betekenis','overhangende-takken-buur','hoogte-brievenbus',
  'gras-afrijden-op-zondag','kangoeroewoning','lijfrente-huis-kopen','huurkoop-woning','alleenstaande-huis-kopen',
  'duurste-gemeente-belgie','wallonie','notariskosten-verkoop-huis','notariskosten-verkoop-huis/wie-betaalt',
  'huis-verkopen-verplichtingen','huis-verkopen-verplichtingen/epc','huis-verkopen-verplichtingen/elektriciteitskeuring',
  'huis-verkopen-verplichtingen/elektriciteitskeuring/prijs','huis-verkopen-verplichtingen/bodemattest',
  'huis-verkopen-verplichtingen/mazouttank','huis-verkopen-verplichtingen/asbest-verwijderen',
  'huis-verkopen-verplichtingen/asbestattest','huis-verkopen-verplichtingen/asbestattest/prijs',
  'huis-verkopen-verplichtingen/asbestattest/gemeenschappelijke-delen','vastgoedkantoren/limburg','vastgoedkantoren/vlaams-brabant',
  'asbestattest','asbestattest/wie','asbestattest/vanaf-wanneer','asbestattest/geen','asbestattest/bij-erfenis',
  'asbestattest/hoe-lang-moet-je-wachten','asbestattest/bij-verhuur','asbestattest/wie-betaalt','asbestattest/goedkoop',
  'asbestattest/uitstel','asbestattest/renovatie','asbestattest/asbestsanering','asbestattest/notaris','asbestattest/wetgeving',
  'asbestattest/asbestkeuring','asbestattest/bij-schenking','asbestattest/geldigheid','asbestattest/garage',
  'asbestattest/verplicht','asbestattest/appartement','asbestattest/asbestinventaris','asbestattest/asbestinventaris/verplicht',
  'asbestattest/bij-verkoop','asbestattest/laten-opmaken','asbestattest/compromis','asbestattest/brugge','asbestattest/lier',
  'asbestattest/lokeren','asbestattest/leuven','asbestattest/sint-niklaas','asbestattest/dendermonde','asbestattest/herentals',
  'asbestattest/hasselt','asbestattest/oudenaarde','asbestattest/turnhout','asbestattest/gent','asbestattest/antwerpen',
  'asbestattest/limburg','asbestattest/vlaams-brabant','asbestattest/west-vlaanderen','asbestattest/oost-vlaanderen',
]

function filePath(slug) {
  return HUBS.has(slug) ? `${ROOT}/content/${slug}/index.mdx` : `${ROOT}/content/${slug}.mdx`
}

const CANON = `CANONIEKE FEITEN (site-breed consistent, gebruik exact deze waar relevant; verzin GEEN eigen cijfers):
- Commissie vastgoedmakelaar: meestal 2% tot 4% van de verkoopprijs excl. btw; geen wettelijk tarief; verkoper betaalt; plus 21% btw.
- Asbestattest: in Vlaanderen verplicht bij verkoop van gebouwen met bouwjaar 2000 of vroeger (sinds 23 november 2022); opgemaakt door een gecertificeerd asbestdeskundige; geregistreerd bij OVAM; geldig tot 10 jaar; tegen 2032 voor elke gebouweigenaar.
- Asbestattest prijs (indien de pagina over prijs gaat): gemiddeld 500 tot 550 euro voor een gezinswoning en 400 tot 450 euro voor een appartement; totale marktprijzen 350 tot 900 euro afhankelijk van woningtype, complexiteit en aantal staalnames; inclusief de OVAM-retributie van 59 euro (sinds 5 februari 2025). Er is GEEN wettelijk tarief en OVAM publiceert GEEN prijs-richtcijfers: de asbestdeskundige bepaalt de prijs vrij. Schrijf prijzen dus nooit toe aan OVAM.
- Registratierechten Vlaanderen: verkooprecht 2% voor de enige eigen woning (sinds 1 januari 2025; strengere voorwaarden rond effectief wonen vanaf 2026), standaardtarief 12% voor andere aankopen. Rechtenvermindering van 1.867 euro voor bescheiden woningen tot 220.000 euro. Brussel en Wallonie hanteren eigen tarieven (onder meer 12,5%). Notaris-ereloon is wettelijk vastgelegd, progressief, ongeveer 1% plus 21% btw.
- Verkoopattesten (indicatief, geen wettelijk tarief, prijs per aanbieder): EPC ongeveer 125 tot 270 euro; elektriciteitskeuring ongeveer 150 tot 200 euro (toeslag per bijkomende meter); bodemattest OVAM-retributie 67 euro per perceel (269 euro voor een deel van een perceel) plus VIP-platformretributie 5 euro, sinds 2026 aan te vragen via het Vastgoedinformatieplatform.
- Vastgoedmakelaars moeten erkend zijn bij het BIV (Beroepsinstituut van Vastgoedmakelaars).`

const RULES = `HARDE REGELS (niet-onderhandelbaar):
- NOOIT em-dashes (—) of en-dashes (–), ook niet in getallenreeksen of in de frontmatter. Gebruik "tot", een komma of een gewoon koppelteken (-).
- GEEN onverifieerbare claims: geen reviewscores, geen verzonnen aantallen of bedragen, geen vage bronnen zoals "volgens vastgoedanalyses" of "volgens marktonderzoek", geen "erkende partners", geen statistieken die je niet in stap 2 kon verifiëren. Schrap die of vervang door een geverifieerd feit.
- VERZIN NOOIT PRIJZEN of euro-bedragen. Gebruik een concreet bedrag ALLEEN als het in de canonieke feiten staat of als je het in stap 2 in een bron hebt teruggevonden. Kun je een prijs niet verifiëren, beschrijf dan kwalitatief ("de prijs hangt af van ... en verschilt per aanbieder, vraag meerdere offertes") zonder cijfer. Schrijf marktprijzen nooit toe aan OVAM of een andere overheid.
- Wees site-breed consistent: gebruik voor eenzelfde feit overal hetzelfde cijfer (dezelfde asbestattest-prijsrange, commissierange, enz.).
- title maximaal 60 tekens. description tussen 130 en 155 tekens: TEL de tekens en blijf onder 155 (streef naar ongeveer 150 als veilige marge).
- Taal: Nederlands, Vlaams publiek.`

const STRUCTURE = `STRUCTUUR (SEO-playbook):
- H1 staat in frontmatter (h1). De eerste alinea van de body is de intro: die vat alle secties in volgorde samen en zet het belangrijkste feit of de prijs hoog.
- Gebruik vraag-headings (H2/H3); geef het antwoord in de EERSTE zin na de heading, declaratief en zonder uitstel.
- Zet een lijstdefinitie-zin voor elke opsomming (bijvoorbeeld "De stappen zijn hieronder opgesomd.").
- Gebruik waar zinvol een markdown-tabel, een <TipBlock title="...">...</TipBlock> en exact één <OfferteCheck>...</OfferteCheck> die naar het leadformulier leidt.
- Beschikbare MDX-componenten: <TipBlock title="...">...</TipBlock>, <DecisionBox title="...">...</DecisionBox>, <OfferteCheck>...</OfferteCheck>. Gebruik geen andere JSX en geen ruwe HTML.
- Interne links als markdown naar /slug. Gebruik alleen slugs uit de meegegeven lijst met geldige slugs.
- Zet GEEN eigen "Veelgestelde vragen"- of "FAQ"-sectie in de body. De FAQ komt UITSLUITEND uit de frontmatter (faq) en wordt automatisch onderaan de pagina gerenderd. Een body-FAQ zou dubbel verschijnen.
- Erkende BIV-vastgoedmakelaars benoemen mag (dat is een verifieerbaar feit), maar gebruik nooit de vage term "erkende partners".`

function frontmatterSpec(item) {
  return `FRONTMATTER (YAML tussen ---), gebruik deze velden:
- title (max 60), h1, description (max 155)
- intent: "core" | "informational" | "local"
- silo: de hub-slug als de pagina in een silo zit (bijv. "asbestattest"), anders weglaten
- type: "WebPage" | "Article" | "Service" (gebruik Service voor leadgen-dienstpagina's zoals schatten/verkopen met makelaar, met broker-logica; Article voor puur informatieve gidsen; anders WebPage)
- updated: "2026-07-06"
- about: 1 of 2 hoofdentiteiten, elk met "name" en optioneel "sameAs" als YAML-lijst (dus "sameAs:\n      - https://..."), alleen een Wikipedia-link als die exact hetzelfde concept beschrijft
- mentions: relevante bijkomende entiteiten, zelfde vorm als about (optioneel)
- breadcrumbs: lijst met items die elk "name" en "slug" hebben; Home heeft slug "" ; daarna eventuele hub ; de huidige pagina heeft slug "${item.slug}"
- faq: 3 tot 5 items, elk met exact de sleutels "q" (de vraag) en "a" (het declaratieve antwoord). Gebruik NIET question/answer.
- related: precies 3 items, elk met exact de sleutels "label" (linktekst) en "slug" (doel-slug uit de lijst). Gebruik NIET name/title.

Voorbeeld van de exacte frontmatter-vorm:
faq:
  - q: "..."
    a: "..."
related:
  - { label: "...", slug: "..." }
  - { label: "...", slug: "..." }
  - { label: "...", slug: "..." }`
}

function migratePrompt(item) {
  return `Je migreert één bestaande pagina van vastgoedmakelaarzoeken.be naar een nieuw, compliant MDX-bestand.

LIVE-URL (ophalen voor de bestaande content): ${item.url}
SCHRIJF NAAR (exact dit absolute pad, overschrijf indien het bestaat): ${filePath(item.slug)}
SLUG (voor canonical en interne links): ${item.slug}

STAPPEN:
1. Haal de live pagina op met WebFetch. Extraheer de hoofdcontent: H1, alle H2/H3-headings, paragrafen, lijsten, tabellen en FAQ. Vraag ook de bestaande title en meta description op.
2. Bevat de pagina cijfers, prijzen, percentages, tarieven, belastingen of deadlines? Doe dan 1 gerichte WebSearch om die te verifiëren met actuele Belgische of Vlaamse bronnen (2026). Gebruik uitsluitend cijfers die je in bronnen terugvindt. Kun je een cijfer niet verifiëren, laat het weg.
3. Herschrijf de content naar compliant MDX en schrijf het bestand met de Write-tool naar exact het opgegeven pad.

${RULES}

${STRUCTURE}

${frontmatterSpec(item)}

${CANON}

GELDIGE INTERNE SLUGS (kies related en interne links hieruit):
${ALL_SLUGS.join(', ')}

Behoud de silostructuur en de zoekintentie van het origineel, maar verwijder alle dashes en alle niet-verifieerbare claims. Schrijf enkel het bestand. Retourneer daarna één korte regel: "OK ${item.slug}" gevolgd door wat je aan niet-verifieerbare claims hebt geschrapt (of "geen").`
}

const VERDICT = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    pass: { type: 'boolean' },
    titleLen: { type: 'number' },
    descLen: { type: 'number' },
    faqCount: { type: 'number' },
    hasIntro: { type: 'boolean' },
    hasOfferteCheck: { type: 'boolean' },
    bodyHasFaqSection: { type: 'boolean' },
    dashes: { type: 'boolean' },
    unverifiableClaims: { type: 'array', items: { type: 'string' } },
    brokenInternalLinks: { type: 'array', items: { type: 'string' } },
    issues: { type: 'array', items: { type: 'string' } },
  },
  required: ['slug', 'pass', 'titleLen', 'descLen', 'faqCount', 'bodyHasFaqSection', 'dashes', 'unverifiableClaims', 'brokenInternalLinks', 'issues'],
}

function verifyPrompt(item) {
  return `Controleer het gemigreerde MDX-bestand op de harde regels en structuur. Lees het bestand: ${filePath(item.slug)}

Controleer en rapporteer:
- dashes: bevat het bestand een em-dash (—) of en-dash (–)? (true = overtreding)
- titleLen: aantal tekens van frontmatter title (moet <= 60)
- descLen: aantal tekens van frontmatter description (moet <= 155)
- faqCount: aantal FAQ-items (moet 3 tot 5 zijn)
- hasIntro: staat er een intro-alinea voor de eerste heading?
- hasOfferteCheck: komt <OfferteCheck> voor?
- bodyHasFaqSection: staat er in de BODY (buiten de frontmatter) een eigen "## Veelgestelde vragen"- of "## FAQ"-sectie? true = overtreding, want de FAQ hoort alleen in de frontmatter.
- unverifiableClaims: lijst van zinnen met ECHTE onverifieerbare claims: reviewscores, verzonnen aantallen, vage bronnen zoals "volgens vastgoedanalyses" of "volgens marktonderzoek", de term "erkende partners", of een euro-bedrag dat aan OVAM wordt TOEGESCHREVEN maar niet 59 euro (asbestattest) of 67/269 euro (bodemattest) is. Markeer NIET zomaar elk cijfer: concrete, in bronnen gangbare prijzen en percentages (EPC, keuring, notaris-ereloon, belastingtarieven, erfbelasting, registratierechten) zijn toegestaan. Leeg als er geen zijn.
- brokenInternalLinks: interne link-slugs die NIET in deze lijst staan: ${ALL_SLUGS.join(', ')}
- issues: overige problemen (ontbrekende frontmatter, lege body, geen vraag-headings, ...)
- pass: true alleen als dashes=false, titleLen<=60, descLen<=155, faqCount tussen 3 en 5, bodyHasFaqSection=false, geen echte unverifiableClaims, geen brokenInternalLinks.

Retourneer het gestructureerde object. Wijzig het bestand niet.`
}

let items = args
if (typeof items === 'string') {
  try { items = JSON.parse(items) } catch { items = [] }
}
if (!Array.isArray(items)) items = []
if (!items.length) throw new Error('Geen paginas meegegeven via args (verwacht [{url, slug}, ...]).')

log(`Migratie gestart voor ${items.length} paginas.`)

const results = await pipeline(
  items,
  (item) => agent(migratePrompt(item), { label: `migreer:${item.slug}`, phase: 'Migreren', agentType: 'general-purpose' }),
  (_migrateResult, item) =>
    agent(verifyPrompt(item), { label: `verify:${item.slug}`, phase: 'Verifiëren', agentType: 'general-purpose', schema: VERDICT }),
)

const verdicts = results.filter(Boolean)
const failed = verdicts.filter((v) => v && v.pass === false)
log(`Klaar. ${verdicts.length}/${items.length} geverifieerd, ${failed.length} met openstaande problemen.`)

return {
  total: items.length,
  verified: verdicts.length,
  failed: failed.map((v) => ({ slug: v.slug, issues: v.issues, unverifiableClaims: v.unverifiableClaims, dashes: v.dashes, titleLen: v.titleLen, descLen: v.descLen, faqCount: v.faqCount, brokenInternalLinks: v.brokenInternalLinks })),
  passedSlugs: verdicts.filter((v) => v && v.pass).map((v) => v.slug),
}
