import Link from "next/link";
import type { ContentPage } from "@/lib/types";
import { site } from "@/lib/site";

export function AuthorCard({ page }: { page: ContentPage }) {
  if (page.type !== "Article") return null;

  return (
    <section aria-labelledby="article-author" className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Geschreven door</p>
      <h2 id="article-author" className="mt-2 text-xl font-extrabold tracking-tight text-brand-900">
        <Link href={site.author.path} className="hover:text-brand-700 hover:underline">
          {site.author.name}
        </Link>
      </h2>
      <p className="mt-2 leading-relaxed text-slate-700">
        Jan Kenis is oprichter van Jakency en schrijft en onderhoudt de kennisbank van Vastgoedmakelaar Zoeken op basis van officiële bronnen en inhoudelijke controles.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
        <Link href={site.author.path} className="text-brand-700 underline underline-offset-2">
          Bekijk het auteursprofiel
        </Link>
        <a href={site.author.linkedinUrl} className="text-brand-700 underline underline-offset-2">
          Jan Kenis op LinkedIn
        </a>
      </div>
    </section>
  );
}
