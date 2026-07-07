// Reviews-sectie (Zillow-stijl): gemiddelde + sterren + enkele reviewkaarten, via Google.

import { Rating } from "./Rating";
import type { PlaceReviews } from "@/lib/reviews";

export function Reviews({
  data,
  placeId,
  naam,
  max = 4,
}: {
  data: PlaceReviews;
  placeId?: string;
  naam: string;
  max?: number;
}) {
  if (!data.total) return null;
  const reviews = data.reviews.slice(0, max);
  const allUrl = placeId ? `https://search.google.com/local/reviews?placeid=${placeId}` : undefined;

  return (
    <section className="mt-10" aria-labelledby="reviews">
      <h2 id="reviews" className="text-2xl font-extrabold tracking-tight text-brand-900">
        Reviews van {naam}
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-4xl font-extrabold text-brand-900">{data.rating.toFixed(1)}</span>
        <div>
          <Rating rating={data.rating} />
          <p className="mt-1 text-sm text-slate-500">
            Gebaseerd op {data.total} Google-review{data.total === 1 ? "" : "s"}
          </p>
        </div>
        {allUrl && (
          <a
            href={allUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-brand-800 hover:border-brand-300"
          >
            Alle reviews op Google
          </a>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <figure key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                {r.profilePhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.profilePhoto} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                    {r.author.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <figcaption>
                  <p className="font-semibold text-brand-900">{r.author}</p>
                  <p className="text-xs text-slate-500">{r.relativeTime}</p>
                </figcaption>
              </div>
              <Rating rating={r.rating} className="mt-3" />
              <blockquote className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-700">{r.text}</blockquote>
            </figure>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">Reviews via Google.</p>
    </section>
  );
}
