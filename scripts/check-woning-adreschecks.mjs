import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { woningAdreschecks, getWoningAdrescheck, waterScoreUitleg, adrescheckDatum, ADRESCHECK_BRONNEN } from "../src/lib/woning-adreschecks.ts";

const woningen = JSON.parse(readFileSync(new URL("../src/data/woningen.json", import.meta.url), "utf8"));

test("Precies drie bestaande, verschillende adressen krijgen de proef", () => {
  assert.deepEqual(Object.keys(woningAdreschecks).sort(), ["168856", "170252", "170319"]);
  assert.equal(woningen.filter(w => getWoningAdrescheck(w)).length, 3);
  for (const [id, check] of Object.entries(woningAdreschecks)) {
    const woning = woningen.find(w => w.id === id);
    assert.ok(woning);
    assert.equal(getWoningAdrescheck(woning), check);
    assert.equal(check.bron, woning.bron);
    assert.equal(new URL(check.bron).hostname, "weinvest.be");
    assert.equal(check.nagekekenOp, "2026-09-15");
    assert.equal(adrescheckDatum(check.nagekekenOp), "15 september 2026");
    assert.ok(check.internet.zoekinstructie.includes(check.postcode));
    assert.equal(check.internet.status, "niet-bevestigd");
    assert.equal(check.vragen.length, 2);
    assert.ok(check.vragen.every(v => v.vraag.endsWith("?") && v.aanleiding.length > 40));
    assert.doesNotMatch(JSON.stringify(check), /[\u2013\u2014]/);
  }
});

test("Gewijzigde adressen en onbekende ids krijgen geen onjuist onderzoek", () => {
  const woning = woningen.find(w => w.id === "170319");
  assert.equal(getWoningAdrescheck({ ...woning, id: "onbekend" }), undefined);
  assert.equal(getWoningAdrescheck({ ...woning, adres: "Ulfortstraat 75" }), undefined);
  assert.equal(getWoningAdrescheck({ ...woning, postcode: "9999" }), undefined);
  assert.equal(getWoningAdrescheck({ ...woning, gemeente: "Andere gemeente" }), undefined);
});

test("Scores blijven apart en onbekend betekent niet score A", () => {
  assert.deepEqual([woningAdreschecks["170319"].pScore, woningAdreschecks["170319"].gScore], ["B", "A"]);
  assert.deepEqual([woningAdreschecks["170252"].pScore, woningAdreschecks["170252"].gScore], ["D", "D"]);
  assert.deepEqual([woningAdreschecks["168856"].pScore, woningAdreschecks["168856"].gScore], ["A", "A"]);
  assert.match(waterScoreUitleg(null), /Niet bevestigd/);
  assert.match(waterScoreUitleg("A"), /gemodelleerd/);
  assert.match(waterScoreUitleg("B"), /toekomstige klimaatverandering/);
  assert.match(waterScoreUitleg("C"), /Kleine.*huidige klimaat/);
  assert.match(waterScoreUitleg("D"), /Middelgrote.*huidige klimaat/);
});

test("Appartement vraagt expliciet om bevestiging van de juiste bus", () => {
  const check = woningAdreschecks["168856"];
  assert.match(check.internet.zoekinstructie, /bus 1 afzonderlijk bevestigen/);
  assert.match(check.internet.vraag, /eigen aansluiting/);
  assert.match(JSON.stringify(check.vragen), /EPC|doorgang/);
});

test("Jeugdstraat gebruikt het nieuwe EPC consequent", () => {
  const woning = woningen.find(w => w.id === "170252");
  assert.equal(woning.epcLabel, "B");
  assert.equal(woning.epcVerbruik, 194);
  assert.equal(woning.epcCode, "20260909-0003940575-RES-2");
  assert.match(woning.beschrijving, /label B/);
  assert.doesNotMatch(JSON.stringify(woning), /EPC C|label C|246 kWh/);
});

test("Bronnen gebruiken HTTPS; de officiële symbolen zijn lokale PNG-bestanden", () => {
  for (const url of Object.values(ADRESCHECK_BRONNEN)) assert.equal(new URL(url).protocol, "https:");
  const png = readFileSync(new URL("../public/afbeeldingen/adrescheck/gebouwscore-d.png", import.meta.url));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
});

test("Het blok verzint geen netwerkresultaten en laat bronbeperkingen zien", () => {
  const source = readFileSync(new URL("../src/components/WoningAdresCheck.tsx", import.meta.url), "utf8");
  assert.match(source, /Nog niet bevestigd/);
  assert.match(source, /niet afzonderlijk geverifieerd/);
  assert.match(source, /Je kiest het adres zelf/);
  assert.doesNotMatch(source, /\bfetch\s*\(|iframe|gtag|dataLayer|\d+\s*Mbps/);
  const copy = readFileSync(new URL("../src/components/AdresKopieerKnop.tsx", import.meta.url), "utf8");
  assert.match(copy, /role="status"/);
  assert.match(copy, /catch/);
  assert.doesNotMatch(copy, /localStorage|sessionStorage|fetch\(/);
});
