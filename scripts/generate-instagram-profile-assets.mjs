import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.join(process.cwd(), "public", "social", "instagram");
const navy = "#0b1e5b";
const navyDark = "#081543";
const amber = "#f9a41a";
const white = "#ffffff";

function cleanSvg(svg) {
  return `${svg.replace(/[ \t]+$/gm, "").trim()}\n`;
}

function frame(content, label) {
  return `<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1080" fill="${navyDark}"/>
  <circle cx="540" cy="540" r="360" fill="${navy}" stroke="${amber}" stroke-width="26"/>
  ${content}
  <title>${label}</title>
</svg>`;
}

const house = `
  <path d="M300 525 L540 305 L780 525" fill="none" stroke="${amber}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M355 500 V755 H725 V500" fill="${white}"/>
  <rect x="480" y="595" width="120" height="160" rx="10" fill="${navy}"/>
  <rect x="636" y="385" width="66" height="120" rx="10" fill="${white}"/>
`;

const assets = {
  "profile-picture": frame(house, "Profielfoto Vastgoedmakelaar Zoeken"),
  "highlight-start": frame(`
    <path d="M390 350 L735 540 L390 730 Z" fill="${white}"/>
    <circle cx="540" cy="540" r="250" fill="none" stroke="${amber}" stroke-width="30"/>
  `, "Highlight Start"),
  "highlight-verkopen": frame(`
    <path d="M330 515 L540 335 L750 515" fill="none" stroke="${amber}" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M380 500 V720 H700 V500" fill="${white}"/>
    <path d="M465 620 L525 680 L650 545" fill="none" stroke="${navy}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>
  `, "Highlight Verkopen"),
  "highlight-schatten": frame(`
    <circle cx="540" cy="540" r="225" fill="${white}"/>
    <text x="540" y="655" text-anchor="middle" font-family="Arial, sans-serif" font-size="330" font-weight="700" fill="${navy}">&#8364;</text>
    <path d="M355 340 H725" stroke="${amber}" stroke-width="36" stroke-linecap="round"/>
  `, "Highlight Schatten"),
  "highlight-kantoren": frame(`
    <rect x="330" y="370" width="420" height="360" rx="24" fill="${white}"/>
    <path d="M300 370 L540 265 L780 370 Z" fill="${amber}"/>
    <g fill="${navy}">
      <rect x="385" y="430" width="75" height="75" rx="8"/>
      <rect x="502" y="430" width="75" height="75" rx="8"/>
      <rect x="620" y="430" width="75" height="75" rx="8"/>
      <rect x="385" y="545" width="75" height="75" rx="8"/>
      <rect x="620" y="545" width="75" height="75" rx="8"/>
      <rect x="500" y="565" width="80" height="165" rx="8"/>
    </g>
  `, "Highlight Kantoren"),
  "highlight-attesten": frame(`
    <rect x="365" y="300" width="350" height="460" rx="30" fill="${white}"/>
    <path d="M445 430 H635 M445 515 H635 M445 600 H565" stroke="${navy}" stroke-width="30" stroke-linecap="round"/>
    <circle cx="675" cy="680" r="105" fill="${amber}"/>
    <path d="M625 680 L660 715 L730 640" fill="none" stroke="${navy}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  `, "Highlight Attesten"),
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function textLines(lines, x, y, size, color, weight = 700, gap = 1.16) {
  return `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">
    ${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : Math.round(size * gap)}">${escapeXml(line)}</tspan>`).join("\n    ")}
  </text>`;
}

function carouselSlide({ kicker, title, body = [], index, total, dark = false, cta = false }) {
  const background = dark ? navyDark : "#eef1fb";
  const primary = dark ? white : navyDark;
  const secondary = dark ? "#dbe1f5" : "#3350ab";
  const titleSize = title.length > 3 ? 82 : 96;
  const titleY = title.length > 3 ? 330 : 390;
  const bodyY = titleY + title.length * titleSize * 1.16 + 95;
  const footer = cta
    ? `<rect x="90" y="1135" width="900" height="125" rx="62" fill="${amber}"/>
       <text x="540" y="1215" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="${navyDark}">Link in profiel</text>`
    : `<text x="920" y="1280" text-anchor="end" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${secondary}">${index}/${total}</text>`;

  return `<svg width="1080" height="1440" viewBox="0 0 1080 1440" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1440" fill="${background}"/>
    <rect x="0" y="0" width="1080" height="28" fill="${amber}"/>
    <circle cx="142" cy="145" r="52" fill="${navy}" stroke="${amber}" stroke-width="8"/>
    <path d="M110 150 L142 120 L174 150" fill="none" stroke="${amber}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M117 146 V177 H167 V146" fill="${white}"/>
    <rect x="137" y="158" width="12" height="19" fill="${navy}"/>
    <text x="220" y="160" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="1.5" fill="${secondary}">VASTGOEDMAKELAAR ZOEKEN</text>
    <rect x="90" y="235" width="230" height="54" rx="27" fill="${amber}"/>
    <text x="205" y="272" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="${navyDark}">${escapeXml(kicker)}</text>
    ${textLines(title, 90, titleY, titleSize, primary, 800)}
    ${body.length ? textLines(body, 92, bodyY, 43, secondary, 500, 1.42) : ""}
    ${footer}
  </svg>`;
}

