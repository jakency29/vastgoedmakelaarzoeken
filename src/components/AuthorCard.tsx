import Link from "next/link";
import Image from "next/image";
import type { ContentPage } from "@/lib/types";
import { site } from "@/lib/site";

export function AuthorCard({ page }: { page: ContentPage }) {
  // De kennisbank bevat naast Article ook enkele gidsen met WebPage- of
  // Service-schema. Toon de auteur op elke pagina die in het kennisbankoverzicht
  // staat, maar niet op uitgesloten of regionale kantoorlandingspagina's.
  if (page.noindex || page.slug.startsWith("vastgoedkantoren/")) return null;

  return (
    <section aria-labelledby="article-author" className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Image
          src={site.author.image}
          alt="Jan Kenis, oprichter van Vastgoedmakelaarzoeken.com"
          width={112}
          height={112}
          className="h-24 w-24 shrink-0 rounded-full border-4 border-white object-cover shadow-sm sm:h-28 sm:w-28"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Geschreven door</p>
          <h2 id="article-author" className="mt-2 text-xl font-extrabold tracking-tight text-brand-900">
            <Link href={site.author.path} className="hover:text-brand-700 hover:underline">
              {site.author.name}
            </Link>
          </h2>
          <p className="mt-2 leading-relaxed text-slate-700">
            Jan Kenis is oprichter van Vastgoedmakelaarzoeken.com, gepassioneerd door vastgoed en alles rond bouwen, energie, wonen en renovatie. Hij schrijft en onderhoudt de kennisbank op basis van officiële bronnen en inhoudelijke controles.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <Link href={site.author.path} className="text-brand-700 underline underline-offset-2">
              Bekijk het auteursprofiel
            </Link>
            <a href={site.author.linkedinUrl} className="text-brand-700 underline underline-offset-2">
              Jan Kenis op LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
