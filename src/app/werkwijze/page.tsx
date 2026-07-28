import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListSchema } from "@/lib/jsonld";
import { absoluteUrl, site } from "@/lib/site";
import { getAllPages } from "@/lib/content";
import { kantoren } from "@/lib/kantoren";

export const metadata: Metadata = {
  title: { absolute: "Onze werkwijze | Vastgoedmakelaar Zoeken" },
  description:
    "Lees hoe Vastgoedmakelaar Zoeken aanvragen verwerkt, kantoorprofielen samenstelt, BIV-nummers controleert en commerciële samenwerkingen vermeldt.",
  alternates: { canonical: "/werkwijze" },
};

const stappen = [
  {
    titel: "Je beschrijft je aanvraag",
    tekst:
      "Je kiest wat je wilt doen en vult je postcode en contactgegevens in. Een adres is bij een algemene aanvraag optioneel.",
  },
  {
    titel: "Wij verwerken de aanvraag",
    tekst:
      "De aanvraag komt centraal binnen. Bij een algemeen formulier kan ze worden bezorgd aan een of meer kantoren die in de opgegeven regio actief zijn.",
  },
  {
    titel: "Je vergelijkt zelf",
    tekst:
      "Een aanvraag is gratis en vrijblijvend. Je beoordeelt zelf het tarief, de aanpak, de inbegrepen diensten en de voorwaarden van ieder voorstel.",
  },
];