const carousels = {
  vergelijken: [
    { kicker: "START HIER", title: ["Je woning", "verkopen?", "Start hier"], dark: true },
    { kicker: "STAP 1", title: ["Bepaal je timing", "en verkoopdoel"], body: ["Wanneer wil je verkopen en", "welke volgende stap past daarbij?"] },
    { kicker: "STAP 2", title: ["Verzamel attesten", "en documenten"], body: ["Denk aan EPC, asbestattest,", "keuringen en eventueel een PID."], dark: true },
    { kicker: "STAP 3", title: ["Laat je woning", "realistisch schatten"], body: ["Gebruik lokale marktkennis en", "vergelijk meerdere inzichten."] },
    { kicker: "STAP 4", title: ["Vergelijk erkende", "vastgoedmakelaars"], body: ["Beoordeel aanpak, diensten,", "tarief en lokale ervaring."], dark: true },
    { kicker: "VOLGENDE STAP", title: ["Bekijk het volledige", "verkoopstappenplan"], body: ["Regel je makelaar, attesten", "en voorbereiding op tijd."], cta: true },
  ],
  kosten: [
    { kicker: "KOSTEN", title: ["Wat kost een", "vastgoedmakelaar", "bij verkoop?"], dark: true },
    { kicker: "GOED OM TE WETEN", title: ["Er bestaat geen", "wettelijk vast", "commissietarief"], body: ["Elk kantoor bepaalt zijn", "eigen tarief en formule."] },
    { kicker: "CONTROLEER", title: ["Is btw inbegrepen?"], body: ["Vraag altijd naar het totale bedrag", "en mogelijke bijkomende kosten."], dark: true },
    { kicker: "VERGELIJK", title: ["Welke diensten", "zijn inbegrepen?"], body: ["Fotografie, publicatie, bezoeken,", "onderhandeling en rapportering."] },
    { kicker: "LEES", title: ["Controleer ook", "het mandaat"], body: ["Duur, exclusiviteit en", "opzegvoorwaarden."], dark: true },
    { kicker: "LET OP", title: ["De laagste", "commissie is niet", "altijd voordeliger"], body: ["Vergelijk prijs en aanpak samen."] },
    { kicker: "BEWAREN", title: ["Neem dit mee naar", "je eerste gesprek"], body: ["Bekijk de volledige kostenuitleg", "via onze profiel-link."], cta: true },
  ],
  kantoren: [
    { kicker: "VOOR KANTOREN", title: ["Meer zichtbaarheid", "en regionale", "aanvragen"], dark: true },
    { kicker: "ZICHTBAARHEID", title: ["Kom in beeld bij", "eigenaars en kopers"], body: ["Bereik mensen die in jouw regio", "een vastgoedprofessional zoeken."] },
    { kicker: "PROFIEL", title: ["Toon wat je", "kantoor onderscheidt"], body: ["Aanbod, werkingsgebied,", "diensten en reviews."], dark: true },
    { kicker: "AANVRAGEN", title: ["Ontvang relevante", "regionale aanvragen"], body: ["Van eigenaars en kopers die", "via het platform zoeken."] },
    { kicker: "TRANSPARANT", title: ["Geen vast aantal", "aanvragen gegarandeerd"], body: ["Mogelijkheden en voorwaarden", "spreken we vooraf af."], dark: true },
    { kicker: "AANSLUITEN", title: ["Bekijk de opties", "voor jouw kantoor"], body: ["Open Voor vastgoedkantoren", "via onze profiel-links."], cta: true },
  ],
};

