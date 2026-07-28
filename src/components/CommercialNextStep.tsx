import Link from "next/link";
import type { ContentPage } from "@/lib/types";

type Destination = {
  href: string;
  lead: string;
  anchor: string;
  tail: string;
};

function destinationFor(page: ContentPage): Destination {
  const slug = page.slug;

  if (slug === "aankoopmakelaar") {
    return {
      href: "/kantoor",
      lead: "Wil je aankoopbegeleiding in jouw regio vergelijken, dan kun je",
      anchor: "vastgoedkantoren per gemeente bekijken",
      tail: "en hun diensten en werkingsgebied naast elkaar leggen.",
    };
  }

  if (slug.startsWith("asbestattest/")) {
    return {
      href: "/asbestattest",
      lead: "Wanneer dit onderwerp deel uitmaakt van een verkoopdossier, bundelt de hoofdpagina over",
      anchor: "het asbestattest",
      tail: "de aanvraag, prijsfactoren en verplichtingen.",
    };
  }

  if (slug.startsWith("huis-verkopen-verplichtingen/")) {
    return {
      href: "/huis-verkopen-verplichtingen",
      lead: "Voor de plaats van dit document in het volledige verkoopdossier bekijk je",
      anchor: "alle verplichtingen bij woningverkoop",
      tail: "in één overzicht.",
    };
  }

  if (/(schatten|waarde|geschatte)/.test(slug) && slug !== "huis-laten-schatten") {
    return {
      href: "/huis-laten-schatten",
      lead: "Wil je deze informatie vertalen naar een concrete marktwaarde, dan toont de gids over",
      anchor: "een woning laten schatten",
      tail: "hoe je waardebepalingen en schatters vergelijkt.",
    };
  }

  if (/(huur|verhuur|syndicus|blokpolis|plaatsbeschrijving)/.test(slug)) {
    return {
      href: "/kantoor",
      lead: "Voor professionele begeleiding bij verhuur of beheer kun je",
      anchor: "vastgoedkantoren per regio vergelijken",
      tail: "op basis van diensten en werkingsgebied.",
    };
  }

  if (/(kopen|aankoop|bieden|bod-|lening|krediet|hypothe|registratierechten|erfpacht|opstal|bouwgrond)/.test(slug)) {
    return {
      href: "/aankoopmakelaar",
      lead: "Wie bij deze beslissing professionele aankoopbegeleiding wil vergelijken, kan nagaan",
      anchor: "wat een aankoopmakelaar doet",
      tail: "en welke dienstverlening bij de situatie past.",
    };
  }

  if (slug === "woning-verkopen") {
    return {
      href: "/huis-verkopen-met-makelaar",
      lead: "Wie de verkoop niet volledig zelf wil uitvoeren, kan vergelijken",
      anchor: "hoe verkopen met een makelaar verloopt",
      tail: "en welke afspraken vooraf belangrijk zijn.",
    };
  }

  return {
    href: "/woning-verkopen",
    lead: "Wanneer dit onderwerp meespeelt bij een geplande verkoop, helpt het volledige stappenplan voor",
    anchor: "een woning verkopen",
    tail: "om documenten, timing en begeleiding samen te plannen.",
  };
}

export function CommercialNextStep({ page }: { page: ContentPage }) {
  const destination = destinationFor(page);
  if (destination.href === `/${page.slug}`) return null;

  return (
    <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
      <h2 className="text-xl font-extrabold tracking-tight text-brand-900">
        Welke volgende stap past bij dit onderwerp?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        {destination.lead}{" "}
        <Link href={destination.href} className="font-medium text-brand-700 underline underline-offset-2">
          {destination.anchor}
        </Link>{" "}
        {destination.tail}
      </p>
    </section>
  );
}
