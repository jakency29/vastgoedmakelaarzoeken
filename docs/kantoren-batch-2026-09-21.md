# Drie volgende kantoren, 21 september 2026

## Scope en selectie

De eerstvolgende drie kandidaten uit `node scripts/kantoor-queue.mjs next --limit 3`: Theunis Vastgoed Bvba, Van Dommelen Vastgoed en Vastgoed Nele Coenjaerts. Theunis wordt onder de actuele publieksnaam Theunis Vastgoed toegevoegd. Geen e-mails versturen.

Topical role: lokale kantoorprofielen, bestaande RealEstateAgent-template. Zoekintentie: de specifieke vestiging herkennen, dienstverlening en publieke reviews bekijken en contact aanvragen. Centrale entiteiten: de drie kantoren. Gerelateerde entiteiten: Heusden-Zolder, Bree, Hamont-Achel, de genoemde vastgoedmakelaars, BIV-vermeldingen en vestigingsgebonden Google-profielen. De extra waarde is een gecontroleerde koppeling met twee brongebaseerde gesprekspunten per kantoor. Er wordt geen gemeten SEO-winst of onafhankelijke kwaliteitsbeoordeling geclaimd.

## Gecontroleerde gegevens

| Profiel | Adres | E-mail | Google Place ID | Score bij controle |
| --- | --- | --- | --- | --- |
| `theunis-vastgoed` | Koerselsebaan 21 bus 1, 3550 Heusden-Zolder | info@theunisvastgoed.be | ChIJQdxxzSUlwUcRzpj3N1tyCno | 4,9/5, 39 reviews |
| `van-dommelen-vastgoed` | Gerdingerpoort 22B, 3960 Bree | info@vandommelenvastgoed.be | ChIJP5nnzbbTwEcRj4xkQc31mtg | 4,8/5, 34 reviews |
| `vastgoed-nele-coenjaerts` | Eind 37, 3930 Hamont-Achel | info@vastgoedcoenjaerts.be | ChIJZUYEXzHVxkcRY-43ZVMKNC8 | 5,0/5, 20 reviews |

De drie Google Places-profielen zijn operationeel en komen overeen met de officiële naam, vestiging, website en telefoon. Places leverde per kantoor vijf beoordelingen met tekst. De bestaande component toont maximaal vier kaarten en een link naar alle reviews. Geen scorefilter toegevoegd; scores, aantallen en teksten blijven via de bestaande koppeling lopen.

## Primaire bronnen, geraadpleegd op 21 september 2026

### Theunis Vastgoed

- [Contact](https://www.theunisvastgoed.be/contact/): Koerselsebaan 21/1, telefoon, e-mail, Inge Theunis met BIV 504388 en Nicolas Hermans met BIV 515560. De adresnotatie wordt genormaliseerd naar 21 bus 1, ook gebruikt op de privacy-pagina en door Google.
- [Homepage](https://www.theunisvastgoed.be/): verkoop, verhuur, woningen, appartementen, bouwgronden en nieuwbouwrubriek.
- [Gratis schatting](https://www.theunisvastgoed.be/gratis-schatting/): kennismaking, meerdere waarderingsmethodes, schattingsverslag en vervolgafspraak.
- [Verkoopaanpak](https://www.theunisvastgoed.be/verkopen/): dossieropmaak, attesten, vaste fotograaf, bezoeken, updates, samenwerking met notaris en nutsvoorzieningen. Verkoopgaranties uit marketingcopy worden niet overgenomen.
- [Officieel logo](https://www.theunisvastgoed.be/wp-content/uploads/2024/03/TheunisVastgoed_logo.png), ongewijzigd lokaal als `theunis-vastgoed.png`.

### Van Dommelen Vastgoed

- [Contact](https://vandommelenvastgoed.be/contact/): adres, telefoon, algemene e-mail, BIV 511033 en uitsluitend ontvangst op afspraak. De footer noemt daarnaast `karel@vandommelenvastgoed.be`; voor de handmatige introductiemail wordt het algemene adres gebruikt.
- [Over ons](https://vandommelenvastgoed.be/over-ons/): Karel Van Dommelen met BIV 511033, verkoop, vastgoedadvies, eigen projectontwikkeling en projecten in Bree, Houthalen-Helchteren en Oudsbergen. De pagina is rechtstreeks uit de officiële HTML gelezen; de zoekmachineweergave gaf een wachtpagina.
- [Homepage](https://vandommelenvastgoed.be/): gratis schatting en afzonderlijk verkoop- en verhuuraanbod.
- [Officiële logoversie voor lichte achtergrond](https://vandommelenvastgoed.be/wp-content/uploads/Van-Dommelen-vastgoed-logo-print.jpg), gevonden via de publieke WordPress-media-API en ongewijzigd opgeslagen als `van-dommelen-vastgoed.jpg`. Het transparante headerlogo heeft lichte letters en is daarom niet de gepubliceerde versie.

### Vastgoed Nele Coenjaerts

- [Contact](https://www.vastgoedcoenjaerts.be/contact): Eind 37, telefoon, afspraak, gratis schatting en BIV 512197. De openbare e-maillink encodeert `info@vastgoedcoenjaerts.be` in base64; dit is gedecodeerd en gecontroleerd, niet geraden.
- [Aanpak](https://www.vastgoedcoenjaerts.be/aanpak): acht stappen van gesprek en waardebepaling tot de notaris.
- [Homepage](https://www.vastgoedcoenjaerts.be/): focus Hamont-Achel en omgeving, verhuurrubriek, zoekprofiel met concrete woonwensen.
- [Verkoopaanbod](https://www.vastgoedcoenjaerts.be/te-koop): voorbeelden in Hamont-Achel, Pelt en Hechtel-Eksel. Geen aantallen, vraagprijzen of beschikbaarheid overgenomen.
- [Officieel logo](https://www.vastgoedcoenjaerts.be/res/logo.png), ongewijzigd lokaal als `vastgoed-nele-coenjaerts.png`.

## Publicatie en QA

- Bestaande lokale wijzigingen voor SBC Vastgoed en woning 166345 blijven buiten de publicatie.
- Unitchecks: `node --test scripts/check-kantoor-inzichten.mjs`, inclusief exacte contactgegevens, unieke Place IDs, lokale logo's en controledatums.
- Gerichte lint en productiebuild.
- Nieuwe profielen lokaal en live: `node scripts/qa-kantoor-profielen.mjs <basis-url> theunis-vastgoed van-dommelen-vastgoed vastgoed-nele-coenjaerts`.
- Regressie voor 45 bronverrijkte profielen: `node scripts/qa-kantoor-inzichten.mjs <basis-url>`.
- Logo's en profielkoppen visueel controleren. Geen formulieren indienen. Pas na succesvolle livecontrole de drie exacte kandidaten als toegevoegd markeren, met URL en e-mail.

Lokale resultaten: 11/11 unittests geslaagd, gerichte lint zonder fouten, productiebuild geslaagd, 3/3 nieuwe profielen geslaagd en 45/45 regressieprofielen geslaagd. Alle drie de profielkoppen, logo's en Google-scores zijn visueel gecontroleerd. Geen formulieren ingediend.
