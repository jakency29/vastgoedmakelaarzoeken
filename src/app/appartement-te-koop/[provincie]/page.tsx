// Enkel segment onder /appartement-te-koop/: ofwel een provincie-listing, ofwel een woning-detail.
// Provincie-slugs -> ProvincieView; woning-slugs (bv. ...-147729) -> detail.

import { notFound } from "next/navigation";
import { getCategorie, provinciesVoor, woningenVoor, getWoningBySlug, categorieVanWoning } from "@/lib/woningen";
import { ProvincieView, provincieMetadata } from "@/components/listing-pages";
import { WoningDetailView, woningMetadata } from "@/components/WoningDetailView";

const cat = getCategorie("appartement-te-koop")!;
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...provinciesVoor(cat).map((p) => ({ provincie: p.slug })),
    ...woningenVoor(cat).map((w) => ({ provincie: w.slug })),
  ];
}

type Props = { params: Promise<{ provincie: string }> };

export async function generateMetadata({ params }: Props) {
  const { provincie } = await params;
  const w = getWoningBySlug(provincie);
  if (w && categorieVanWoning(w)?.key === cat.key) return woningMetadata(w);
  return provincieMetadata(cat, provincie);
}

export default async function Page({ params }: Props) {
  const { provincie } = await params;
  if (provinciesVoor(cat).some((p) => p.slug === provincie)) {
    return <ProvincieView cat={cat} provincieSlug={provincie} />;
  }
  const w = getWoningBySlug(provincie);
  if (w && categorieVanWoning(w)?.key === cat.key) return <WoningDetailView w={w} />;
  notFound();
}