export default function WerkwijzePage() {
  const kennisbankPaginaCount = getAllPages().filter((page) => !page.noindex).length;
  const gecontroleerdeKantoren = kantoren.filter(
    (kantoor) => kantoor.bivNummer && kantoor.bivBron && kantoor.bivGecontroleerdOp,
  ).length;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/werkwijze")}#page`,
    url: absoluteUrl("/werkwijze"),
    name: "Onze werkwijze",
    description: metadata.description,
    inLanguage: "nl",
    isPartOf: { "@id": `${site.domain}/#website` },
    about: [
      { "@type": "Thing", name: "Vastgoedmakelaar vergelijken" },
      { "@type": "Organization", name: "Beroepsinstituut van Vastgoedmakelaars" },
    ],
  };

  return (
    <main>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
          <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="font-medium text-brand-800">Onze werkwijze</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Hoe werkt Vastgoedmakelaar Zoeken?
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
            Vastgoedmakelaar Zoeken is een Belgische vergelijkingsdienst die eigenaars in Vlaanderen
            en Brussel helpt om vastgoedkantoren te vinden en vrijblijvend voorstellen aan te vragen
            voor verkoop, verhuur of waardebepaling.
          </p>
          <p className="mt-3 text-sm font-semibold text-brand-700">Laatst bijgewerkt: 28 juli 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">
          Hoe wordt een aanvraag verwerkt?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Een aanvraag wordt centraal ontvangen en daarna verwerkt volgens het gekozen formulier en
          de opgegeven regio. Op een kantoorprofiel vermeldt het formulier de naam van dat kantoor.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stappen.map((stap, index) => (
            <div key={stap.titel} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 font-extrabold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold text-brand-900">{stap.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{stap.tekst}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Hoe worden vastgoedkantoren opgenomen?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Een kantoorprofiel wordt samengesteld uit publiek beschikbare kantoorgegevens en informatie
          van het kantoor zelf. We vermelden onder meer de vestigingsplaats, het werkingsgebied, de
          diensten, contactgegevens, het BIV-nummer en Google-reviews wanneer die gegevens beschikbaar
          zijn.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Een profiel is geen kwaliteitsgarantie of persoonlijk advies. Controleer tarieven,
          contractvoorwaarden en de persoon die je dossier behandelt voordat je een mandaat tekent.
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Hoe wordt een BIV-nummer gecontroleerd?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Een BIV-nummer wordt gecontroleerd aan de hand van de wettelijke vermeldingen van het
          kantoor en, waar een rechtstreeks profiel beschikbaar is, de officiële databank van het
          Beroepsinstituut van Vastgoedmakelaars. Op ieder kantoorprofiel tonen we het gebruikte
          nummer, de bron en de datum van de laatste controle.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Een erkenning hoort bij de vastgoedmakelaar of erkende onderneming die de activiteit
          uitoefent. Controleer daarom ook wie je dossier concreet behandelt in de{" "}
          <a
            href="https://www.biv.be/"
            className="font-medium text-brand-700 underline underline-offset-2"
          >
            officiële BIV-databank
          </a>
          .
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Wat betekent een premiumbadge?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Een premiumbadge maakt een commerciële samenwerking zichtbaar. De badge is geen
          kwaliteitscertificaat en betekent niet automatisch dat het kantoor voor iedere aanvraag de
          beste keuze is. Vergelijk altijd de inhoud en voorwaarden van de ontvangen voorstellen.
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Hoe worden reviews en kantoorinformatie bijgewerkt?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Reviews op kantoorprofielen worden uit Google Places opgehaald wanneer een koppeling
          beschikbaar is. Diensten, adressen, BIV-nummers en werkingsgebieden worden afzonderlijk in
          de kantoorprofielen bijgehouden. Een fout of verouderd gegeven kun je melden via de{" "}
          <Link href="/contact" className="font-medium text-brand-700 underline underline-offset-2">
            contactpagina
          </Link>
          .
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Welke eigen controles publiceren we?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Onze redactionele inventaris telt momenteel {kennisbankPaginaCount} indexeerbare
          kennisbankpagina&apos;s. Iedere gids toont een eigen bronsectie of een redactioneel
          geselecteerde lijst met primaire bronnen. Feiten die per gemeente of situatie verschillen,
          worden als voorwaardelijk antwoord beschreven.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-3xl font-extrabold text-brand-900">{kennisbankPaginaCount}</p>
            <p className="mt-1 text-sm text-slate-600">indexeerbare gidsen in de inventaris</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-3xl font-extrabold text-brand-900">
              {gecontroleerdeKantoren}/{kantoren.length}
            </p>
            <p className="mt-1 text-sm text-slate-600">kantoorprofielen met BIV-bron en controledatum</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-3xl font-extrabold text-brand-900">28 juli 2026</p>
            <p className="mt-1 text-sm text-slate-600">laatste volledige redactionele controle</p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          Deze cijfers worden rechtstreeks uit de gepubliceerde content en kantoorprofielen
          berekend. Ze zijn geen claim over marktdekking, bezoekersaantallen of het aantal
          succesvolle verkopen.
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Hoe neem je contact op over de werking van het platform?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Vragen over een aanvraag, kantoorprofiel, commerciële samenwerking of inhoudelijke fout
          kun je mailen naar{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-brand-700 underline underline-offset-2">
            {site.email}
          </a>
          . Vermeld bij een correctieverzoek de pagina en de bron waarmee we het gegeven kunnen
          controleren.
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-brand-900">
          Wat moet je zelf vergelijken?
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Vergelijk minstens het commissietarief, de inbegrepen publiciteit, de looptijd van het
          mandaat, de opzegvoorwaarden, de lokale ervaring en de voorgestelde vraagprijs. De laagste
          commissie is niet automatisch het voordeligste voorstel als belangrijke dienstverlening
          ontbreekt.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Een praktisch overzicht vind je bij de{" "}
          <Link href="/kosten-vastgoedmakelaar" className="font-medium text-brand-700 underline underline-offset-2">
            kosten van een vastgoedmakelaar
          </Link>{" "}
          en de stappen om een{" "}
          <Link href="/huis-verkopen-met-makelaar" className="font-medium text-brand-700 underline underline-offset-2">
            woning met een makelaar te verkopen
          </Link>
          .
        </p>
      </div>

      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "Onze werkwijze", path: "/werkwijze" },
      ])} />
    </main>
  );
}
