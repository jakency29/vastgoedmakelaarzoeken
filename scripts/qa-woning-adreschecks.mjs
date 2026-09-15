// Read-only: node scripts/qa-woning-adreschecks.mjs [http://127.0.0.1:3002]
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { woningAdreschecks, ADRESCHECK_BRONNEN } from "../src/lib/woning-adreschecks.ts";

const base = (process.argv[2] ?? "http://127.0.0.1:3002").replace(/\/$/, "");
const woningen = JSON.parse(readFileSync(new URL("../src/data/woningen.json", import.meta.url), "utf8"));
const pathVoor = w => `/${w.typeUID.includes("apartment") || w.typeUID.includes("flat") ? "appartement" : "huis"}-te-koop/${w.slug}`;

for (const [id, check] of Object.entries(woningAdreschecks)) {
  const woning = woningen.find(w => w.id === id);
  const res = await fetch(base + pathVoor(woning), { signal: AbortSignal.timeout(60000) });
  assert.equal(res.status, 200, woning.adres);
  const html = (await res.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((html.match(/data-adrescheck="pilot-2026-09"/g) ?? []).length, 1);
  assert.ok(html.includes('id="adrescheck"'));
  assert.ok(html.includes('dateTime="2026-09-15"') || html.includes('datetime="2026-09-15"'));
  assert.ok(html.includes("Kopieer adres"));
  assert.ok(html.includes("Nog niet bevestigd"));
  assert.ok(html.includes("niet afzonderlijk geverifieerd"));
  for (const url of [...Object.values(ADRESCHECK_BRONNEN), check.bron]) assert.ok(html.includes(`href="${url}"`), url);
  for (const item of check.vragen) assert.ok(html.includes(item.vraag), item.vraag);
  assert.ok(html.includes(`P-score ${check.pScore} / G-score ${check.gScore}`));
  assert.ok(html.includes('href="tel:'));
  assert.ok(html.includes('href="mailto:'));
  assert.equal((html.match(/<form\b/g) ?? []).length, 0, "Geen nieuw of blokkerend formulier");
  if (id === "170252") {
    assert.ok(html.includes("/afbeeldingen/adrescheck/gebouwscore-d.png"));
    assert.ok(html.includes("20260909-0003940575-RES-2"));
    assert.doesNotMatch(html, /EPC C|label C|246 kWh/);
  }
  console.log(`OK ${woning.adres}: bronnen, scores, onbekend internet, vragen en contact`);
}

const control = woningen.find(w => w.id === "166187");
const controlRes = await fetch(base + pathVoor(control), { signal: AbortSignal.timeout(60000) });
assert.equal(controlRes.status, 200);
assert.ok(!(await controlRes.text()).includes('data-adrescheck="pilot-2026-09"'));
const imageRes = await fetch(base + "/afbeeldingen/adrescheck/gebouwscore-d.png");
assert.equal(imageRes.status, 200);
assert.match(imageRes.headers.get("content-type"), /image\/png/);
console.log("3/3 proefpagina's geslaagd; controlepagina zonder blok; symbool beschikbaar.");
