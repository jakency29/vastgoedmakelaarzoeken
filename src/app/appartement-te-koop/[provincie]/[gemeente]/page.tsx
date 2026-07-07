import { getCategorie } from "@/lib/woningen";
import { GemeenteView, gemeenteParams, gemeenteMetadata } from "@/components/listing-pages";

const cat = getCategorie("appartement-te-koop")!;
export const dynamicParams = false;

export function generateStaticParams() {
  return gemeenteParams(cat);
}

type Props = { params: Promise<{ provincie: string; gemeente: string }> };

export async function generateMetadata({ params }: Props) {
  const { provincie, gemeente } = await params;
  return gemeenteMetadata(cat, provincie, gemeente);
}

export default async function Page({ params }: Props) {
  const { provincie, gemeente } = await params;
  return <GemeenteView cat={cat} provincieSlug={provincie} gemeenteSlug={gemeente} />;
}
