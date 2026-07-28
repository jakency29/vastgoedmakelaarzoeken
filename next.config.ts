import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

// Woning-detailpagina's verhuisden van /woning/<slug> naar /<categorie>/<slug>.
// 301-redirect elke oude woning-URL naar de nieuwe categorie-URL.
const HUIS_TYPES = ["house", "exceptional_house", "maison_de_maitre", "country-house"];
const woningen = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src", "data", "woningen.json"), "utf8"),
) as { slug: string; typeUID: string }[];
const woningRedirects = woningen.map((w) => ({
  from: `/woning/${w.slug}`,
  to: `/${HUIS_TYPES.includes(w.typeUID) ? "huis-te-koop" : "appartement-te-koop"}/${w.slug}`,
}));

// 301-redirects voor de launch. De meeste van de 142 oude WP-URL's blijven 1-op-1,
// dus vergen geen redirect. Hieronder enkel de opschoningen:
//  - WP -2 duplicaatslugs -> schone slug
//  - typfout /wie-betaald/ -> /wie-betaalt/
// Voeg hier bij launch verdere structurele wijzigingen toe. Elke redirect is permanent.
const launchRedirects = [
  { from: "/miserietaks-2", to: "/miserietaks" },
  { from: "/verschil-erfpacht-en-opstal-2", to: "/verschil-erfpacht-en-opstal" },
  { from: "/verwarmen-met-airco-2", to: "/verwarmen-met-airco" },
  { from: "/notariskosten-verkoop-huis/wie-betaald", to: "/notariskosten-verkoop-huis/wie-betaalt" },
  // Kantoren-overzicht staat op /kantoor; de bare /vastgoedkantoren leidt daarheen.
  // (de provincie-pagina's /vastgoedkantoren/limburg en /vlaams-brabant blijven bestaan)
  { from: "/vastgoedkantoren", to: "/kantoor" },
];

// Redirects op basis van Google Search Console-data van 28 juli 2026.
// Deze oude routes ontvangen nog organische vertoningen of klikken, maar hebben in de
// huidige site een nieuwe inhoudelijk equivalente bestemming.
const searchConsoleRedirects = [
  {
    from: "/blog/is-een-mondelinge-overeenkomst-bindend",
    to: "/bieden-op-een-huis",
  },
  {
    from: "/blog/welke-kosten-heb-je-bij-de-aankoop-van-een-huis-of-een-appartement",
    to: "/notariskosten-verkoop-huis",
  },
  {
    from: "/blog/kan-je-jouw-woning-verkopen-door-meerdere-makelaars",
    to: "/huis-verkopen-met-makelaar",
  },
  {
    from: "/blog/kan-je-een-bod-op-een-huis-intrekken",
    to: "/bod-intrekken-huis",
  },
  {
    from: "/blog/vanaf-2030-nieuwe-energienorm-voor-verhuur",
    to: "/renovatieplicht-2030",
  },
  {
    from: "/blog/waar-moet-je-op-letten-bij-het-kopen-van-een-nieuwbouwwoning",
    to: "/nieuwbouw-kopen-waar-op-letten",
  },
  {
    from: "/blog/huurkoop-alles-wat-je-moet-weten-over-deze-vastgoedoptie",
    to: "/huurkoop-woning",
  },
  {
    from: "/blog/een-garage-verhuren-waar-moet-je-rekening-mee-houden",
    to: "/garage-verhuren",
  },
  {
    from: "/blog/wat-je-moet-weten-over-erfpacht-bij-het-kopen-van-een-woning",
    to: "/erfpacht",
  },
  {
    from: "/blog/hypotheekoverdracht-een-slimme-zet-bij-verhuisplannen",
    to: "/lening-overzetten-op-ander-huis",
  },
  {
    from: "/blog/het-verlijden-van-de-akte",
    to: "/akte-verlijden",
  },
  {
    from: "/blog/hoe-investeren-in-vastgoed",
    to: "/huis-kopen-om-te-verhuren",
  },
  {
    from: "/blog/hoe-weet-je-wanneer-het-tijd-is-om-jouw-woning-te-verkopen",
    to: "/woning-verkopen",
  },
  {
    from: "/blog/mijn-woning-geraakt-niet-verkocht-7-tips",
    to: "/woning-verkopen",
  },
  {
    from: "/blog/waarom-verkoopt-mijn-huis-niet-8-redenen-hoe-dit-te-verhelpen",
    to: "/woning-verkopen",
  },
  {
    from: "/blog/10-cruciale-vragen-aan-een-vastgoedmakelaar",
    to: "/huis-verkopen-met-makelaar",
  },
  { from: "/schatting", to: "/huis-laten-schatten" },
  { from: "/vastgoedkantoren/antwerpen", to: "/kantoor" },
  { from: "/vastgoedkantoren/oost-vlaanderen", to: "/kantoor" },
  { from: "/vastgoedkantoren/west-vlaanderen", to: "/kantoor" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [...launchRedirects, ...searchConsoleRedirects, ...woningRedirects].map((r) => ({
      source: r.from,
      destination: r.to,
      permanent: true,
    }));
  },
};

export default nextConfig;
