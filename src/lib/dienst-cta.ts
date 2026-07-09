// Leidt de dienst en het contextuele CTA-label af uit de slug van een kennisbank-artikel.
// Eerste match wint; volgorde is belangrijk (asbestverwijdering voor asbestattest, enz.).
// Pagina's zonder specifieke dienst geven null terug (dan tonen we het algemene formulier).

export type Dienst = { naam: string; cta: string };

export function dienstVoorSlug(slug: string): Dienst | null {
  const s = slug.toLowerCase();
  if (s.includes("plaatsbeschrijving")) return { naam: "Plaatsbeschrijving", cta: "Plaatsbeschrijving aanvragen" };
  if (s.includes("conformiteitsattest")) return { naam: "Conformiteitsattest", cta: "Conformiteitsattest aanvragen" };
  if (s.includes("postinterventiedossier")) return { naam: "Postinterventiedossier", cta: "Postinterventiedossier aanvragen" };
  if (s.includes("syndicus")) return { naam: "Syndicus", cta: "Offerte syndicus aanvragen" };
  if (s.includes("mobiscore")) return { naam: "Schatting", cta: "Gratis schatting aanvragen" };
  if (/asbest-?verwijder|asbestsanering/.test(s)) return { naam: "Asbestverwijdering", cta: "Gratis offerte voor asbestverwijdering" };
  if (s.includes("asbest")) return { naam: "Asbestattest", cta: "Asbestattest aanvragen" };
  if (s.includes("epc")) return { naam: "EPC-attest", cta: "EPC attest aanvragen" };
  if (s.includes("elektriciteitskeuring") || s.includes("elektrische-keuring")) return { naam: "Elektriciteitskeuring", cta: "Elektriciteitskeuring aanvragen" };
  if (s.includes("bodemattest")) return { naam: "Bodemattest", cta: "Bodemattest aanvragen" };
  if (s.includes("mazouttank")) return { naam: "Keuring mazouttank", cta: "Keuring mazouttank aanvragen" };
  if (s.includes("schatt") || s.includes("waarde-woning") || s.includes("geschatte-waarde")) return { naam: "Schatting", cta: "Gratis schatting aanvragen" };
  return null;
}

export function dienstCtaLabel(slug: string): string {
  return dienstVoorSlug(slug)?.cta ?? "Gratis offerte aanvragen";
}
