# Kantoren verwijderd op 16 oktober 2026: ERA zonder toestemming

## Besluit

Op vraag van de operator (16 oktober 2026): ERA-kantoren waarvoor nooit toestemming via LinkedIn werd
gegeven, gaan van de site, en hun profiel-URL leidt met een 301 naar het kantorenoverzicht `/kantoor`.

## Wat er weg is

| Kantoor | Gemeente | Oud adres | Toegevoegd |
| --- | --- | --- | --- |
| ERA Connect | Hoeselt | `/kantoor/era-connect` | 2 september 2026, commit 711da96 |
| ERA IMPACT Maaseik | Maaseik | `/kantoor/era-impact-maaseik` | 2 september 2026, commit 711da96 |
| ERA NOBIS Sint-Truiden | Sint-Truiden | `/kantoor/era-nobis-sint-truiden` | 3 september 2026, commit a34f307 |

Alle drie kwamen uit de openbare kandidatenlijst (`src/data/limburg-office-candidates.json`, bron
immokantorenoverzicht.be). In de commits, de batchnotities en de LinkedIn-opvolging van de operator staat
voor geen van de drie een toestemming. Ter vergelijking: GVE Immobiliën (14 oktober) en Immo Beguin
(15 oktober) hebben een vastgelegde toestemming via LinkedIn in hun batchnotitie.

Verwijderd per kantoor: het profiel in `src/lib/kantoren.ts`, de inzichten in `src/lib/kantoor-inzichten.ts`
en het logo in `public/afbeeldingen/kantoren/`. Redirects staan in `next.config.ts`
(`movedPermanentlyRedirects`, klassieke 301). `scripts/check-kantoor-inzichten.mjs` controleert dat de drie
niet terugkomen, dat hun redirect bestaat en dat er geen kantoor met een naam die op "ERA" begint op de site
staat.

## Niet opnieuw toevoegen

De kandidatenlijst bevat nog tien andere ERA-kantoren (Nobis Alken, Hasselt, Zonhoven, Genk en
Herk-de-Stad; Tournier Pelt en Lommel; IMPACT Bree; De Piramide Heusden-Zolder en Beringen). In de lokale
wachtrijstatus (`var/office-queue-state.json`, niet in git) staan ze op `blocked`. Een ERA-kantoor komt
alleen nog op de site met een vastgelegde toestemming van dat kantoor, zoals bij GVE en Beguin.
