// Leidt een contextueel CTA-label af uit de slug van een kennisbank-artikel.
// Eerste match wint; volgorde is belangrijk (asbestverwijdering voor asbestattest, enz.).

export function dienstCtaLabel(slug: string): string {
  const s = slug.toLowerCase();
  if (/asbest-?verwijder|asbestsanering/.test(s)) return "Gratis offerte voor asbestverwijdering";
  if (s.includes("asbest")) return "Asbestattest aanvragen";
  if (s.includes("epc")) return "EPC attest aanvragen";
  if (s.includes("elektriciteitskeuring") || s.includes("elektrische-keuring")) return "Elektriciteitskeuring aanvragen";
  if (s.includes("bodemattest")) return "Bodemattest aanvragen";
  if (s.includes("mazouttank")) return "Keuring mazouttank aanvragen";
  if (s.includes("schatt") || s.includes("waarde-woning") || s.includes("geschatte-waarde")) return "Gratis schatting aanvragen";
  return "Gratis offerte aanvragen";
}
