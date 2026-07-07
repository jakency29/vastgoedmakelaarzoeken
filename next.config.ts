import type { NextConfig } from "next";

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
    return launchRedirects.map((r) => ({
      source: r.from,
      destination: r.to,
      permanent: true,
    }));
  },
};

export default nextConfig;
