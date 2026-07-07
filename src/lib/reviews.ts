// Google-reviews ophalen via de Google Places API (Place Details).
// Eén server-side API-sleutel (env GOOGLE_PLACES_API_KEY) werkt voor alle kantoren via hun Place ID.
// Resultaat wordt via Next ISR een dag gecachet, zodat we niet bij elke bezoeker de API aanroepen.
// Zonder sleutel of Place ID geeft dit null terug (de UI verbergt de reviews dan netjes).

export type PlaceReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
  authorUrl?: string;
  time: number;
};

export type PlaceReviews = {
  rating: number; // gemiddelde (0 tot 5)
  total: number; // aantal reviews
  reviews: PlaceReview[]; // tot 5 reviews van Google
};

export async function getPlaceReviews(placeId?: string): Promise<PlaceReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key || !placeId) return null;
  try {
    const url =
      "https://maps.googleapis.com/maps/api/place/details/json" +
      `?place_id=${encodeURIComponent(placeId)}` +
      "&fields=rating,user_ratings_total,reviews&language=nl&reviews_sort=newest" +
      `&key=${key}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== "OK" || !data.result) return null;
    const r = data.result;
    const reviews: PlaceReview[] = (r.reviews ?? []).map((x: Record<string, unknown>) => ({
      author: String(x.author_name ?? ""),
      rating: Number(x.rating ?? 0),
      text: String(x.text ?? ""),
      relativeTime: String(x.relative_time_description ?? ""),
      profilePhoto: x.profile_photo_url ? String(x.profile_photo_url) : undefined,
      authorUrl: x.author_url ? String(x.author_url) : undefined,
      time: Number(x.time ?? 0),
    }));
    return {
      rating: Number(r.rating ?? 0),
      total: Number(r.user_ratings_total ?? 0),
      reviews,
    };
  } catch {
    return null;
  }
}
