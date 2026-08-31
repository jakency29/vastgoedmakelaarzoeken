export type OfficeSort = "newest" | "name" | "reviews" | "rating";

export type OrderableOffice = {
  naam: string;
  premium: boolean;
  toegevoegdOp?: string;
  rating?: number;
  reviewTotal?: number;
};

function dateValue(value?: string) {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function compareOffices(a: OrderableOffice, b: OrderableOffice, sort: OfficeSort) {
  if (a.premium !== b.premium) return a.premium ? -1 : 1;

  if (sort === "reviews") {
    return (b.reviewTotal ?? -1) - (a.reviewTotal ?? -1) || a.naam.localeCompare(b.naam, "nl-BE");
  }
  if (sort === "rating") {
    return (b.rating ?? -1) - (a.rating ?? -1)
      || (b.reviewTotal ?? -1) - (a.reviewTotal ?? -1)
      || a.naam.localeCompare(b.naam, "nl-BE");
  }
  if (sort === "name") return a.naam.localeCompare(b.naam, "nl-BE");

  return dateValue(b.toegevoegdOp) - dateValue(a.toegevoegdOp)
    || a.naam.localeCompare(b.naam, "nl-BE");
}
