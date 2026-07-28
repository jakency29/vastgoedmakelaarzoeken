import type { ContentPage } from "@/lib/types";

type Example = {
  question: string;
  answer: string;
  details: string;
};

const examples: Record<string, Example> = {
  "woning-verkopen": {
    question: "Hoe ziet een verkoopplanning er in de praktijk uit?",
    answer:
      "Een eigenaar die binnen drie maanden wil verkopen, begint best met de waardebepaling en de verplichte documenten voordat de woning wordt gepubliceerd.",
    details:
      "Stel dat het EPC nog ontbreekt en de elektrische installatie moet worden gekeurd. Door beide afspraken meteen vast te leggen, kan de makelaar intussen de verkoopstrategie en presentatie voorbereiden. Zo verklein je de kans dat een kandidaat-koper moet wachten op essentiële informatie.",
  },
  "huis-verkopen-met-makelaar": {
    question: "Hoe vergelijk je twee makelaarsvoorstellen in de praktijk?",
    answer:
      "Vergelijk twee voorstellen op de geschatte netto-opbrengst en de concrete dienstverlening, niet alleen op het commissiepercentage.",
    details:
      "Een lager ereloon kan minder voordelig zijn wanneer professionele fotografie, bezoeken, publiciteit of administratieve opvolging apart worden aangerekend. Zet daarom per voorstel het ereloon, de inbegrepen diensten, de looptijd en de opzegvoorwaarden naast elkaar voordat je een mandaat tekent.",
  },
  "kosten-vastgoedmakelaar": {
    question: "Hoe bereken je de impact van een makelaarstarief?",
    answer:
      "Bereken eerst het ereloon volgens de offerte en trek daarna alle afzonderlijk aangerekende verkoopkosten af van de verwachte verkoopprijs.",
    details:
      "Bij een procentueel tarief controleer je of btw inbegrepen is en op welk bedrag het percentage wordt toegepast. Bij een vast tarief kijk je welke publiciteit, fotografie, bezoeken en dossieropvolging inbegrepen zijn. Zo vergelijk je voorstellen op dezelfde basis.",
  },
  "huis-laten-schatten": {
    question: "Waarom kunnen twee schattingen van dezelfde woning verschillen?",
    answer:
      "Twee schattingen kunnen verschillen doordat de vergelijkingspanden, de staat van de woning en het gekozen waardebegrip niet hetzelfde zijn.",
    details:
      "Vraag daarom welke recente verkopen als vergelijking zijn gebruikt en of het bedrag een marktwaarde, vraagprijs of verwachte verkoopprijs is. Een goed onderbouwde schatting maakt ook duidelijk welke renovaties, liggingselementen en attesten de waarde beïnvloeden.",
  },
  aankoopmakelaar: {
    question: "Wanneer levert aankoopbegeleiding praktisch voordeel op?",
    answer:
      "Aankoopbegeleiding is vooral nuttig wanneer je snel moet beslissen maar de prijs, documenten of technische staat niet zelf kan beoordelen.",
    details:
      "Bij een woning met een renovatieplicht kan een aankoopmakelaar bijvoorbeeld het bod helpen afstemmen op de verwachte werken en passende voorwaarden bespreken. De koper blijft zelf verantwoordelijk voor de uiteindelijke beslissing en laat juridische afspraken best door de notaris controleren.",
  },
  "huis-verkopen-verplichtingen": {
    question: "Hoe voorkom je vertraging door ontbrekende verkoopdocumenten?",
    answer:
      "Maak vóór de publicatie een dossierlijst en noteer per attest wie het aanvraagt, wat nog ontbreekt en wanneer het beschikbaar moet zijn.",
    details:
      "Een praktisch dossier bevat onder meer de eigendomstitel en de attesten die voor het pand en de regio gelden. De notaris en vastgoedmakelaar kunnen aangeven welke stukken in jouw situatie nodig zijn. Begin tijdig, want niet elk document is onmiddellijk beschikbaar.",
  },
  "ouderlijk-huis-verkopen-voor-overlijden": {
    question: "Welke controle voorkomt een vastgelopen familiale verkoop?",
    answer:
      "Controleer vóór een waardebepaling wie juridisch eigenaar is en wie geldig kan instemmen met de verkoop.",
    details:
      "Wanneer een ouder nog leeft maar een zorgvolmacht of bewind een rol speelt, kan de beslissingsbevoegdheid anders liggen dan de familie verwacht. Laat de notaris daarom eerst de eigendomsakte, het huwelijksstelsel en eventuele volmachten of rechterlijke beslissingen nakijken.",
  },
  "postinterventiedossier": {
    question: "Hoe controleer je een postinterventiedossier vóór de verkoop?",
    answer:
      "Controleer of het dossier de plannen, technische fiches en informatie over uitgevoerde werken bevat die een volgende eigenaar nodig heeft.",
    details:
      "Ontbreken documenten, vraag dan eerst de bouwheer, architect of aannemers om kopieën. Meld resterende leemtes aan de notaris en kandidaat-koper. Het dossier reconstrueren vlak voor het compromis kost vaak meer tijd dan een controle bij de start van de verkoop.",
  },
};

export function PracticalExample({ page }: { page: ContentPage }) {
  const example = examples[page.slug];
  if (!example) return null;

  return (
    <section className="mt-10 rounded-2xl border border-accent-300 bg-amber-50/60 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Praktijkvoorbeeld</p>
      <h2 className="mt-2 text-xl font-extrabold tracking-tight text-brand-900">
        {example.question}
      </h2>
      <p className="mt-3 leading-relaxed text-slate-700">{example.answer}</p>
      <p className="mt-3 leading-relaxed text-slate-700">{example.details}</p>
    </section>
  );
}
