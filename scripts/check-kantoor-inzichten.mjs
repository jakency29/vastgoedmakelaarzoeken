import assert from "node:assert/strict";
import { test } from "node:test";
import { kantoren } from "../src/lib/kantoren.ts";
import { kantoorInzichten, getKantoorInzichten, vergelijkbareKantoren, formatBronDatum } from "../src/lib/kantoor-inzichten.ts";

const kantoor = slug => {
  const value = kantoren.find(k => k.slug === slug);
  assert.ok(value, `Onbekend kantoor: ${slug}`);
  return value;
};

test("Elk inzicht heeft een bestaand kantoor, een publieke bron en een vaste raadpleegdatum", () => {
  assert.equal(Object.keys(kantoorInzichten).length, 35);
  for (const [slug, gegevens] of Object.entries(kantoorInzichten)) {
    const k = kantoor(slug);
    assert.ok(gegevens.onderwerpen.length > 0);
    assert.equal(new Set(gegevens.onderwerpen).size, gegevens.onderwerpen.length);
    assert.equal(gegevens.inzichten.length, 2);
    assert.equal(new Set(gegevens.inzichten.map(i => i.titel)).size, gegevens.inzichten.length);
    for (const bron of gegevens.bronnen) {
      assert.equal(new URL(bron.url).protocol, "https:");
      assert.equal(new URL(bron.url).hostname.replace(/^www\./, ""), new URL(k.website).hostname.replace(/^www\./, ""), `Geen primaire kantoorbron: ${slug}`);
      assert.match(bron.geraadpleegdOp, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(bron.geraadpleegdOp).toISOString().slice(0, 10), bron.geraadpleegdOp);
      assert.ok(bron.label.length > 5);
    }
    for (const inzicht of gegevens.inzichten) {
      assert.ok(gegevens.bronnen[inzicht.bron], `Bron ontbreekt bij ${slug}`);
      assert.ok(inzicht.titel && inzicht.tekst.length > 50);
      assert.ok(inzicht.vraag.endsWith("?"));
      assert.doesNotMatch(JSON.stringify(inzicht), /[\u2013\u2014]/);
    }
  }
});

test("Onbekende en nog niet onderzochte kantoren hebben een veilige lege toestand", () => {
  assert.equal(getKantoorInzichten("bestaat-niet"), undefined);
  assert.deepEqual(vergelijkbareKantoren({ ...kantoor("hermania-genk"), slug: "nieuw-kantoor" }, kantoren), []);
  assert.deepEqual(vergelijkbareKantoren(kantoor("hermania-genk"), []), []);
  assert.deepEqual(vergelijkbareKantoren(kantoor("hermania-genk"), kantoren, 0), []);
  assert.deepEqual(vergelijkbareKantoren(kantoor("hermania-genk"), kantoren, -1), []);
});

test("Vergelijking bevat geen eigen profiel, ononderzocht kantoor of andere provincie", () => {
  for (const k of kantoren) {
    const vergelijkingen = vergelijkbareKantoren(k, kantoren);
    assert.ok(vergelijkingen.length <= 2);
    assert.equal(new Set(vergelijkingen.map(v => v.kantoor.slug)).size, vergelijkingen.length);
    for (const v of vergelijkingen) {
      assert.notEqual(v.kantoor.slug, k.slug);
      assert.equal(v.kantoor.provincie, k.provincie);
      assert.ok(v.overlap > 0);
      assert.ok(v.inzichten.bronnen[v.inzichten.inzichten[0].bron]);
    }
  }
});

test("Dezelfde gemeente gaat voor provinciale overlap", () => {
  const current = kantoor("hermania-genk");
  const matches = vergelijkbareKantoren(current, [kantoor("vastgoed-c-pelt"), kantoor("artes-vastgoed")]);
  assert.equal(matches[0].kantoor.slug, "artes-vastgoed");
  assert.equal(matches[0].lokaal, 2);
  assert.equal(matches[1].lokaal, 0);
  assert.match(matches[1].reden, /controleer het werkgebied/);
});

test("Een provincie in beide regiolijsten telt niet als lokale overeenkomst", () => {
  const matches = vergelijkbareKantoren(kantoor("hermania-genk"), [kantoor("vastgoed-c-pelt")]);
  assert.equal(matches[0].lokaal, 0);
  const lokaal = vergelijkbareKantoren(kantoor("hermania-genk"), [kantoor("sensimmo-maasmechelen")]);
  assert.equal(lokaal[0].lokaal, 1);
  assert.match(lokaal[0].reden, /Genk/);
});

test("Premium, datum en invoervolgorde veranderen de inhoudelijke selectie niet", () => {
  const k = kantoor("hermania-genk");
  const slugs = rows => rows.map(v=>v.kantoor.slug);
  const expected = slugs(vergelijkbareKantoren(k, kantoren));
  const shuffled = [...kantoren].reverse().map(o=>({ ...o, premium: !o.premium, toegevoegdOp: "2099-01-01" }));
  assert.deepEqual(slugs(vergelijkbareKantoren(k, shuffled)), expected);
});

test("Datum is Nederlands en het gepubliceerde tarief houdt zijn context", () => {
  assert.equal(formatBronDatum("2026-09-14"), "14 september 2026");
  const tarief = getKantoorInzichten("artes-vastgoed").inzichten[0].tekst;
  assert.match(tarief, /3% inclusief btw/);
  assert.match(tarief, /maatwerkvoorwaarden/);
  assert.match(tarief, /geen persoonlijke offerte/);
});
