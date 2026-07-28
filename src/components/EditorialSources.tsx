import type { ContentPage } from "@/lib/types";

type Source = {
  label: string;
  href: string;
};

const BIV: Source = {
  label: "Beroepsinstituut van Vastgoedmakelaars",
  href: "https://www.biv.be/",
};

const VERKOPEN: Source = {
  label: "Vlaanderen.be over een huis verkopen",
  href: "https://www.vlaanderen.be/bouwen-wonen-en-energie/kopen-en-verkopen/een-huis-verkopen",
};

const KOPEN: Source = {
  label: "Notaris.be over het aan- en verkoopproces",
  href: "https://www.notaris.be/wonen/aan-en-verkoop-van-een-woning/hoe-koop-verkoop-ik-een-woning",
};

const VERKOOPRECHT: Source = {
  label: "Vlaamse Belastingdienst over het verkooprecht",
  href: "https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht",
};

const ASBEST: Source = {
  label: "OVAM over het asbestattest",
  href: "https://ovam.vlaanderen.be/asbestattest",
};

const VERHUREN: Source = {
  label: "Vlaanderen.be over verhuren op de privémarkt",
  href: "https://www.vlaanderen.be/bouwen-wonen-en-energie/huren-en-verhuren/een-huis-of-appartement-verhuren-op-de-privemarkt",
};

const OMGEVING: Source = {
  label: "Vlaanderen.be over omgevingsvergunningen en vrijstellingen",
  href: "https://www.vlaanderen.be/omgevingsvergunning",
};

const EPC: Source = {
  label: "Vlaanderen.be over het EPC voor residentiële eenheden",
  href: "https://www.vlaanderen.be/bouwen-wonen-en-energie/energieprestatiecertificaten-epcs/epc-van-een-residentiele-gebouweenheid/uitleg-bij-het-epc-res",
};

function hasVisibleSources(page: ContentPage) {
  return /##\s+(Welke\s+)?offici.{0,3}le bronnen|##\s+Bronnen/i.test(page.body);
}

function sourcesFor(page: ContentPage): Source[] {
  const haystack = `${page.slug} ${page.title} ${page.description}`.toLowerCase();

  if (haystack.includes("asbest")) return [ASBEST, VERKOPEN];
  if (/(registratie|belasting|schenking|erfenis|nalatenschap|successie)/.test(haystack)) {
    return [VERKOOPRECHT, KOPEN];
  }
  if (/(huur|verhuur|syndicus|plaatsbeschrijving|blokpolis)/.test(haystack)) {
    return [VERHUREN, BIV];
  }
  if (/(epc|energie|isol|verwarm|renovatieplicht)/.test(haystack)) {
    return [EPC, OMGEVING];
  }
  if (/(vergunning|verbouw|bouw|tuin|haag|takken|container|brievenbus|lawaai)/.test(haystack)) {
    return [OMGEVING, VERKOPEN];
  }
  if (/(kopen|aankoop|bod|compromis|akte|notaris|hypothe|lening|krediet|erfpacht|opstal)/.test(haystack)) {
    return [KOPEN, VERKOOPRECHT];
  }
  return [VERKOPEN, BIV];
}

export function EditorialSources({ page }: { page: ContentPage }) {
  if (hasVisibleSources(page)) return null;
  const sources = sourcesFor(page);

  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="text-xl font-extrabold tracking-tight text-brand-900">
        Waar controleer je actuele regels en beroepsgegevens?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Actuele regels en beroepsgegevens controleer je bij de bevoegde overheid of officiële
        beroepsorganisatie. De volgende primaire bronnen sluiten aan bij dit onderwerp:
      </p>
      <ul className="mt-3 space-y-2">
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} className="font-medium text-brand-700 underline underline-offset-2">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
