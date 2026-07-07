import { getCategorie } from "@/lib/woningen";
import { OverviewView, overviewMetadata } from "@/components/listing-pages";

const cat = getCategorie("appartement-te-koop")!;
export const metadata = overviewMetadata(cat);

export default function Page() {
  return <OverviewView cat={cat} />;
}
