import type { Kantoor } from "./kantoren";

export type PubliekOnderwerp = "verkoop" | "verhuur" | "schatting" | "aankoop" | "nieuwbouw" | "beheer" | "bedrijfsvastgoed" | "expertise";
export type KantoorBron = {
  label: string;
  url: string;
  geraadpleegdOp: string;
};
export type PubliekInzicht = {
  titel: string;
  tekst: string;
  vraag: string;
  bron: number;
};
export type KantoorInzichten = {
  onderwerpen: PubliekOnderwerp[];
  bronnen: KantoorBron[];
  inzichten: PubliekInzicht[];
};

// Handmatig gecontroleerde synthese van publieke kantoor- en dienstenpagina's.
// Een bron beschrijft het aanbod van de organisatie, geen onafhankelijk bewezen resultaat.
// De raadpleegdatum geldt uitsluitend voor deze inzichten, niet voor het volledige profiel.
const bron = (url: string, label = "Officiële kantoorwebsite"): KantoorBron => ({
  url, label, geraadpleegdOp: "2026-09-14",
});

export const kantoorInzichten: Record<string, KantoorInzichten> = {
  "we-invest-demervallei": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop"],
    bronnen: [bron("https://weinvest.be/nl-BE/agencies/demervallei-paal/62", "We Invest Demervallei: werkwijze en vestigingen")],
    inzichten: [
      { titel: "Presentatie en verspreiding", tekst: "We Invest Demervallei beschrijft professionele foto's, video's en verspreiding via vastgoedplatformen, sociale media en het klantenbestand als onderdelen van de verkoopaanpak.", vraag: "Welke van deze kanalen en beelden worden voor mijn woning ingezet en zijn inbegrepen?", bron: 0 },
      { titel: "Verhuur met dossierbegeleiding", tekst: "De verhuurwerkwijze vermeldt controle van kandidaat-huurders, het huurcontract en een plaatsbeschrijving. De website maakt daarnaast onderscheid tussen de vestigingen in Paal en Halen.", vraag: "Welk lokaal team behandelt mijn dossier en omvat de opdracht ook opvolging na de verhuring?", bron: 0 },
    ],
  },
  "hillewaere-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "bedrijfsvastgoed"],
    bronnen: [bron("https://www.hillewaere-vastgoed.be/", "Hillewaere: aanbodcategorieën en waardesimulator")],
    inzichten: [
      { titel: "Verschillende vastgoedsegmenten", tekst: "Hillewaere onderscheidt op de website residentieel vastgoed, bedrijfsvastgoed, investeringsvastgoed en hippisch vastgoed. Er is daarnaast een aparte selectie exclusieve eigendommen.", vraag: "Welke medewerker behandelt mijn type vastgoed en welke vergelijkbare dossiers kan die toelichten?", bron: 0 },
      { titel: "Online waarde-indicatie", tekst: "De website biedt een waardesimulator naast een overzicht van vastgoedexperts. De aanwezigheid van deze tool zegt niets over de uiteindelijke verkoopprijs van een specifieke woning.", vraag: "Hoe wordt de online indicatie aangevuld met een plaatsbezoek en vergelijkbare panden?", bron: 0 },
    ],
  },
  "heylen-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "beheer"],
    bronnen: [bron("https://www.heylenvastgoed.be/", "Heylen Vastgoed: dienstverlening van de organisatie")],
    inzichten: [
      { titel: "Verhuur en afzonderlijk beheer", tekst: "Heylen Vastgoed presenteert verhuur en property management als aparte diensten. De verhuurtekst vermeldt ook administratieve en juridische afhandeling.", vraag: "Gaat mijn offerte alleen over een huurder vinden, of ook over het beheer tijdens de huur?", bron: 0 },
      { titel: "Aparte aanpak voor exclusief vastgoed", tekst: "De organisatie biedt onder de naam Heylen Exclusief een afzonderlijke presentatie- en verkoopaanpak aan. Dit is een formule van het kantoor, geen kwaliteitsbeoordeling van dit platform.", vraag: "Welke concrete extra's biedt deze formule voor mijn pand en hoe verschilt het tarief?", bron: 0 },
    ],
  },
  "vastgoed-michoel": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "bedrijfsvastgoed"],
    bronnen: [bron("https://vastgoedmichoel.be/nl")],
    inzichten: [
      { titel: "Eén aanspreekpunt", tekst: "Vastgoed Michoel beschrijft een werkwijze met één persoon die het dossier van begin tot einde kent. Pauline Michoel wordt op de website als makelaar vermeld.", vraag: "Wie begeleidt de bezoeken en wie neemt het dossier over bij afwezigheid?", bron: 0 },
      { titel: "Ook commercieel vastgoed", tekst: "Naast woningen vermeldt het kantoor verkoop en verhuur van commercieel vastgoed en begeleiding bij nieuwbouwprojecten.", vraag: "Welke aanpak stellen jullie voor mijn woning, handelspand of nieuwbouwproject voor?", bron: 0 },
    ],
  },
  "immo-de-prins": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://immodeprins.be/", "Immo De Prins: openbare werkwijze")],
    inzichten: [
      { titel: "Marketing in meerdere kanalen", tekst: "De openbare werkwijze vermeldt professionele fotografie, vastgoedplatformen, sociale media en mailings naar kandidaat-kopers.", vraag: "Welke presentatie en verspreiding zijn in mijn verkoopopdracht opgenomen?", bron: 0 },
      { titel: "Begeleiding tot de akte", tekst: "Immo De Prins beschrijft begeleide bezoeken, onderhandelingen en samenwerking met de gekozen notaris bij de verkoopovereenkomst en notariële akte.", vraag: "Wie volgt de voorwaarden en documenten op tussen het bod en de akte?", bron: 0 },
    ],
  },
  "immo-plees": {
    onderwerpen: ["verkoop", "verhuur", "schatting"],
    bronnen: [bron("https://immoplees.be/nl/onze-diensten/verkoop", "Immo Plees: verkoopdienst")],
    inzichten: [
      { titel: "Verkoopdossier en attesten", tekst: "Immo Plees beschrijft het opvragen van vastgoedinformatie en benodigde attesten als onderdeel van de dossiersamenstelling. Dat vermeldt nog niet welke externe kosten inbegrepen zijn.", vraag: "Welke documenten vragen jullie aan en welke facturen betaal ik afzonderlijk?", bron: 0 },
      { titel: "Vaste begeleiding bij bezoeken", tekst: "Volgens de verkoopdienst worden bezichtigingen begeleid door een vast teamlid. Biedingen en eventuele tegenvoorstellen worden met de eigenaar besproken.", vraag: "Wie doet de bezoeken en hoe ontvang ik feedback en biedingen?", bron: 0 },
    ],
  },
  "living-stone-dilbeek": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://living-stone.be/vastgoedhuizen/vastgoedhuis-dilbeek", "Living Stone: vestiging Dilbeek"), bron("https://living-stone.be/verkopen/verkoopformules", "Living Stone: verkoopformules van de organisatie")],
    inzichten: [
      { titel: "Classic of avant-première", tekst: "Living Stone beschrijft een klassieke verkoop met flexibele bezoeken en een avant-première met een gebundeld kijkmoment en een biedingsperiode. Deze formules staan op de website van de organisatie.", vraag: "Welke formule kan de vestiging Dilbeek voor mijn woning aanbieden en waarom?", bron: 1 },
      { titel: "Bezoek aan het vastgoedhuis", tekst: "De vestigingspagina vermeldt ontvangst met of zonder afspraak in Dilbeek. Op zaterdag is ontvangst volgens de gepubliceerde openingsuren op afspraak.", vraag: "Kan ik vooraf een gesprek met de verantwoordelijke voor mijn woning vastleggen?", bron: 0 },
    ],
  },
  "coga-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://coga.be/")],
    inzichten: [
      { titel: "Twee lokale vestigingen", tekst: "COGA vermeldt een kantoor in Brecht en een kantoor in Sint-Job-in-'t-Goor. De website presenteert die als één team.", vraag: "Welke vestiging en welke makelaar volgen mijn eigendom op?", bron: 0 },
      { titel: "Juridische expertise binnen de organisatie", tekst: "COGA noemt interne juridische expertise als onderdeel van zijn aanpak. Daarnaast toont de website een afzonderlijk aanbod nieuwbouwprojecten.", vraag: "Welke juridische controles worden in mijn dossier uitgevoerd en door wie?", bron: 0 },
    ],
  },
  "just-wonen": {
    onderwerpen: ["verkoop", "verhuur", "schatting"],
    bronnen: [bron("https://www.justwonen.be/onze-services", "Just Wonen: diensten en samenwerking")],
    inzichten: [
      { titel: "Verhuurdossier", tekst: "Just Wonen vermeldt screening van kandidaat-huurders, contractopmaak en een plaatsbeschrijving in de beschrijving van de verhuurdienst.", vraag: "Welke onderdelen en eventuele nazorg omvat de verhuurofferte?", bron: 0 },
      { titel: "Vastgoed, verzekeringen en advies", tekst: "De website onderscheidt Just Wonen, Just Verzekerd en Just Advies als drie bedrijven met elk hun eigen specialiteit. Het zijn dus niet automatisch onderdelen van één vastgoedopdracht.", vraag: "Met welke onderneming sluit ik een overeenkomst en welke diensten worden afzonderlijk aangerekend?", bron: 0 },
    ],
  },
  "homerun": {
    onderwerpen: ["verkoop", "schatting"],
    bronnen: [bron("https://www.homerun.immo/nl/verkopen", "Homerun: verkooptraject")],
    inzichten: [
      { titel: "Verkooptraject in afzonderlijke stappen", tekst: "Homerun noemt waardebepaling, presentatie, verkoopdossier, online en offline publiciteit, begeleide bezoeken en onderhandelingen als stappen in het verkooptraject.", vraag: "Welke planning, beelden en publiciteitskanalen stellen jullie voor mijn woning voor?", bron: 0 },
      { titel: "Compromis en notariële afronding", tekst: "De verkoopdienst vermeldt ook de opmaak van het compromis en begeleiding tot en met de notariële akte.", vraag: "Wie stemt het compromis af met mijn notaris en wie bewaakt de afgesproken termijnen?", bron: 0 },
    ],
  },
  "swevers-real-estate": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://www.swevers.be/")],
    inzichten: [
      { titel: "Digitale schatting of plaatsbezoek", tekst: "Swevers biedt via de assistente Claire een online schatting aan en vermeldt daarnaast de mogelijkheid van persoonlijk advies aan huis.", vraag: "Is de voorgestelde vraagprijs gebaseerd op een plaatsbezoek en krijg ik de onderbouwing te zien?", bron: 0 },
      { titel: "Meerdere Limburgse aanspreekpunten", tekst: "De website vermeldt onder meer kantoren in Beringen, Hasselt, Heusden-Zolder en Borgloon, plus een Vastgoedcafé in Hasselt.", vraag: "Welk team behandelt mijn gemeente en wie wordt mijn vaste contactpersoon?", bron: 0 },
    ],
  },
  "axpertise-vastgoed-advies": {
    onderwerpen: ["verkoop", "aankoop", "schatting", "expertise"],
    bronnen: [bron("https://www.axpertise.be/")],
    inzichten: [
      { titel: "Aanvullende vastgoedexpertise", tekst: "De website vermeldt onder AXPERTISE Plus professionele waardebepalingen en plaatsbeschrijvingen naast bemiddeling bij aankoop en verkoop.", vraag: "Kan ik een afzonderlijke expertise bestellen en wat bevat het schriftelijke verslag?", bron: 0 },
      { titel: "Genoemde dossierverantwoordelijke", tekst: "Seppe Schaepkens wordt op de website voorgesteld als vastgoedmakelaar en vastgoedexpert. Dat geeft een concrete naam om de inhoud van de opdracht mee te bespreken.", vraag: "Voert Seppe Schaepkens zelf het plaatsbezoek en de expertise uit?", bron: 0 },
    ],
  },
  "av-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "bedrijfsvastgoed"],
    bronnen: [bron("https://av-vastgoed.be/")],
    inzichten: [
      { titel: "Afzonderlijke rubriek voor horeca", tekst: "AV Vastgoed heeft naast koop, huur en nieuwbouw een aparte horecarubriek op de website. Dat is een nuttig vertrekpunt bij een vraag over een horecapand.", vraag: "Omvat jullie opdracht alleen het vastgoed of ook andere onderdelen van een eventuele overname?", bron: 0 },
      { titel: "Schatting en afspraak", tekst: "De website biedt een gratis, vrijblijvende schatting aan en vermeldt ontvangst op zaterdag op afspraak.", vraag: "Kan de schatting ter plaatse gebeuren en ontvang ik een schriftelijke prijsindicatie?", bron: 0 },
    ],
  },
  "claar-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop"],
    bronnen: [bron("https://claarvastgoed.be/over-ons", "Claar Vastgoed: verantwoordelijke en bereikbaarheid")],
    inzichten: [
      { titel: "Pieter Claes als aanspreekpunt", tekst: "Claar Vastgoed stelt Pieter Claes op de over-ons-pagina voor als de drijvende kracht achter het kantoor. De aanpak vertrekt volgens die pagina van de woonvoorkeuren van de klant.", vraag: "Wie begeleidt mijn dossier en hoe worden mijn zoek- of verkoopvoorwaarden vastgelegd?", bron: 0 },
      { titel: "Gesprek buiten kantooruren", tekst: "De gepubliceerde openingsuren lopen op weekdagen tot 20 uur. Zaterdag wordt als op afspraak vermeld. Controleer de beschikbaarheid voor een concreet gesprek vooraf.", vraag: "Kan ik ook bezoeken of dossierbesprekingen in de avond plannen?", bron: 0 },
    ],
  },
  "century21-immok-sint-truiden": {
    onderwerpen: ["verkoop", "verhuur", "schatting"],
    bronnen: [bron("https://www.century21.be/nl/kantoor/century-21-immo-k/dnHjCXoB5YVLjoN9cmYW", "CENTURY 21 Immo K: lokaal kantoorprofiel")],
    inzichten: [
      { titel: "Hageland en Haspengouw", tekst: "Immo K beschrijft expliciet een focus op Hageland en Haspengouw, vanuit de kantoren in Tienen en Sint-Truiden. Dit is specifieker dan het volledige internationale franchisenetwerk.", vraag: "Welke lokale makelaar behandelt mijn gemeente en welke vergelijkbare panden kent die?", bron: 0 },
      { titel: "Voorbereiding tot notariële afhandeling", tekst: "De kantoorpagina vermeldt begeleiding bij verkoop en verhuur, aandacht voor documenten zoals het EPC en publicatie van het aanbod. Voor verkoop wordt begeleiding tot bij de notaris beschreven.", vraag: "Welke voorbereiding nemen jullie over en welke documentkosten blijven voor mij?", bron: 0 },
    ],
  },
  "era-connect": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop"],
    bronnen: [bron("https://www.era.be/nl/era-connect", "ERA CONNECT: lokaal werkgebied en diensten")],
    inzichten: [
      { titel: "Expliciet lokaal werkgebied", tekst: "ERA CONNECT noemt Hoeselt, Bilzen, Tongeren en Riemst als zijn werkgebied. De lokale pagina biedt aparte ingangen voor verkoop, verhuur en waardebepaling.", vraag: "Welke medewerker heeft recente dossiers met mijn woningtype in mijn gemeente?", bron: 0 },
      { titel: "Lokale begeleiding binnen een netwerk", tekst: "De pagina koppelt een eigen team en lokaal aanbod aan de informatie en stappenplannen van ERA. Netwerkinformatie is niet hetzelfde als een concrete offerte van de lokale vestiging.", vraag: "Welke ERA-diensten zijn daadwerkelijk in mijn lokale opdracht inbegrepen?", bron: 0 },
    ],
  },
  "era-impact-maaseik": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop", "nieuwbouw"],
    bronnen: [bron("https://www.era.be/nl/era-impact", "ERA IMPACT: kantoren en regionaal aanbod")],
    inzichten: [
      { titel: "Samenwerking tussen Bree en Maaseik", tekst: "ERA IMPACT vermeldt vestigingen in Bree en Maaseik en noemt ook Bocholt, Peer, Oudsbergen en Kinrooi in het werkgebied.", vraag: "Vanuit welke vestiging worden de bezoeken en de opvolging van mijn pand georganiseerd?", bron: 0 },
      { titel: "Ook een traject voor nieuwbouw", tekst: "Naast verkoop, verhuur en waardebepaling heeft de lokale ERA IMPACT-pagina een ingang voor ontwikkelen en nieuwbouw.", vraag: "Gaat de begeleiding over een bestaand pand, aankoop op plan of de ontwikkeling van mijn grond?", bron: 0 },
    ],
  },
  "era-nobis-sint-truiden": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop", "nieuwbouw"],
    bronnen: [bron("https://www.era.be/nl/era-nobis", "ERA NOBIS: organisatie en vestigingen")],
    inzichten: [
      { titel: "Vestiging binnen een kantorengroep", tekst: "De ERA NOBIS-website vermeldt Sint-Truiden naast onder meer Alken, Genk, Hasselt, Herk-de-Stad en Zonhoven. De centrale pagina beschrijft de diensten van de groep.", vraag: "Wie is mijn contactpersoon in Sint-Truiden en wat wordt met andere vestigingen gedeeld?", bron: 0 },
      { titel: "Verkoop, verhuur en ontwikkelen", tekst: "De dienstenrubriek maakt onderscheid tussen bestaande eigendommen verkopen of verhuren, waardebepaling en een traject voor ontwikkelen en nieuwbouw.", vraag: "Welk team en welke opdracht passen bij mijn bestaande woning of nieuwbouwproject?", bron: 0 },
    ],
  },
  "found-baker-properties-limburg": {
    onderwerpen: ["verkoop", "verhuur", "nieuwbouw"],
    bronnen: [bron("https://www.found-baker.com/nl/limburg", "Found & Baker: kantoor Limburg en publicatiekanalen")],
    inzichten: [
      { titel: "Positionering in het hogere segment", tekst: "Found & Baker presenteert zijn Limburgse vestiging in Hasselt als een kantoor voor luxevastgoed. Dat is de eigen marktpositionering, geen onafhankelijke kwaliteitsscore.", vraag: "Welke vergelijkbare eigendommen en kandidaatprofielen sluiten aan bij mijn pand?", bron: 0 },
      { titel: "Een eigen vastgoedmagazine", tekst: "De kantoorpagina verwijst naar een eigen magazine van Found & Baker, naast het online koop-, huur- en nieuwbouwaanbod.", vraag: "Komt mijn eigendom voor publicatie in het magazine in aanmerking en wat zijn de voorwaarden?", bron: 0 },
    ],
  },
  "het-bedrijfskantoor": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "bedrijfsvastgoed", "expertise"],
    bronnen: [bron("https://www.bedrijfskantoor.be/diensten", "Het Bedrijfskantoor: zakelijke vastgoeddiensten")],
    inzichten: [
      { titel: "Dienstverlening voor bedrijfspanden", tekst: "Het Bedrijfskantoor richt de dienstenpagina op ondernemers en bedrijfsvastgoed, met verkoop, verhuur, nieuwbouwprojecten en advies.", vraag: "Welke ervaring heeft de dossierverantwoordelijke met mijn type bedrijfsruimte en gebruik?", bron: 0 },
      { titel: "Twee soorten waardebepaling", tekst: "De website onderscheidt een gratis waardebepaling van een dienst die zij een erkende schatting noemt. De inhoud en het gebruiksdoel van die rapporten worden hier niet gelijkgesteld.", vraag: "Welk verslag heb ik voor mijn doel nodig, wie stelt het op en wat kost het?", bron: 0 },
    ],
  },
  "hozimmo": {
    onderwerpen: ["verkoop", "schatting", "expertise"],
    bronnen: [bron("https://hozimmo.be/nl/over-ons", "Hozimmo: persoonlijke begeleiding en schattingen")],
    inzichten: [
      { titel: "Persoonlijke opvolging door de zaakvoerder", tekst: "Admon Hozi beschrijft op de website dat hij zelf bezichtigingen, onderhandelingen en ondertekeningen begeleidt, met één vast aanspreekpunt.", vraag: "Hoe wordt mijn dossier opgevolgd en wat is de regeling bij afwezigheid?", bron: 0 },
      { titel: "Schatting voor een nalatenschap", tekst: "Naast verkoopbegeleiding vermeldt Hozimmo schattingen voor aangiftes van een nalatenschap. Dit is een afzonderlijk gebruiksdoel ten opzichte van een indicatieve verkoopprijs.", vraag: "Welk type verslag leveren jullie voor mijn nalatenschapsdossier en tegen welk tarief?", bron: 0 },
    ],
  },
  "immo-minnaert": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop", "expertise"],
    bronnen: [bron("https://immominnaert.be/nl", "Immo Minnaert: openbare dienstenbeschrijving")],
    inzichten: [
      { titel: "Familie-eigendom en projectanalyse", tekst: "Immo Minnaert noemt bemiddeling bij de verdeling van familie-eigendom, projectanalyse en het onderzoeken van mogelijkheden rond mede-eigendom als afzonderlijke diensten.", vraag: "Welke analyse is voor mijn situatie mogelijk en welke andere deskundigen moeten daarbij betrokken worden?", bron: 0 },
      { titel: "Ook atypische eigendommen", tekst: "Het kantoor vermeldt naast woningen en villa's ook monumenten, benzinestations en kasteeldomeinen. Dit is een beschrijving van het aanbod, geen bewijs van recente transacties in elk segment.", vraag: "Welke concrete ervaring kan de makelaar aantonen met mijn specifieke eigendom?", bron: 0 },
    ],
  },
  "immosign-plus-bree": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://immosign-plus.be/nl", "Immosign+: projecten en kantoorafspraken")],
    inzichten: [
      { titel: "Nieuwbouw naast bestaande woningen", tekst: "Immosign+ beschrijft nieuwbouwprojecten, verkoop en verhuur van residentieel vastgoed. De website onderscheidt nieuwe projecten van projecten die zij als uitverkocht aanduidt.", vraag: "Wie begeleidt mijn project en welke stappen horen bij de aankoop of verkoop op plan?", bron: 0 },
      { titel: "Ontvangst op afspraak", tekst: "De organisatie vermeldt kantoren in Bree en Bocholt en schrijft dat ontvangst uitsluitend op afspraak gebeurt.", vraag: "In welke vestiging vindt mijn gesprek plaats en welke documenten breng ik mee?", bron: 0 },
    ],
  },
  "living-stone-hasselt": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://living-stone.be/vastgoedhuizen/vastgoedhuis-hasselt", "Living Stone: vestiging Hasselt"), bron("https://living-stone.be/verkopen/verkoopformules", "Living Stone: verkoopformules van de organisatie")],
    inzichten: [
      { titel: "Vergelijk twee verkoopformules", tekst: "Living Stone beschrijft Classic met flexibele bezoekmomenten en Avant-première met een gebundeld kijkmoment en biedingsperiode. Dit is het aanbod van de organisatie; bespreek de toepassing met Hasselt.", vraag: "Welke formule past bij mijn woning en wat gebeurt er als er geen passend bod komt?", bron: 1 },
      { titel: "Gesprek op afspraak in Hasselt", tekst: "De vestigingspagina situeert het vastgoedhuis in Books the Office aan het Kolonel Dusartplein. De gepubliceerde uren vermelden ontvangst op afspraak van maandag tot zaterdag.", vraag: "Wie ontvangt mij in Hasselt en wie voert het plaatsbezoek aan mijn woning uit?", bron: 0 },
    ],
  },
  "matisimmo-hasselt": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://matisimmo.be/nl/verkoop", "Matisimmo: verkoopwerkwijze van de organisatie")],
    inzichten: [
      { titel: "Fotograaf en publiciteit", tekst: "Matisimmo beschrijft een plaatsbezoek door de regioverantwoordelijke, een professionele fotograaf, publicatie op immosites en een verkoopbord in het verkooptraject.", vraag: "Welke fotografie en publiciteit zijn voor mijn pand inbegrepen en wie is mijn regioverantwoordelijke?", bron: 0 },
      { titel: "Van bod tot sleuteloverdracht", tekst: "De tijdlijn vermeldt begeleide bezichtigingen, advies bij biedingen en het opstellen van de verkoopovereenkomst in samenwerking met de notaris, gevolgd door akte en sleuteloverdracht.", vraag: "Wie stemt de afspraken met mijn notaris af en hoe blijf ik op de hoogte?", bron: 0 },
    ],
  },
  "onroerend-goed-genk": {
    onderwerpen: ["aankoop", "schatting", "expertise"],
    bronnen: [bron("https://onroerendgoedtekoop.be/nl/aankoopbegeleiding", "Onroerend Goed: inhoud van de aankoopbegeleiding")],
    inzichten: [
      { titel: "Analyse vóór aankoop", tekst: "De aankoopbegeleiding beschrijft een bezichtiging met prijsinschatting en aandacht voor technische, bouwkundige, stedenbouwkundige en juridische aspecten.", vraag: "Welke onderzoeken en documenten vallen onder jullie analyse en krijg ik een schriftelijk verslag?", bron: 0 },
      { titel: "Ondersteuning bij onderhandelingen", tekst: "Als het pand aan de voorwaarden van de koper voldoet, vermeldt het kantoor ook hulp bij het onderhandelen over de aankoopprijs.", vraag: "Voor wiens rekening treden jullie op en hoe is de vergoeding voor aankoopbegeleiding opgebouwd?", bron: 0 },
    ],
  },
  "engel-voelkers-noord-limburg": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "bedrijfsvastgoed"],
    bronnen: [bron("https://www.engelvoelkers.com/be/nl/shops/noord-limburg", "Engel & Völkers: lokale diensten en talen")],
    inzichten: [
      { titel: "Meertalige dienstverlening", tekst: "De lokale kantoorpagina vermeldt Nederlands, Engels, Frans en Duits als gesproken talen. De beschikbaarheid van een specifieke medewerker wordt daarbij niet vermeld.", vraag: "Kan mijn dossier en de communicatie met kandidaat-kopers in de gewenste taal verlopen?", bron: 0 },
      { titel: "Verschillende segmenten en plaatsbezoek", tekst: "Noord-Limburg vermeldt onder meer woningen, villa's, beleggingspanden en commerciële ruimte als expertisegebieden. De pagina biedt ook een waardebepaling op locatie aan.", vraag: "Welke lokale medewerker kent mijn segment en hoe wordt de waardebepaling onderbouwd?", bron: 0 },
    ],
  },
  "hermania-genk": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "beheer"],
    bronnen: [bron("https://hermania.be/nl", "Hermania: dienstenoverzicht"), bron("https://hermania.be/nl/rentmeesterschap", "Hermania: taken van de rentmeester")],
    inzichten: [
      { titel: "Huurbeheer na de verhuring", tekst: "Hermania beschrijft bij rentmeesterschap de opvolging van huurbetalingen, contact met huurders en aanmaningen bij achterstand. Dit gaat verder dan alleen een huurder zoeken.", vraag: "Welke beheertaken en eventuele kosten bij wanbetaling staan in de opdracht?", bron: 1 },
      { titel: "Rentmeester en syndicus apart vermeld", tekst: "De website maakt onderscheid tussen rentmeesterschap en syndicus, naast verkoop, verhuur en projectontwikkeling.", vraag: "Heb ik beheer van mijn eigen verhuurpand nodig, of beheer van de gemeenschappelijke delen van het gebouw?", bron: 0 },
    ],
  },
  "idylia-zonhoven": {
    onderwerpen: ["nieuwbouw", "aankoop"],
    bronnen: [bron("https://www.idylia.be/", "Idylia: nieuwbouw en projectontwikkeling")],
    inzichten: [
      { titel: "Focus op nieuwbouw en oplevering", tekst: "Idylia presenteert zich als projectontwikkelaar en beschrijft begeleiding bij een woning uit het eigen aanbod, vanaf de eerste interesse tot de oplevering.", vraag: "Wie begeleidt keuzes, meerwerken en oplevering, en wat is in de aankoopprijs opgenomen?", bron: 0 },
      { titel: "Ook een gesprek over projectgrond", tekst: "Idylia geeft aan ontwikkelingsgronden te zoeken. Dat is een andere vraag dan een bestaande woning via een verkoopmakelaar op de markt brengen.", vraag: "Willen jullie de grond zelf aankopen of is een andere samenwerking mogelijk?", bron: 0 },
    ],
  },
  "vastgoed-c-pelt": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "beheer", "expertise"],
    bronnen: [bron("https://vastgoedc.be/", "Vastgoed C: diensten van de organisatie"), bron("https://vastgoedc.be/diensten/schade-expert", "Vastgoed C: schade-expertise")],
    inzichten: [
      { titel: "Ook schade-expertise", tekst: "Vastgoed C beschrijft het vaststellen van schade aan een pand en het streven naar een minnelijke regeling als aparte expertisedienst. Een vergoeding wordt hier niet gegarandeerd.", vraag: "Wie voert de expertise uit en wat omvat het verslag en de opvolging?", bron: 1 },
      { titel: "Verkoop en rentmeesterschap", tekst: "De organisatie onderscheidt makelaar-verkoop, rentmeester, schatter en adviseur. De website vermeldt Pelt als een van haar vestigingen.", vraag: "Welke diensten worden vanuit Pelt uitgevoerd en welke hebben een afzonderlijke opdracht?", bron: 0 },
    ],
  },
  "vrolix-immo-bouw": {
    onderwerpen: ["verkoop", "verhuur", "aankoop"],
    bronnen: [bron("https://www.immo-vrolix.be/")],
    inzichten: [
      { titel: "Woning, appartement of grond", tekst: "Vrolix Immo&Bouw vermeldt begeleiding bij aankoop, verkoop en verhuur. Voor verkoop noemt het kantoor expliciet woningen, gronden en appartementen.", vraag: "Welke vergelijkbare panden kan de makelaar bespreken voor mijn type eigendom?", bron: 0 },
      { titel: "Technische en administratieve aandacht", tekst: "Het kantoor noemt naast commerciële en juridische aspecten ook technische kennis in zijn begeleiding. De openbare beschrijving specificeert geen afzonderlijk bouwkundig onderzoeksrapport.", vraag: "Welke technische controle voeren jullie uit en wanneer is een afzonderlijke deskundige nodig?", bron: 0 },
    ],
  },
  "artes-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "bedrijfsvastgoed"],
    bronnen: [bron("https://artes-vastgoed.be/nl/over-ons/ons-aanpak", "Artes Vastgoed: gepubliceerde aanpak en tarieven")],
    inzichten: [
      { titel: "Publiek verkooptarief", tekst: "Artes publiceert een verkoopcommissie van 3% inclusief btw, volgens de bron inclusief attesten. Voor bijzondere panden vermeldt het kantoor maatwerkvoorwaarden. Dit is een gepubliceerd tarief, geen persoonlijke offerte.", vraag: "Geldt dit tarief voor mijn eigendom en welke inbegrepen prestaties en uitzonderingen staan in de opdracht?", bron: 0 },
      { titel: "Presentatie met Nodalview", tekst: "De aanpak noemt Nodalview voor foto's, virtuele rondleidingen, video's en grondplannen, plus verspreiding via meerdere marketingkanalen.", vraag: "Welke beelden, rondleiding en grondplannen worden daadwerkelijk voor mijn pand gemaakt?", bron: 0 },
    ],
  },
  "domo-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw", "beheer"],
    bronnen: [bron("https://www.domovastgoed.be/", "Domo Vastgoed: diensten en Rent-Protect")],
    inzichten: [
      { titel: "Rentmeesterschap onder Rent-Protect", tekst: "Domo vermeldt Rent-Protect als dienst voor rentmeesterschap naast de gewone verhuurdienst. De naam op zichzelf bewijst geen verzekeringsdekking of gegarandeerde huurbetaling.", vraag: "Welke beheertaken, eventuele waarborgen, uitsluitingen en kosten zijn schriftelijk vastgelegd?", bron: 0 },
      { titel: "Nieuwbouw en renovatie", tekst: "Het kantoor beschrijft ook begeleiding bij nieuwbouwprojecten en energiezuinige renovatie, naast de verkoop en verhuur van bestaande eigendommen.", vraag: "Treden jullie bij mijn project op als makelaar, projectpartner of ontwikkelaar?", bron: 0 },
    ],
  },
  "schraepen-vastgoed": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "aankoop"],
    bronnen: [bron("https://schraepenvastgoed.be/diensten/", "Schraepen Vastgoed: waardebepaling en aankoopbegeleiding")],
    inzichten: [
      { titel: "Plaatsbezoek en nabespreking", tekst: "Schraepen beschrijft eerst een bezoek aan de eigendom en daarna een gesprek op kantoor over de waardebepaling en het plan voor verkoop of verhuur.", vraag: "Krijg ik de waardebepaling, vergelijkingspanden en voorgestelde aanpak ook op papier?", bron: 0 },
      { titel: "Aankoop met aandacht voor renovatie", tekst: "De aankoopbegeleiding vermeldt advies over de staat van de woning en renovatiemogelijkheden, naast zoeken, onderhandelen en afronden.", vraag: "Hoe diep gaat die beoordeling en welke onderzoeken vragen een afzonderlijke expert?", bron: 0 },
    ],
  },
  "sensimmo-maasmechelen": {
    onderwerpen: ["verkoop", "verhuur", "schatting", "nieuwbouw"],
    bronnen: [bron("https://www.sensimmo.be/nl-be", "Sensimmo: projectadvies en vestiging Maasmechelen")],
    inzichten: [
      { titel: "Projectadvies voor beleggers", tekst: "Sensimmo beschrijft financiële en commerciële begeleiding bij vastgoedprojecten voor particuliere en professionele beleggers. Dat is geen toezegging over rendement.", vraag: "Welke analyse ontvang ik en welke aannames, kosten en risico's worden daarin opgenomen?", bron: 0 },
      { titel: "Maasmechelen op afspraak", tekst: "De website onderscheidt de kantoren in Genk en Maasmechelen. Voor Maasmechelen staat uitsluitend ontvangst op afspraak vermeld.", vraag: "Wie ontvangt mij in Maasmechelen en wie wordt verantwoordelijk voor mijn dossier?", bron: 0 },
    ],
  },
};

