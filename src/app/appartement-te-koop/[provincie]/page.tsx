import { getCategorie } from "@/lib/woningen";
import { ProvincieView, provincieParams, provincieMetadata } from "@/components/listing-pages";

const cat = getCategorie("appartement-te-koop")!;
export const dynamicParams = false;

export function generateStaticParams() {
  return provincieParams(cat);
}

type Props = { params: Promise<{ provincie: string }> };

export async function generateMetadata({ params }: Props) {
  const { provincie } = await params;
  return provincieMetadata(cat, provincie);
}

export default async function Page({ params }: Props) {
  const { provincie } = await params;
  return <ProvincieView cat={cat} provincieSlug={provincie} />;
}
