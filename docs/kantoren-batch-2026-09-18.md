# Drie volgende kantoren, 18 september 2026

## Scope en selectie

De volgende drie kandidaten uit `node scripts/kantoor-queue.mjs next --limit 3`: N3 VASTGOED, Pelter Makelaardij en t Huys Vastgoed. De publieke schrijfwijzen worden N3 Vastgoed, Pelter Makelaardij en 't Huys Vastgoed. Geen e-mails versturen.

Topical role: lokale kantoorprofielen, bestaande RealEstateAgent-template. Zoekintentie: kantoor herkennen, diensten en publieke ervaringen bekijken, kantoren vergelijken en contact aanvragen. Entiteiten: de drie kantoren, hun vestigingen, contactpersonen, diensten, BIV-vermeldingen en Google-bedrijfsprofielen. Extra waarde: brongebaseerde taakverdeling, bezoekvoorwaarden, diensten en twee concrete gespreksvragen per kantoor. Geen onbewezen kwaliteits- of SEO-resultaten.

## Gecontroleerde gegevens

| Profiel | Adres volgens kantoorwebsite | E-mail | Google Place ID | Google bij controle |
| --- | --- | --- | --- | --- |
| `n3-vastgoed` | Luikersteenweg 395, 3800 Sint-Truiden | info@n3vastgoed.be | ChIJC9n-l1EawUcR5-rQIPCLkKQ | 4,9/5, 40 reviews |
| `pelter-makelaardij` | Dorpsstraat 2, 3900 Pelt | info@peltermakelaardij.be | ChIJcUiQkjErwUcRYG-9MmoO4Co | 4,9/5, 19 reviews |
| `t-huys-vastgoed` | Haag 122, 3930 Hamont-Achel | info@thuysvastgoed.be | ChIJT3-IUhXVxkcRaYUxdr0F_So | 4,9/5, 18 reviews |

Google Places leverde vijf beoordelingen met tekst per kantoor. De bestaande component toont maximaal vier kaarten en een link naar alle Google-reviews. Geen scorefilter toegevoegd en geen score, aantal of reviewtekst hardcoded in profieldata. Elk profiel gebruikt zijn eigen Place ID.

### Adresverschil Pelter

De officiële contactpagina en footer vermelden Dorpsstraat 2. Het Google-bedrijfsprofiel vermeldt Dorpsstraat 23. Naam, website en gemeente komen overeen; beide openbare telefoonnummers komen ook terug op de aangeboden vastgoedadvertenties. Er is geen primaire bevestiging gevonden die het adresverschil oplost. We volgen uitdrukkelijk de eigen website, noemen die bron in de intro en vragen zichtbaar het bezoekadres vooraf te bevestigen. Google wordt niet stilzwijgend als adresbron overgenomen. Het gebruik van de reviewkoppeling impliceert niet dat het Google-adres bevestigd is.

## Primaire bronnen, geraadpleegd op 18 september 2026

### N3 Vastgoed

- [Kantoor en diensten](https://www.groepn.be/over-ons/n3-vastgoed): Bart Pellens, verkoopfocus, Midden- en Zuid-Limburg, residentieel vastgoed, bedrijfsvastgoed en projectadvies. Groepsnavigatie over verhuur wordt niet als verhuurdienst van N3 geïnterpreteerd.
- [Contact en wettelijke vermeldingen](https://www.groepn.be/contact): adres, telefoon, e-mail en BIV 503569 op naam van Bart Pellens.
- [Officieel logo](https://www.groepn.be/images/offices/office/logo/thumb/n3-vastgoed-0b6578c6-2@2x.png), ongewijzigd lokaal als `n3-vastgoed.png`.

### Pelter Makelaardij

- [Contact](https://www.peltermakelaardij.be/nl/contact): Dorpsstraat 2, afspraak, telefoon 0477 20 35 25 en e-mail.
- [Team](https://www.peltermakelaardij.be/nl/wie-is-peltermakelaardij): Diane Dausi als zaakvoerster en vastgoedmakelaar-bemiddelaar; footer BIV 503089.
- [Werkwijze](https://www.peltermakelaardij.be/nl/onze-aanpak): waardebepaling, dossieropmaak, publiciteit, bezoeken, onderhandelingen, overeenkomst en notaris.
- [Homepage](https://www.peltermakelaardij.be/): afzonderlijke aanbodcategorieën verkoop, verhuur en nieuwbouw.
- [Officieel logo uit de CSS](https://www.peltermakelaardij.be/assets/logos/Logo_v_3_small.jpg), ongewijzigd lokaal als `pelter-makelaardij.png`. De bron-URL eindigt op jpg, maar de bestandsbytes zijn PNG.

### 't Huys Vastgoed

- [Contact](https://thuysvastgoed.be/nl/contact): adres, telefoon, e-mail, BIV 510778, gratis schatting en uitsluitend ontvangst op afspraak.
- [Team en werkgebied](https://thuysvastgoed.be/nl/wie-zijn-wij): Erik Schultinks makelaarswerk, Greet Schuurmans' commerciële en administratieve rol en de genoemde Limburgse gemeenten. Privé- en gevoelige biografische details worden niet overgenomen.
- [Officieel logo](https://thuysvastgoed.be/cms-assets/theme/logoUrl?hash=1d062e0461e88785c4255fab19c111ae5851133229fc31b6d9bdd199daaf8ccfa45b4bae4e6b26c529c295ea8871010f932330970b38bb14568b5649f09646f1), ongewijzigd lokaal als `t-huys-vastgoed.jpg`.

## Publicatie en QA

- Bestaande lokale wijzigingen voor SBC Vastgoed en woning 166345 blijven buiten deze publicatie.
- Unitcheck: `node --test scripts/check-kantoor-inzichten.mjs`, inclusief de drie kantoren, unieke reviewkoppelingen, logo's, brondatums en Pelters adresvoorbehoud.
- Gerichte lint en productiebuild.
- HTTP QA lokaal en live: `node scripts/qa-kantoor-profielen.mjs <basis-url> n3-vastgoed pelter-makelaardij t-huys-vastgoed`.
- De profielcheck houdt nu rekening met HTML-escaping, nodig voor de apostrof in 't Huys Vastgoed.
- Regressie: `node scripts/qa-kantoor-inzichten.mjs <basis-url>` voor 42 bronverrijkte profielen.
- Logo's visueel controleren; na succesvolle publicatie de drie exacte kandidaten als toegevoegd markeren met profiel-URL en e-mail.

Lokale resultaten op 18 september: 10/10 unittests geslaagd, gerichte ESLint zonder fouten, productiebuild geslaagd, 3/3 nieuwe profielen geslaagd en 42/42 regressieprofielen geslaagd. Alle drie de logo's en de reviewscore in de profielkop zijn visueel gecontroleerd. Er zijn geen formulieren ingediend.
