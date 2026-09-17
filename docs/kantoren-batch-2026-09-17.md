# Drie volgende kantoren, 17 september 2026

## Scope en selectie

De eerstvolgende drie kandidaten uit `node scripts/kantoor-queue.mjs next --limit 3` worden toegevoegd: Immo Hertogen, immosign+ Bocholt en Marc Swevers Immobiliën Borgloon. De laatste naam wordt gepubliceerd onder de actuele publieksnaam Swevers Real Estate Borgloon. Geen mails verstuurd en geen andere kantoren toegevoegd.

Topical role: lokale kantoorprofielen. Page type: bestaande RealEstateAgent-template. Zoekintentie: kantoor en vestiging herkennen, diensten en publieke ervaringen bekijken en een aanvraag doen. Centrale entiteiten: de drie afzonderlijke vestigingen. Gerelateerde entiteiten: Wellen, Haspengouw, Bocholt, Bree, Borgloon, Tongeren-Borgloon en de betreffende BIV-houders. De extra waarde bestaat uit de juiste vestigingskoppeling en twee brononderbouwde gesprekspunten per kantoor, zonder gemeten SEO- of kwaliteitsclaims.

## Geverifieerde gegevens

| Profiel | Adres | E-mail | Google Place ID | Score bij controle |
| --- | --- | --- | --- | --- |
| `immo-hertogen` | Zangstraat 37, 3830 Wellen | immo.hertogen@telenet.be | ChIJD08oIvoewUcRGK_AfP_dxmE | 4,9/5, 7 reviews |
| `immosign-plus-bocholt` | Dorpsstraat 15, 3950 Bocholt | info@immosign-plus.be | ChIJOxdZJ-LVwEcR4GixpaobbNM | 4,9/5, 113 reviews |
| `swevers-real-estate-borgloon` | Papenstraat 5, 3840 Borgloon | immo@swevers.be | ChIJoeJJlDAdwUcRYJCQZl62phQ | 5,0/5, 87 reviews |

De scores en reviewteksten komen via de bestaande Google Places-koppeling, niet uit de kandidatenlijst of een andere vestiging. Google leverde vijf beoordelingen per kantoor. Bij Hertogen bevatten drie daarvan tekst en twee alleen een score; er wordt niets bijgeschreven. De bestaande component toont maximaal vier kaarten en een link naar alle beoordelingen. Er is geen scorefilter toegevoegd. Gemiddelden en aantallen staan niet hardcoded in de profieldata.

## Bronnen, geraadpleegd op 17 september 2026

### Immo Hertogen

- [Contact en erkenningen](https://immohertogen.be/contact/): adres, telefoon, e-mail, BIV 500060 op naam van Rudiger Hertogen en vermelding energiedeskundige type A.
- [Homepage](https://immohertogen.be/): werkgebied en diensten.
- [Verkoopaanpak](https://immohertogen.be/verkopen/): vrijblijvende schatting met plaatsbezoek en het beschreven verkooptraject. Geen verkoopsnelheid of resultaatgarantie overgenomen.
- [Origineel logo](https://immohertogen.be/wp-content/uploads/2026/09/Logo_Retina_3676x900.webp), ongewijzigd opgeslagen als `public/afbeeldingen/kantoren/immo-hertogen.webp`.

### Immosign+ Bocholt

- [Officiële homepage](https://immosign-plus.be/nl): nieuwbouw, verkoop, verhuur, online schatting, werkgebied Limburg en uitsluitend ontvangst op afspraak.
- [Officiële contactpagina](https://immosign-plus.be/nl/contact): Dorpsstraat 15 en BIV 510400 op naam van Elke Neeskens.
- Het bestaande merklogo `immosign-plus-bree.jpg` is byte voor byte gelijk aan het actuele logo uit de officiële header (`/cms-assets/theme/logoUrl?hash=686a12140de17f451d3066db8800af8d440ad39291e58878aa9ed41b017d7616934acfde293c96cee9f2adadb190f75706295a21a444e71f163bddf3c8992d4a`). Het merklogo wordt hergebruikt, de Google Place ID niet.

### Swevers Real Estate Borgloon

- [Officiële vestigingspagina](https://www.swevers.be/kantoren/makelaar-borgloon/489203): adres, eigen telefoonnummer, e-mail, Haspengouw en openingsuren.
- [Officiële homepage](https://www.swevers.be/): verkoop, aanbod, online schatting met Claire en persoonlijk advies aan huis.
- [BIV-register Marc Swevers 502259](https://www.biv.be/vastgoedmakelaars/marc-swevers-502259): de houder en het bijkantoor Papenstraat 5 staan vermeld. De kantoorwebsite gebruikt Borgloon, Google specificeert Tongeren-Borgloon. Beide worden herkenbaar in de intro verwerkt.
- Het bestaande `swevers-real-estate.svg` gebruikt hetzelfde woordmerkpad als de inline SVG in de officiële homepage en wordt hergebruikt.

## Publicatie en QA

- Bestaande lokale wijzigingen voor SBC Vastgoed en woning 166345 blijven buiten de commit.
- Unitchecks: `node --test scripts/check-kantoor-inzichten.mjs`.
- Lint op gewijzigde TypeScript- en testbestanden; productiebuild met de bestaande Google-koppeling.
- HTTP QA lokaal en live: `node scripts/qa-kantoor-profielen.mjs <basis-url> immo-hertogen immosign-plus-bocholt swevers-real-estate-borgloon`.
- Regressie: `node scripts/qa-kantoor-inzichten.mjs <basis-url>`.
- Logo's ook visueel controleren. Na succesvolle publicatie de drie exacte kandidaten als toegevoegd markeren in de lokale wachtrij, met profiel-URL en e-mailadres.