await fs.mkdir(outputDir, { recursive: true });

for (const [name, svg] of Object.entries(assets)) {
  const cleanedSvg = cleanSvg(svg);
  await fs.writeFile(path.join(outputDir, `${name}.svg`), cleanedSvg, "utf8");
  await sharp(Buffer.from(cleanedSvg)).png().toFile(path.join(outputDir, `${name}.png`));
}

const starterDir = path.join(outputDir, "starter-posts");
for (const [carouselName, slides] of Object.entries(carousels)) {
  const carouselDir = path.join(starterDir, carouselName);
  await fs.mkdir(carouselDir, { recursive: true });
  for (const [slideIndex, slide] of slides.entries()) {
    const number = String(slideIndex + 1).padStart(2, "0");
    const svg = cleanSvg(carouselSlide({
      ...slide,
      index: slideIndex + 1,
      total: slides.length,
    }));
    await fs.writeFile(path.join(carouselDir, `slide-${number}.svg`), svg, "utf8");
    await sharp(Buffer.from(svg)).png().toFile(path.join(carouselDir, `slide-${number}.png`));
  }

  const overviewTiles = await Promise.all(
    slides.map(async (_slide, slideIndex) => ({
      input: await sharp(path.join(carouselDir, `slide-${String(slideIndex + 1).padStart(2, "0")}.png`))
        .resize(270, 360)
        .toBuffer(),
      left: (slideIndex % 4) * 270,
      top: Math.floor(slideIndex / 4) * 360,
    })),
  );

  await sharp({
    create: {
      width: 1080,
      height: Math.ceil(slides.length / 4) * 360,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite(overviewTiles)
    .png()
    .toFile(path.join(carouselDir, "overzicht.png"));
}

const previewTiles = await Promise.all(
  Object.keys(assets).map(async (name, index) => ({
    input: await sharp(path.join(outputDir, `${name}.png`)).resize(360, 360).toBuffer(),
    left: (index % 3) * 360,
    top: Math.floor(index / 3) * 360,
  })),
);

await sharp({
  create: {
    width: 1080,
    height: 720,
    channels: 4,
    background: "#ffffff",
  },
})
  .composite(previewTiles)
  .png()
  .toFile(path.join(outputDir, "profile-assets-preview.png"));

const coverNames = Object.keys(carousels);
const coverTiles = await Promise.all(
  coverNames.map(async (name, index) => ({
    input: await sharp(path.join(starterDir, name, "slide-01.png")).resize(360, 480).toBuffer(),
    left: index * 360,
    top: 0,
  })),
);

await sharp({
  create: {
    width: 1080,
    height: 480,
    channels: 4,
    background: "#ffffff",
  },
})
  .composite(coverTiles)
  .png()
  .toFile(path.join(outputDir, "starter-posts-preview.png"));

console.log(`Generated profile assets and ${Object.values(carousels).flat().length} starter slides in ${outputDir}`);
