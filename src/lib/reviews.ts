// Google-reviews ophalen via de Places API (New): places.googleapis.com/v1/places/{id}.
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

type NewReview = {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

export async function getPlaceReviews(placeId?: string): Promise<PlaceReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key || !placeId) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=nl`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const reviews: PlaceReview[] = (data.reviews ?? []).map((x: NewReview) => ({
      author: x.authorAttribution?.displayName ?? "",
      rating: Number(x.rating ?? 0),
      text: x.text?.text ?? "",
      relativeTime: x.relativePublishTimeDescription ?? "",
      profilePhoto: x.authorAttribution?.photoUri,
      authorUrl: x.authorAttribution?.uri,
      time: x.publishTime ? Date.parse(x.publishTime) : 0,
    }));
    return {
      rating: Number(data.rating ?? 0),
      total: Number(data.userRatingCount ?? 0),
      reviews,
    };
  } catch {
    return null;
  }
}