export function getKantoorInzichten(slug: string): KantoorInzichten | undefined {
  return kantoorInzichten[slug];
}

export function formatBronDatum(datum: string): string {
  return new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(datum));
}

// Provincienamen zijn geen lokale overlap. Selectie is geen kwaliteitsrangschikking;
// premium, Google-score, reviewaantal en toevoegdatum hebben hier geen invloed.
const bredeRegios = new Set(["limburg", "antwerpen", "oost-vlaanderen", "west-vlaanderen", "vlaams-brabant", "vlaanderen", "belgië", "regio antwerpen"]);
const normaliseer = (naam: string) => naam.trim().toLocaleLowerCase("nl-BE");

export function vergelijkbareKantoren(kantoor: Kantoor, kandidaten: Kantoor[], limit = 2) {
  const eigen = getKantoorInzichten(kantoor.slug);
  if (!eigen || limit < 1) return [];
  const eigenRegios = new Set([kantoor.gemeente, ...kantoor.regios].map(normaliseer).filter(r=>!bredeRegios.has(r)));
  return kandidaten.flatMap(k => {
    const inzichten = getKantoorInzichten(k.slug);
    if (k.slug === kantoor.slug || !inzichten || k.provincie !== kantoor.provincie) return [];
    const gedeeld = eigen.onderwerpen.filter(onderwerp => inzichten.onderwerpen.includes(onderwerp));
    if (!gedeeld.length) return [];
    const zelfdeGemeente = normaliseer(k.gemeente) === normaliseer(kantoor.gemeente);
    const gedeeldeRegio = [k.gemeente, ...k.regios].find(r=>eigenRegios.has(normaliseer(r)));
    return [{
      kantoor: k,
      inzichten,
      reden: zelfdeGemeente ? `Ook gevestigd in ${kantoor.gemeente}` : gedeeldeRegio ? `Beide profielen vermelden ${gedeeldeRegio}` : `Ook in ${kantoor.provincie}; controleer het werkgebied`,
      lokaal: zelfdeGemeente ? 2 : gedeeldeRegio ? 1 : 0,
      overlap: gedeeld.length,
    }];
  }).sort((a,b) => b.lokaal-a.lokaal || b.overlap-a.overlap || a.kantoor.naam.localeCompare(b.kantoor.naam, "nl-BE")).slice(0, Math.floor(limit));
}
