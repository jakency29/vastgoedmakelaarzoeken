// Dynamische sitemap uit de content-registry + de homepage. Sluit noindex-pagina's uit.

import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/content";
import { kantoren } from "@/lib/kantoren";
import { makelaars } from "@/lib/makelaars";
import { woningen, actieveCategorieen, provinciesVoor, gemeentenVoor } from "@/lib/woningen";
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

  // Kantoren-overzicht + kantoor-detailpagina's.
  const kantoorPages = [
    { url: absoluteUrl("/kantoor"), changeFrequency: "monthly" as const, priority: 0.8 },
    ...kantoren.map((k) => ({
      url: absoluteUrl(`/kantoor/${k.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...makelaars.map((m) => ({
      url: absoluteUrl(`/makelaar/${m.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Woningen: per categorie (huis/appartement) het overzicht + provincie- + gemeentepagina's,
  // plus de detailpagina's. Enkel categorieen/locaties met panden.
  const woningPages = [
    ...actieveCategorieen().flatMap((cat) => [
      { url: absoluteUrl(`/${cat.prefix}`), changeFrequency: "daily" as const, priority: 0.8 },
      ...provinciesVoor(cat).map((p) => ({ url: absoluteUrl(`/${cat.prefix}/${p.slug}`), changeFrequency: "daily" as const, priority: 0.7 })),
      ...provinciesVoor(cat).flatMap((p) =>
        gemeentenVoor(cat, p.slug).map((g) => ({ url: absoluteUrl(`/${cat.prefix}/${p.slug}/${g.slug}`), changeFrequency: "daily" as const, priority: 0.7 })),
      ),
    ]),
    ...woningen.map((w) => ({ url: absoluteUrl(`/woning/${w.slug}`), changeFrequency: "weekly" as const, priority: 0.6 })),
  ];

  return [home, ...pages, ...kantoorPages, ...woningPages];
}
