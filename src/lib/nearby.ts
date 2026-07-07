// "In de buurt": nabije voorzieningen via de Places API (New) searchNearby, op basis van
// de coordinaten van het pand. Geen kaart, enkel een lijst. Gecachet per week.
// Zonder API-sleutel of coordinaten geeft dit null (de sectie wordt dan verborgen).

export type NearbyPlace = { naam: string; categorie: string; afstand: number };

const TYPE_NL: Record<string, string> = {
  supermarket: "Supermarkt", grocery_store: "Buurtwinkel", bakery: "Bakker", pharmacy: "Apotheek",
  primary_school: "Basisschool", school: "School", secondary_school: "Middelbare school",
  bus_stop: "Bushalte", transit_station: "Openbaar vervoer", train_station: "Station",
  park: "Park", restaurant: "Restaurant", hospital: "Ziekenhuis", doctor: "Huisarts",
  gym: "Sportzaal", cafe: "Cafe",
};

function haversine(la1: number, lo1: number, la2: number, lo2: number) {
  const R = 6371000, r = Math.PI / 180;
  const dLa = (la2 - la1) * r, dLo = (lo2 - lo1) * r;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function getNearby(lat?: number | null, lng?: number | null): Promise<NearbyPlace[] | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key || lat == null || lng == null) return null;
  try {
    const body = {
      includedTypes: ["supermarket", "school", "primary_school", "bakery", "pharmacy", "bus_stop", "train_station", "park", "restaurant"],
      maxResultCount: 15,
      rankPreference: "DISTANCE",
      locationRestriction: { circle: { center: { latitude: lat, longitude: lng }, radius: 3000 } },
    };
    const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.displayName,places.primaryType,places.types,places.location",
      },
      body: JSON.stringify(body),
      next: { revalidate: 604800 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const perCat = new Map<string, number>();
    const out: NearbyPlace[] = [];
    for (const p of data.places ?? []) {
      const cat = TYPE_NL[p.primaryType] ?? (p.types ?? []).map((t: string) => TYPE_NL[t]).find(Boolean);
      if (!cat || !p.location) continue;
      if ((perCat.get(cat) ?? 0) >= 1) continue; // hoogstens 1 per categorie
      perCat.set(cat, 1);
      out.push({
        naam: p.displayName?.text ?? "",
        categorie: cat,
        afstand: Math.round(haversine(lat, lng, p.location.latitude, p.location.longitude)),
      });
    }
    out.sort((a, b) => a.afstand - b.afstand);
    return out.slice(0, 6);
  } catch {
    return null;
  }
}
