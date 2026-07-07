// Dynamische sitemap uit de content-registry + de homepage. Sluit noindex-pagina's uit.

import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/content";
import { kantoren } from "@/lib/kantoren";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: absoluteUrl("/"),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const pages = getAllPages()
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: absoluteUrl(`/${p.slug}`),
      lastModified: p.updated ? new Date(p.updated) : undefined,
      changeFrequency: "monthly" as const,
      priority: p.intent === "core" ? 0.9 : 0.7,
    }));

  // Kantoren-overzicht + echte kantoor-detailpagina's (voorbeelden zijn noindex).
  const kantoorPages = [
    { url: absoluteUrl("/vastgoedkantoren"), changeFrequency: "monthly" as const, priority: 0.8 },
    ...kantoren
      .filter((k) => !k.example)
      .map((k) => ({
        url: absoluteUrl(`/vastgoedkantoor/${k.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];

  return [home, ...pages, ...kantoorPages];
}
