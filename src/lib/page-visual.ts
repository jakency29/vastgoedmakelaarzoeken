import type { ContentPage, VisualType } from "./types";

type VisualConfig = {
  type: VisualType;
  label: string;
  description: string;
  prominentForm: boolean;
  contentWidth: string;
};

const CONFIG: Record<VisualType, Omit<VisualConfig, "type">> = {
  commercial: {
    label: "Vergelijken en aanvragen",
    description: "Praktische begeleiding bij je vastgoedbeslissing",
    prominentForm: true,
    contentWidth: "max-w-none",
  },
  service: {
    label: "Dienst en aanvraag",
    description: "Uitleg, aandachtspunten en een vrijblijvende aanvraag",
    prominentForm: true,
    contentWidth: "max-w-none",
  },
  cost: {
    label: "Kostenoverzicht",
    description: "Bedragen, prijsfactoren en vergelijkingspunten",
    prominentForm: false,
    contentWidth: "max-w-4xl",
  },
  legal: {
    label: "Regels en rechten",
    description: "Toepasselijke regels, uitzonderingen en vervolgstappen",
    prominentForm: false,
    contentWidth: "max-w-3xl",
  },
  process: {
    label: "Stappenplan",
    description: "Volgorde, documenten en praktische aandachtspunten",
    prominentForm: false,
    contentWidth: "max-w-4xl",
  },
  local: {
    label: "Lokale vergelijking",
    description: "Aanbieders en begeleiding in jouw regio",
    prominentForm: true,
    contentWidth: "max-w-none",
  },
  guide: {
    label: "Praktische gids",
    description: "Direct antwoord met uitleg en voorbeelden",
    prominentForm: false,
    contentWidth: "max-w-3xl",
  },
};

const COST_PATTERN =
  /(?:^|\/)(?:kosten?|prijs|tarief)|kosten?|prijs|tarief|commissie|belasting|rechten|kadastraal-inkomen|spaargeld|eigen-inbreng|huurprijs|meerwaarde/;
const LEGAL_PATTERN =
  /verplicht|wetgeving|vergunning|recht|erfen|schenk|overlijden|erfpacht|opstal|compromis|akte|bod-|gebrek|huurcontract|onderverhuur|lawaai|haag|takken|brievenbus|syndicus|scheiding/;
const PROCESS_PATTERN =
  /stappen|opmaken|aanvragen|keuren|verwijderen|verbouwen|leegmaken|verkoopklaar|plaatsen|verlijden/;

export function resolveVisualType(page: ContentPage, hasService: boolean): VisualType {
  if (page.visualType) return page.visualType;
  if (page.intent === "local") return "local";
  if (page.intent === "core") return "commercial";

  const subject = `${page.slug} ${page.title}`.toLowerCase();
  if (COST_PATTERN.test(subject)) return "cost";
  if (LEGAL_PATTERN.test(subject)) return "legal";
  if (PROCESS_PATTERN.test(subject)) return "process";
  if (hasService) return "service";
  return "guide";
}

export function pageVisualConfig(page: ContentPage, hasService: boolean): VisualConfig {
  const type = resolveVisualType(page, hasService);
  return { type, ...CONFIG[type] };
}
