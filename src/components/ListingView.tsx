// Herbruikbare listing-weergave (overzicht/provincie/gemeente) voor huis- en appartement-takken.

import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { ListingResults } from "./ListingResults";
import { absoluteUrl } from "@/lib/site";
import { getKantoor } from "@/lib/kantoren";
import { woningHref, type Woning } from "@/lib/woningen";

type Crumb = { name: string; href?: string };
type Chip = { label: string; href: string; count: number };

export function ListingView({
  breadcrumb,
  title,
  subtitle,
  path,
  chips,
  woningen,
  content,
}: {
  breadcrumb: Crumb[];
  title: string;
  subtitle: string;
  path: string;
  chips?: Chip[];
  woningen: Woning[];
  content?: React.ReactNode;
}) {
  const url = absoluteUrl(path);
  const itemListId = `${url}#woningaanbod`;
  const itemList = {
    "@type": "ItemList",
    "@id": itemListId,
    name: title,
    numberOfItems: woningen.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: woningen.map((woning, index) => {
      const detailUrl = absoluteUrl(woningHref(woning));
      const kantoor = getKantoor(woning.kantoorSlug);
      return {
        "@type": "ListItem",
        position: index + 1,
        url: detailUrl,
        item: {
          "@type": woning.typeUID.includes("apartment") || woning.typeUID.includes("flat") ? "Apartment" : "House",
          "@id": `${detailUrl}#woning`,
          name: `${woning.type} te koop aan de ${woning.adres} in ${woning.gemeente}`,
          url: detailUrl,
          ...(woning.fotos[0] ? { image: absoluteUrl(woning.fotos[0]) } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: woning.adres,
            postalCode: woning.postcode,
            addressLocality: woning.gemeente,
            addressRegion: woning.provincie,
            addressCountry: "BE",
          },
          ...(woning.slaapkamers ? { numberOfBedrooms: woning.slaapkamers } : {}),
          ...(woning.bewoonbaar ? { floorSize: { "@type": "QuantitativeValue", value: woning.bewoonbaar, unitCode: "MTK" } } : {}),
          ...(woning.grond ? { landSize: { "@type": "QuantitativeValue", value: woning.grond, unitCode: "MTK" } } : {}),
          ...(woning.toegevoegdOp ? { datePosted: woning.toegevoegdOp } : {}),
          ...(woning.prijs
            ? {
                offers: {
                  "@type": "Offer",
                  url: detailUrl,
                  price: woning.prijs,
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  ...(kantoor ? { seller: { "@type": "RealEstateAgent", name: kantoor.naam, url: absoluteUrl(`/kantoor/${kantoor.slug}`) } } : {}),
                },
              }
            : {}),
        },
      };
    }),
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description: subtitle,
        inLanguage: "nl-BE",
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.href ?? path),
        })),
      },
      itemList,
    ],
  };

  return (
    <main>
      <JsonLd data={pageSchema} />
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumb.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-700 hover:underline">{c.name}</Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-brand-800">{c.name}</span>
                  )}
                  {i < breadcrumb.length - 1 && <span aria-hidden="true" className="text-slate-300">/</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{subtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {chips && chips.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {chips.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm hover:border-brand-300"
              >
                {c.label} <span className="text-slate-400">({c.count})</span>
              </Link>
            ))}
          </div>
        )}

        {woningen.length ? (
          <ListingResults woningen={woningen} heading={title} />
        ) : (
          <p className="text-slate-600">Er zijn momenteel geen panden beschikbaar in deze categorie.</p>
        )}

        {content && <div className="mt-14 max-w-3xl">{content}</div>}
      </div>
    </main>
  );
}
