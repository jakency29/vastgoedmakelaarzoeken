import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const MATRIX = path.join(ROOT, "docs", "spam-prevention-url-matrix-2026-08-26.csv");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(file);
    return entry.isFile() && entry.name.endsWith(".mdx") ? [file] : [];
  });
}

function slugFor(file) {
  return path.relative(CONTENT, file).replaceAll("\\", "/").replace(/\.mdx$/, "").replace(/\/index$/, "");
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else value += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else value += character;
  }
  if (value || row.length) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function xmlAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function setFrontmatterValue(raw, key, value, afterKey = "updated") {
  const pattern = new RegExp(`^${key}:.*$`, "m");
  if (pattern.test(raw)) return raw.replace(pattern, `${key}: ${value}`);
  const afterPattern = new RegExp(`^${afterKey}:.*$`, "m");
  if (!afterPattern.test(raw)) throw new Error(`Kan ${key} niet toevoegen, ${afterKey} ontbreekt.`);
  return raw.replace(afterPattern, (line) => `${line}\n${key}: ${value}`);
}

function insertBeforeFirstHeading(raw, block) {
  if (raw.includes(block.split("\n")[0])) return raw;
  const parsed = matter(raw);
  const bodyStart = raw.indexOf(parsed.content);
  if (bodyStart < 0) throw new Error("MDX-body niet gevonden.");
  const headingOffset = parsed.content.search(/^##\s/m);
  if (headingOffset < 0) return `${raw.trimEnd()}\n\n${block}\n`;
  const insertion = bodyStart + headingOffset;
  return `${raw.slice(0, insertion).trimEnd()}\n\n${block}\n\n${raw.slice(insertion)}`;
}

function insertBeforeLastOffer(raw, block) {
  if (raw.includes(block.split("\n")[0])) return raw;
  const index = raw.lastIndexOf("<OfferteCheck");
  if (index < 0) return `${raw.trimEnd()}\n\n${block}\n`;
  return `${raw.slice(0, index).trimEnd()}\n\n${block}\n\n${raw.slice(index)}`;
}

const files = walk(CONTENT);
const fileBySlug = new Map(files.map((file) => [slugFor(file), file]));
const csvRows = parseCsv(fs.readFileSync(MATRIX, "utf8"));
const [header, ...bodyRows] = csvRows;
const matrixRows = bodyRows
  .filter((row) => row.length === header.length)
  .map((row) => Object.fromEntries(header.map((key, index) => [key, row[index]])));

const localAsbestSlugs = new Set(
  matrixRows
    .filter((row) => row.reasons.includes("lokale asbestpagina blijft vervangbaar"))
    .map((row) => row.url.replace(/^\//, "")),
);
const duplicateSlugs = new Set([
  "hypothecaire-volmacht",
  "renovatieplicht-bestaande-woning",
  "asbestattest/verplicht",
  "asbestattest/vanaf-wanneer",
  "asbestattest/wetgeving",
  "asbestattest/wie",
]);
const excludedSlugs = new Set([...localAsbestSlugs, ...duplicateSlugs]);
const redirectTargets = new Map([
  ...[...localAsbestSlugs].map((slug) => [slug, "asbestattest"]),
  ["hypothecaire-volmacht", "hypothecair-mandaat"],
  ["renovatieplicht-bestaande-woning", "renovatieplicht-2030"],
  ["asbestattest/verplicht", "asbestattest"],
  ["asbestattest/vanaf-wanneer", "asbestattest"],
  ["asbestattest/wetgeving", "asbestattest"],
  ["asbestattest/wie", "asbestattest"],
]);
const claimRichSlugs = new Set(
  matrixRows
    .filter((row) => row.reasons.includes("claimrijke pagina zonder bron naast de concrete claim"))
    .map((row) => row.url.replace(/^\//, ""))
    .filter((slug) => !excludedSlugs.has(slug)),
);

const topicalBridges = {
  "bestaande-vloer-isoleren": {
    silo: "renovatieplicht-2030",
    block: `## Waarom is vloerisolatie relevant bij de aankoop of verkoop van een woning?\n\nVloerisolatie is relevant omdat het energiegebruik, het EPC en het renovatiebudget mee bepalen hoe een koper een woning beoordeelt. Controleer bij een aankoop met een zwak EPC welke werken nodig zijn en leg uitgevoerde isolatie bij verkoop vast met facturen en technische documenten. Lees ook hoe je een [woning met EPC-label F beoordeelt](/woning-kopen-met-epc-f).`,
  },
  "co2-meter-verplicht-in-huis": {
    silo: "conformiteitsattest",
    block: `## Waarom is een CO2-meter relevant voor verhuur en vastgoedbeheer?\n\nEen CO2-meter is relevant voor het gebruik en beheer van ruimtes waar ventilatie en binnenluchtkwaliteit belangrijk zijn. De meter vervangt geen controle van de woningkwaliteit en bewijst op zichzelf niet dat een pand aan alle huurvereisten voldoet. Controleer daarom ook wanneer een [conformiteitsattest voor een huurwoning](/conformiteitsattest) nodig is.`,
  },
  "gras-afrijden-op-zondag": {
    silo: "woning-verkoopklaar-maken",
    block: `## Waarom is grasmaaien op zondag relevant bij een vastgoedbeslissing?\n\nRegels over grasmaaien op zondag zijn relevant wanneer je de gebruiksregels en mogelijke burenhinder rond een woning beoordeelt. Een lokaal politiereglement kan per gemeente verschillen. Noteer bekende afspraken of terugkerende hinder wanneer je een [woning verkoopklaar maakt](/woning-verkoopklaar-maken).`,
  },
  "haag-hoogte": {
    silo: "woning-verkoopklaar-maken",
    block: `## Waarom controleer je de haag vóór een woningverkoop?\n\nDe hoogte en ligging van een haag zijn relevant wanneer er discussie bestaat over de perceelsgrens, het onderhoud of hinder tussen buren. Controleer de feitelijke toestand en bestaande afspraken voordat je de woning aanbiedt. Neem onduidelijkheden mee in de voorbereiding om de [woning verkoopklaar te maken](/woning-verkoopklaar-maken).`,
  },
  "hoogte-brievenbus": {
    silo: "huis-gekocht-wat-nu",
    block: `## Waarom controleer je de brievenbus na aankoop of verbouwing?\n\nDe plaats en bereikbaarheid van de brievenbus zijn relevant wanneer je een nieuw adres in gebruik neemt of de toegang tot een woning aanpast. Controleer de actuele plaatsingsvoorwaarden voordat je ze verplaatst. Neem die controle op in je praktische lijst voor [wat je na de aankoop van een huis regelt](/huis-gekocht-wat-nu).`,
  },
  "overhangende-takken-buur": {
    silo: "woning-verkoopklaar-maken",
    block: `## Waarom los je overhangende takken best op vóór een woningverkoop?\n\nOverhangende takken zijn relevant bij verkoop wanneer ze schade, onderhoudsvragen of een burengeschil veroorzaken. Leg de toestand vast en probeer afspraken vóór de verkoop schriftelijk te verduidelijken. Zo vermijd je dat een zichtbaar conflict de voorbereiding om je [woning verkoopklaar te maken](/woning-verkoopklaar-maken) bemoeilijkt.`,
  },
  "vanaf-hoe-laat-mag-je-lawaai-maken": {
    silo: "huis-gekocht-wat-nu",
    block: `## Waarom controleer je geluidsregels bij aankoop of renovatie van een woning?\n\nGeluidsregels zijn relevant wanneer je verbouwingen plant of de dagelijkse woonomgeving van een pand beoordeelt. Controleer het politiereglement van de betrokken gemeente en eventuele vergunningsvoorwaarden. Neem de toegelaten werkuren op in je planning voor [wat je na de aankoop van een huis regelt](/huis-gekocht-wat-nu).`,
  },
  "verwarmen-met-airco": {
    silo: "renovatieplicht-2030",
    block: `## Waarom is verwarmen met airco relevant bij een vastgoedbeslissing?\n\nVerwarmen met airco is relevant omdat het verwarmingssysteem, het EPC en het verwachte verbruik samen het renovatiebudget beïnvloeden. Beoordeel daarom niet alleen de aankoopprijs van het toestel, maar ook de isolatie en warmtebehoefte van de woning. Vergelijk dit met de ingrepen voor de [renovatieplicht richting 2030](/renovatieplicht-2030).`,
  },
};

const replacements = new Map([
  ["Reken op minimaal 10% van de aankoopprijs, aangevuld met de aankoopkosten zoals registratierecht en notariskosten.", "Voor de eigen inbreng bij een lening reken je op minimaal 10% van de aankoopprijs, aangevuld met aankoopkosten zoals registratierecht en notariskosten."],
  ["De berekening combineert de aankoopprijs met de registratierechten, de notariskosten en de kosten van de bank.", "De berekening van de eigen inbreng combineert de aankoopprijs met de registratierechten, notariskosten en bankkosten."],
  ["In uitzonderlijke gevallen wel, wanneer de bank 100% financiering toestaat.", "Een lening zonder eigen inbreng is alleen in uitzonderlijke gevallen mogelijk wanneer de bank 100% financiering toestaat."],
  ["Het grootste voordeel is dat je geen maandelijkse aflossingen en geen rente betaalt.", "Huis kopen zonder lening heeft als grootste voordeel dat je geen maandelijkse aflossingen en geen rente betaalt."],
  ["Het belangrijkste nadeel is dat je kapitaal volledig in vastgoed vastzit.", "Huis kopen zonder lening heeft als belangrijkste nadeel dat je kapitaal volledig in vastgoed vastzit."],
  ["Niet iedere waardebepaling heeft hetzelfde doel.", "Een schatting bij een scheiding moet passen bij het doel: verkoop, uitkoop, financiering of een formeel waarderingsverslag."],
  ["Een woning overnemen vraagt meer dan een akkoord over de waarde.", "Een huis overnemen na een scheiding vereist een akkoord over de waarde, de uitkoopsom, de lening en de eigendomsoverdracht."],
  ["Partners kunnen beslissen om de woning tijdelijk samen te behouden.", "Onverdeeldheid na een scheiding betekent dat beide partners de woning tijdelijk samen in eigendom behouden."],
  ["Deze pagina geeft algemene informatie over Vlaanderen en vervangt geen persoonlijk juridisch, fiscaal, notarieel of financieel advies.", "Controleer de regels bij scheiding bij je notaris, kredietgever en bevoegde overheidsdienst; deze informatie vervangt geen persoonlijk juridisch, fiscaal of financieel advies."],
  ["Beide volgordes hebben voor- en nadelen; de keuze hangt af van je financiële ruimte en je behoefte aan woonzekerheid.", "Eerst verkopen beperkt het financieringsrisico, terwijl eerst kopen meer woonzekerheid kan geven als je voldoende financiële ruimte hebt."],
  ["Huis verkopen en nieuw kopen draait om timing en financiering.", "Huis verkopen en een nieuw huis kopen vereist een planning waarin verkoopmoment, aankoopmoment en financiering op elkaar aansluiten."],
  ["De juiste procedure hangt af van de installatiedatum, eerdere controles, het beschikbare dossier en eventuele wijzigingen.", "De procedure voor een elektriciteitskeuring hangt af van de installatiedatum, eerdere controles, het beschikbare dossier en latere wijzigingen."],
  ["De procedure loopt van dossiercontrole en toegankelijkheid naar metingen, visuele controle, verslag en eventuele herkeuring.", "De elektriciteitskeuring verloopt van dossiercontrole en toegankelijkheid naar metingen, visuele controle, verslag en eventuele herkeuring."],
  ["Leg minstens de eendraadschema's, situatieplannen en indien beschikbaar de EAN-code van de aansluiting voor.", "Voor de elektriciteitskeuring leg je minstens de eendraadschema's, situatieplannen en, indien beschikbaar, de EAN-code van de aansluiting voor."],
  ["Het toepassingsgebied, de documenten, controleorganismen en hersteltermijnen zijn gecontroleerd bij de Federale Overheidsdienst Economie.", "De Federale Overheidsdienst Economie is de primaire controlebron voor het toepassingsgebied, de documenten, controleorganismen en hersteltermijnen van de elektriciteitskeuring."],
  ["Het EPC verbindt de woning, de advertentie, het plaatsbezoek en de notariële overdracht.", "Het EPC bij verkoop moet beschikbaar zijn voor de advertentie en blijft relevant tijdens het plaatsbezoek en de notariële overdracht."],
  ["De juiste aanpak hangt vooral af van het bestaande certificaat, het moment van publicatie en de feitelijke toestand van de woning.", "De juiste EPC-aanpak hangt af van het bestaande certificaat, het publicatiemoment en de feitelijke toestand van de woning."],
  ["Het energieprestatiecertificaat (EPC) toont hoe energiezuinig een woning is via een score in kWh per vierkante meter per jaar.", "Het EPC-certificaat toont hoe energiezuinig een woning is via een score in kWh per vierkante meter per jaar."],
  ["In de regel niet.", "Een verhuurder mag een huurcontract van één jaar tijdens de afgesproken looptijd in de regel niet vroegtijdig opzeggen."],
  ["Via een minnelijke ontbinding.", "Een huurcontract van één jaar kan wel vroegtijdig stoppen via een schriftelijke minnelijke ontbinding tussen huurder en verhuurder."],
  ["Een huurcontract van 1 jaar opzeggen door de verhuurder kan in Vlaanderen tijdens de looptijd bijna nooit.", "Een verhuurder kan een huurcontract van één jaar in Vlaanderen tijdens de looptijd bijna nooit eenzijdig opzeggen."],
  ["De fiscus herbekijkt de huurwaarde van 1975 voor de gewijzigde woning en leidt daaruit een nieuw, hoger KI af.", "Voor het kadastraal inkomen na een verbouwing herbekijkt de fiscus de huurwaarde van 1975 voor de gewijzigde woning."],
  ["Je vindt het KI op het aanslagbiljet van de onroerende voorheffing en in je aankoopakte.", "Je vindt het huidige kadastraal inkomen op het aanslagbiljet van de onroerende voorheffing en in de aankoopakte."],
  ["De indexatiecoëfficiënt wordt jaarlijks vastgelegd en stijgt met de gezondheidsindex.", "De indexatiecoëfficiënt voor het kadastraal inkomen wordt jaarlijks vastgelegd op basis van de gezondheidsindex."],
  ["Het KI raakt aan verschillende kosten en verplichtingen rond je woning, van de onroerende voorheffing tot een eventuele renovatie.", "Het kadastraal inkomen beïnvloedt verschillende vastgoedkosten en verplichtingen, waaronder de onroerende voorheffing."],
  ["Het exacte bedrag hangt af van de verkoopprijs, het wettelijke ereloontarief en de administratieve kosten van het dossier.", "De notariskosten bij verkoop hangen af van de verkoopprijs, het wettelijke ereloontarief en de administratieve dossierkosten."],
  ["Naast de notariskosten betaal je als verkoper de verplichte attesten en, als je een makelaar inschakelt, de commissie.", "Andere verkoopkosten zijn onder meer verplichte attesten en, wanneer je een makelaar inschakelt, de afgesproken commissie."],
  ["Deze pagina geeft algemene informatie voor Vlaanderen.", "Notaris.be en de Vlaamse Belastingdienst zijn de primaire controlebronnen voor de regels over eigendom, schenking en verkoop in Vlaanderen."],
  ["Begin luidruchtige activiteiten op weekdagen bij voorkeur niet voor 7 uur.", "Begin lawaai door luidruchtige activiteiten op weekdagen bij voorkeur niet voor 7 uur, tenzij het lokale politiereglement een ander uur oplegt."],
  ["Deze pagina geeft algemene informatie.", "Controleer de actuele geluidsregels in het politiereglement van de gemeente waar het lawaai wordt gemaakt."],
  ["Je controleert de beroepsinschrijving van de behandelende vastgoedmakelaar via de openbare zoekfunctie van het Beroepsinstituut van Vastgoedmakelaars.", "De BIV-vermelding van een vastgoedmakelaar controleer je via de openbare zoekfunctie van het Beroepsinstituut van Vastgoedmakelaars."],
  ["Het passende kantoor hangt vooral af van je woning, locatie en gewenste begeleiding.", "Het passende vastgoedkantoor hangt af van de woning, de locatie en de begeleiding die je nodig hebt."],
  ["De uitgebreide vrijstellingen maken renovaties sneller en eenvoudiger zolang het bouwvolume, de woonfunctie en het aantal woongelegenheden behouden blijven.", "Verbouwen zonder vergunning kan alleen binnen de toepasselijke vrijstellingen en zolang onder meer het bouwvolume, de woonfunctie en het aantal woongelegenheden behouden blijven."],
  ["Deze quickscan vermenigvuldigt de bewoonbare oppervlakte met een lokale referentieprijs die je zelf invult.", "De online schatting van de woningwaarde vermenigvuldigt de bewoonbare oppervlakte met een lokale referentieprijs die je zelf invult."],
  ["Je hebt 18 maanden vanaf de datum van de notariële akte om de installatie conform te maken.", "Voor afgekeurde elektriciteit heb je 18 maanden vanaf de datum van de notariële akte om de installatie conform te maken."],
  ["De kosten hangen af van de ernst van de inbreuken en verschillen per aanbieder.", "De kosten voor afgekeurde elektriciteit hangen af van de ernst van de inbreuken en verschillen per aanbieder."],
  ["Banken kunnen de renovatiekosten mee opnemen in de kredietanalyse.", "Afgekeurde elektriciteit kan de hypothecaire lening beïnvloeden doordat banken de renovatiekosten meenemen in de kredietanalyse."],
  ["De meest doeltreffende ingrepen richten zich op isolatie, beglazing, verwarming en hernieuwbare energie.", "Voor de renovatieplicht helpen vooral isolatie, beglazing, efficiënte verwarming en passende hernieuwbare energie om EPC-label D te bereiken."],
  ["De totale renovatiekosten hangen af van de staat van de woning, de bewoonbare oppervlakte en de gekozen materialen.", "De kosten van de renovatieplicht hangen af van de staat van de woning, de bewoonbare oppervlakte en de gekozen materialen."],
  ["Voor energetische renovaties bestaan er in Vlaanderen premies, een renovatielening en een verlaagd btw-tarief.", "Voor de renovatieplicht bestaan in Vlaanderen, afhankelijk van de actuele voorwaarden, premies, financiering en fiscale steun voor energetische werken."],
]);

const entityReplacements = new Map([
  ["alleenstaande-huis-kopen", ['  - name: "Hypothecair krediet"', '  - name: "Een huis kopen als alleenstaande"']],
  ["bieden-op-een-huis", ['  - name: "Bod op onroerend goed"', '  - name: "Bieden op een huis"']],
  ["huis-laten-schatten/bij-scheiding", ['  - name: "Woningtaxatie"', '  - name: "Woning laten schatten bij scheiding"']],
  ["huis-verkopen-zonder-makelaar", ['  - name: "Zelfverkoop van vastgoed"', '  - name: "Huis verkopen zonder makelaar"']],
  ["vanaf-hoe-laat-mag-je-lawaai-maken", ['  - name: "Geluidsoverlast"', '  - name: "Lawaai maken"']],
  ["verbouwen-zonder-vergunning", ['  - name: "Omgevingsvergunning"', '  - name: "Verbouwen zonder vergunning"']],
  ["waarde-woning-berekenen", ['  - name: "Waarde woning berekenen"', '  - name: "Woningwaarde"']],
]);

let changedFiles = 0;
let sourceNotes = 0;
let noindexPages = 0;
let topicalBridgePages = 0;
let sentenceReplacements = 0;

for (const [slug, file] of fileBySlug) {
  let raw = fs.readFileSync(file, "utf8");
  const original = raw;

  raw = raw.replaceAll(
    'author: "Redactie Vastgoedmakelaarzoeken.be"',
    'author: "Redactie Vastgoedmakelaar Zoeken"',
  );

  for (const [from, to] of redirectTargets) {
    raw = raw
      .replaceAll(`(/${from})`, `(/${to})`)
      .replaceAll(`href="/${from}"`, `href="/${to}"`)
      .replaceAll(`href='/${from}'`, `href='/${to}'`)
      .replaceAll(`slug: "${from}"`, `slug: "${to}"`)
      .replaceAll(`slug: '${from}'`, `slug: '${to}'`)
      .replaceAll(`slug: ${from}`, `slug: ${to}`)
      .replaceAll(`- "${from}"`, `- "${to}"`)
      .replaceAll(`- '${from}'`, `- '${to}'`);
  }

  if (excludedSlugs.has(slug)) {
    raw = setFrontmatterValue(raw, "noindex", "true");
    noindexPages += 1;
  }

  const topicalBridge = topicalBridges[slug];
  if (topicalBridge) {
    raw = setFrontmatterValue(raw, "silo", `"${topicalBridge.silo}"`, "intent");
    raw = insertBeforeLastOffer(raw, topicalBridge.block);
    topicalBridgePages += 1;
  }

  const entityReplacement = entityReplacements.get(slug);
  if (entityReplacement && raw.includes(entityReplacement[0])) {
    raw = raw.replace(entityReplacement[0], entityReplacement[1]);
  }

  for (const [from, to] of replacements) {
    if (!raw.includes(from)) continue;
    raw = raw.replaceAll(from, to);
    sentenceReplacements += 1;
  }

  if (claimRichSlugs.has(slug)) {
    const data = matter(raw).data;
    const label = data.editorial?.sourceLabel;
    const href = data.editorial?.sourceUrl;
    if (label && href && !raw.includes("<SourceNote ")) {
      const block = `<SourceNote label="${xmlAttribute(label)}" href="${xmlAttribute(href)}" />`;
      raw = insertBeforeFirstHeading(raw, block);
      sourceNotes += 1;
    }
  }

  if (raw !== original) {
    raw = setFrontmatterValue(raw, "updated", '"2026-08-26"');
    fs.writeFileSync(file, raw, "utf8");
    changedFiles += 1;
  }
}

console.log(JSON.stringify({
  changedFiles,
  sourceNotes,
  noindexPages,
  topicalBridgePages,
  sentenceReplacements,
  localAsbestPages: localAsbestSlugs.size,
  duplicatePages: duplicateSlugs.size,
}, null, 2));
