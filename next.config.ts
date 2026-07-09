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

const nextConfig: NextConfig = {
  async redirects() {
    return [...launchRedirects, ...woningRedirects].map((r) => ({
      source: r.from,
      destination: r.to,
      permanent: true,
    }));
  },
};

export default nextConfig;
