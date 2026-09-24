# Drie volgende kantoren, 24 september 2026

## Scope en entiteiten

Volgende drie kandidaten uit de lokale wachtrij: Boes & Boes, CENTURY 21 Animo Heusden-Zolder en Consimmo Vastgoed. De tweede wordt onder de huidige naam Animo Vastgoed gepubliceerd. Geen e-mails versturen.

Topical role: lokale kantoorprofielen in de bestaande RealEstateAgent-template. Zoekintentie: de juiste vestiging herkennen, publiek beschreven dienstverlening en Google-reviews bekijken, contact opnemen. Centrale entiteiten: elk kantoor, de bijbehorende vestiging, verantwoordelijke makelaar en afzonderlijke Google-vermelding. Plaatsen: Hasselt, Heusden-Zolder, Beringen en Genk. Geen nieuwe SEO-clusterpagina of onafhankelijke kwaliteitsbeoordeling. De extra waarde zit in brongebaseerde dienstenuitleg en twee praktische gespreksvragen per kantoor.

## Gecontroleerde gegevens

| Profiel | Adres | E-mail | Google Place ID | Google bij controle |
| --- | --- | --- | --- | --- |
| `boes-en-boes` | Ridderstraat 20, 3500 Hasselt | info@boesenboes.be | ChIJ8eEiw4AhwUcR6WSxPc3foAY | 4,9/5, 49 reviews |
| `animo-vastgoed` | Guido Gezellelaan 44, 3550 Heusden-Zolder | info@animovastgoed.be | ChIJgZLc9xYlwUcR-vx0zlX9gPs | 4,8/5, 133 reviews |
| `consimmo-vastgoed` | Emiel Van Dorenlaan 76, 3600 Genk | info@consimmo.be | ChIJsb5h9zPZwEcRq2wY0Srynjw | 4,8/5, 102 reviews |

Google Places bevestigt bij alle drie OPERATIONAL en overeenkomende telefoons, websites en adressen. Alle drie leveren vijf reviews met tekst en auteursvermelding. De bestaande component toont maximaal vier kaarten. Geen scorefilter toegevoegd; gemiddelden en aantallen blijven via Google opgehaald.

## Primaire bronnen, geraadpleegd op 24 september 2026

### Boes & Boes

- [Contact](https://www.boesenboes.be/nl/contact/): Ridderstraat 20, 011 23 26 04, info@boesenboes.be. Google vermeldt aanvullend /B; het profiel volgt het officiële bezoekadres zonder bus. Een afwijkend telefoonnummer in de verkoop-CTA is niet overgenomen.
- [Over ons](https://www.boesenboes.be/nl/over-ons/): Julie Boes, BIV 505653, residentieel vastgoed en discrete verkoop. Benoît is volgens deze bron uit het bedrijf gestapt; geen verouderde eigenaarsrol overgenomen.
- [Verkoop](https://www.boesenboes.be/nl/diensten/verkoop/): plaatsbezoek, tweede afspraak met analyse en verkoopstrategie, daarna keuze voor een mandaat. Geen verkoopprijs- of resultaatgaranties overgenomen.
- [Officieel logo](https://cdn.omnicasaassets.com/public/omnicasaresources/cms/boes%26_boes/f6d32995-5ca2-49eb-93d2-ea73dad7b620/logo_(10)-1.png?format=webp&width=640&height=auto), gekoppeld op de kantoorwebsite, lokaal ongewijzigd als `boes-en-boes.webp`.

### Animo Vastgoed

- [Contact](https://www.animovastgoed.be/contact/): Guido Gezellelaan 44, telefoon, info@animovastgoed.be en BIV 507001. Geen persoonlijk BIV-houderschap verondersteld op basis van alleen de footer.
- [Over ons](https://www.animovastgoed.be/over-ons/): oprichtster Manuela Paternini, vroegere ervaring binnen Century 21, huidige eigen merknaam, persoonlijke begeleiding en marketing.
- [Schatting](https://www.animovastgoed.be/gratis-schatting/): gratis aanvraag met telefoonnummer en terugbelmoment, geen onmiddellijke online waarde-uitkomst. Rechtstreeks opgehaald na een timeout bij de webzoektool; geen formulier ingevuld.
- [Homepage](https://www.animovastgoed.be/): huidige naam, verkoop, verhuur, woningen, appartementen en bouwgronden; aanbod in Heusden-Zolder en Beringen. De historische kandidatennaam blijft alleen in de wachtrij en als herkenningscontext bewaard.
- [Officieel logo](https://www.animovastgoed.be/wp-content/uploads/2024/10/19D2F0BC7B28924A-1024x553.png), lokaal ongewijzigd als `animo-vastgoed.png`.

### Consimmo Vastgoed

- [Contact](https://consimmo.be/nl/contact): telefoon 089 69 30 01 en info@consimmo.be. De schrijfvariant Emiel Van Dorenlaan op Google en de werkwijzepagina is gebruikt; de contactpagina schrijft Emile.
- [Over ons](https://consimmo.be/nl/over-ons): Melih Isleyen, zaakvoerder en BIV 511231; Genk en omgeving.
- [Werkwijze](https://consimmo.be/nl/onze-werkwijze): voorbereiding, homestyling, fotografie, virtuele tour, dossier en praktische nazorg rond nutsvoorzieningen. Geen garantie over juridische volledigheid of verkoopresultaat overgenomen.
- [Homepage](https://consimmo.be/nl): verkoop, verhuur en online schatting.
- [Officieel logo](https://consimmo.be/cms-assets/theme/logoUrl?hash=c2372d1bdd5dfe79a41d4f2c16f130e9cab36eb26054ada480e29e77c70e45afb43ee021ed0161c0ad9b4e1b9800587dac40c29d1d5653c472cc19572c531616), lokaal ongewijzigd als `consimmo-vastgoed.png`. Het witte transparante origineel krijgt via een uitsluitend op dit bestand gerichte CSS-regel een donkere achtergrond voor contrast op profiel en overzichten.

## Publicatie en QA

- Alleen deze batch publiceren. Bestaande lokale wijzigingen voor SBC Vastgoed en woning 166345 blijven onaangeroerd en buiten de commit.
- Bron- en vestigingstests, gerichte ESLint, diffcontrole en productiebuild uitvoeren.
- Nieuwe profielen lokaal en live toetsen met `scripts/qa-kantoor-profielen.mjs`; alle 51 bronverrijkte profielen met `scripts/qa-kantoor-inzichten.mjs`.
- Alle drie de logo's en profielkoppen visueel controleren, waaronder het contrast bij Consimmo. Geen formulieren indienen.
- Wachtrij pas na geslaagde livecontrole bijwerken met de exacte drie kandidaat-URL's, e-mailadressen en profiel-URL's.

### Lokale resultaten

- 13/13 inhoudelijke tests geslaagd; gerichte ESLint en diffcontrole zonder fouten.
- Productiebuild geslaagd, inclusief TypeScript en controle van 166 kennispagina's.
- 3/3 nieuwe profielen geslaagd: logo, adres, reviews, bronnen, schema, formulier, overzicht en sitemap.
- 51/51 bronverrijkte profielen geslaagd in de regressiecontrole.
- Alle drie de profielkoppen in de browser gecontroleerd. Logo's en Google-scores zijn zichtbaar en leesbaar. Het originele witte Consimmo-logo heeft voldoende contrast op de donkere achtergrond. Geen formulieren ingediend.
