import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { kantoren } from "../src/lib/kantoren.ts";
import { kantoorInzichten, getKantoorInzichten, vergelijkbareKantoren, formatBronDatum } from "../src/lib/kantoor-inzichten.ts";

const kantoor = slug => {
  const value = kantoren.find(k => k.slug === slug);
  assert.ok(value, `Onbekend kantoor: ${slug}`);
  return value;
};

test("Elk inzicht heeft een bestaand kantoor, een publieke bron en een vaste raadpleegdatum", () => {
  assert.equal(Object.keys(kantoorInzichten).length, 48);
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

test("Sensimmo Genk heeft eigen vestigingsgegevens, reviewkoppeling en actuele bronnen", () => {
  const genk = kantoor("sensimmo-genk");
  const maasmechelen = kantoor("sensimmo-maasmechelen");
  assert.equal(kantoren.filter(k => k.slug === genk.slug).length, 1);
  assert.equal(genk.adres, "Berglaan 40");
  assert.equal(genk.postcode, "3600");
  assert.equal(genk.gemeente, "Genk");
  assert.equal(genk.email, "info@sensimmo.be");
  assert.equal(genk.googlePlaceId, "ChIJV4WOkyzZwEcRFmVp2fxiCaM");
  assert.notEqual(genk.googlePlaceId, maasmechelen.googlePlaceId);
  assert.equal(genk.verborgenReviewRatings, undefined);
  assert.equal(genk.foto, "/afbeeldingen/kantoren/sensimmo.svg");
  assert.equal(genk.bivHouder, "Mustafa Sak");
  assert.equal(genk.bivGecontroleerdOp, "2026-09-15");
  assert.match(genk.intro, /hoofdkantoor/);
  assert.ok(getKantoorInzichten(genk.slug).bronnen.every(b => b.geraadpleegdOp === "2026-09-15"));
});

test("De batch van 17 september bevat drie afzonderlijke vestigingen met logo en eigen reviews", () => {
  const batch = [
    ["immo-hertogen", "Zangstraat 37", "3830", "immo.hertogen@telenet.be", "ChIJD08oIvoewUcRGK_AfP_dxmE"],
    ["immosign-plus-bocholt", "Dorpsstraat 15", "3950", "info@immosign-plus.be", "ChIJOxdZJ-LVwEcR4GixpaobbNM"],
    ["swevers-real-estate-borgloon", "Papenstraat 5", "3840", "immo@swevers.be", "ChIJoeJJlDAdwUcRYJCQZl62phQ"],
  ];
  for (const [slug, adres, postcode, email, placeId] of batch) {
    const k = kantoor(slug);
    assert.equal(kantoren.filter(o => o.slug === slug).length, 1);
    assert.equal(kantoren.filter(o => o.googlePlaceId === placeId).length, 1);
    assert.equal(k.adres, adres);
    assert.equal(k.postcode, postcode);
    assert.equal(k.email, email);
    assert.equal(k.googlePlaceId, placeId);
    assert.equal(k.verborgenReviewRatings, undefined);
    assert.equal(k.toegevoegdOp, "2026-09-17");
    assert.ok(k.intro.includes(adres));
    assert.ok(existsSync(new URL(`../public${k.foto}`, import.meta.url)));
    assert.ok(getKantoorInzichten(slug).bronnen.every(b => b.geraadpleegdOp === "2026-09-17"));
  }
  assert.notEqual(kantoor("immosign-plus-bocholt").googlePlaceId, kantoor("immosign-plus-bree").googlePlaceId);
  assert.notEqual(kantoor("swevers-real-estate-borgloon").googlePlaceId, kantoor("swevers-real-estate").googlePlaceId);
});

test("De batch van 18 september heeft eigen logo's, reviews en actuele brongegevens", () => {
  const batch = [
    ["n3-vastgoed", "Luikersteenweg 395", "3800", "info@n3vastgoed.be", "ChIJC9n-l1EawUcR5-rQIPCLkKQ"],
    ["pelter-makelaardij", "Dorpsstraat 2", "3900", "info@peltermakelaardij.be", "ChIJcUiQkjErwUcRYG-9MmoO4Co"],
    ["t-huys-vastgoed", "Haag 122", "3930", "info@thuysvastgoed.be", "ChIJT3-IUhXVxkcRaYUxdr0F_So"],
  ];
  for (const [slug, adres, postcode, email, placeId] of batch) {
    const k = kantoor(slug);
    assert.equal(kantoren.filter(o => o.slug === slug).length, 1);
    assert.equal(kantoren.filter(o => o.googlePlaceId === placeId).length, 1);
    assert.equal(k.adres, adres);
    assert.equal(k.postcode, postcode);
    assert.equal(k.email, email);
    assert.equal(k.googlePlaceId, placeId);
    assert.equal(k.verborgenReviewRatings, undefined);
    assert.equal(k.toegevoegdOp, "2026-09-18");
    assert.equal(k.bivGecontroleerdOp, "2026-09-18");
    assert.ok(k.intro.includes(adres));
    assert.ok(existsSync(new URL(`../public${k.foto}`, import.meta.url)));
    assert.ok(getKantoorInzichten(slug).bronnen.every(b => b.geraadpleegdOp === "2026-09-18"));
    assert.equal(k.makelaar, undefined, "Het logo mag niet als portret worden benoemd");
  }
  assert.match(kantoor("pelter-makelaardij").intro, /Bevestig het bezoekadres vooraf/);
  assert.ok(!getKantoorInzichten("n3-vastgoed").onderwerpen.includes("verhuur"));
  assert.equal(kantoor("t-huys-vastgoed").naam, "'t Huys Vastgoed");
});

test("De batch van 21 september heeft drie unieke profielen met logo, reviews en primaire bronnen", () => {
  const batch = [
    ["theunis-vastgoed", "Koerselsebaan 21 bus 1", "3550", "info@theunisvastgoed.be", "ChIJQdxxzSUlwUcRzpj3N1tyCno", "504388"],
    ["van-dommelen-vastgoed", "Gerdingerpoort 22B", "3960", "info@vandommelenvastgoed.be", "ChIJP5nnzbbTwEcRj4xkQc31mtg", "511033"],
    ["vastgoed-nele-coenjaerts", "Eind 37", "3930", "info@vastgoedcoenjaerts.be", "ChIJZUYEXzHVxkcRY-43ZVMKNC8", "512197"],
  ];
  for (const [slug, adres, postcode, email, placeId, biv] of batch) {
    const k = kantoor(slug);
    assert.equal(kantoren.filter(o => o.slug === slug).length, 1);
    assert.equal(kantoren.filter(o => o.googlePlaceId === placeId).length, 1);
    assert.equal(k.adres, adres);
    assert.equal(k.postcode, postcode);
    assert.equal(k.email, email);
    assert.equal(k.googlePlaceId, placeId);
    assert.equal(k.bivNummer, biv);
    assert.equal(k.verborgenReviewRatings, undefined);
    assert.equal(k.toegevoegdOp, "2026-09-21");
    assert.equal(k.bivGecontroleerdOp, "2026-09-21");
    assert.ok(k.intro.includes(adres));
    assert.ok(existsSync(new URL(`../public${k.foto}`, import.meta.url)));
    assert.ok(getKantoorInzichten(slug).bronnen.every(b => b.geraadpleegdOp === "2026-09-21"));
    assert.equal(k.makelaar, undefined, "Een kantoorlogo is geen makelaarsportret");
    assert.doesNotMatch(k.intro, /[\u2013\u2014]/);
    assert.ok((k.seoTitle ?? `${k.naam} | Vastgoedkantoor ${k.gemeente}`).length <= 65);
    if (k.seoDescription) assert.ok(k.seoDescription.length <= 155);
  }
});

test("De batch van 22 september gebruikt actuele vestigingen, officiële logo's en ongefilterde reviewkoppelingen", () => {
  const batch = [
    ["aktimmo", "Luikersteenweg 54E bus 004", "3800", "info@aktimmo.be", "ChIJmczzN0sXwUcR9NU1aX8Q4c4", "502577"],
    ["albert-diepenbeek", "Grendelbaan 78", "3590", "diepenbeek@albert.immo", "ChIJ32AVKFTfwEcRBGh6aYYMJOE", "514134"],
    ["bc-immo", "Schalmstraat 2", "3600", "info@bcimmo.be", "ChIJ4Xt9G-ffwEcRp9vozCjmBwo", "511657"],
  ];
  for (const [slug, adres, postcode, email, placeId, biv] of batch) {
    const k = kantoor(slug);
    assert.equal(kantoren.filter(o => o.slug === slug).length, 1);
    assert.equal(kantoren.filter(o => o.googlePlaceId === placeId).length, 1);
    assert.equal(k.adres, adres);
    assert.equal(k.postcode, postcode);
    assert.equal(k.email, email);
    assert.equal(k.googlePlaceId, placeId);
    assert.equal(k.bivNummer, biv);
    assert.equal(k.verborgenReviewRatings, undefined);
    assert.equal(k.toegevoegdOp, "2026-09-22");
    assert.equal(k.bivGecontroleerdOp, "2026-09-22");
    assert.ok(k.intro.includes(adres));
    assert.ok(existsSync(new URL(`../public${k.foto}`, import.meta.url)));
    assert.ok(getKantoorInzichten(slug).bronnen.every(b => b.geraadpleegdOp === "2026-09-22"));
    assert.equal(k.makelaar, undefined, "Een kantoorlogo is geen makelaarsportret");
    assert.doesNotMatch(k.intro, /[\u2013\u2014]/);
    assert.ok((k.seoTitle ?? `${k.naam} | Vastgoedkantoor ${k.gemeente}`).length <= 65);
  }
  assert.doesNotMatch(kantoor("aktimmo").intro, /Schepen Dejonghstraat/);
  assert.equal(kantoor("albert-diepenbeek").bivHouder, "Nathalie Poelmans");
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
