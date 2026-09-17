import assert from "node:assert/strict";
import { getKantoor } from "../src/lib/kantoren.ts";
import { getKantoorInzichten } from "../src/lib/kantoor-inzichten.ts";

const [baseArg = "http://127.0.0.1:3002", ...slugs] = process.argv.slice(2);
const base = baseArg.replace(/\/$/, "");
assert.ok(["http:", "https:"].includes(new URL(base).protocol));
assert.ok(slugs.length, "Geef minstens één kantoorslug op na de basis-URL.");
const [overzicht, sitemap] = await Promise.all([read("/kantoor"), read("/sitemap.xml")]);

for (const slug of slugs) {
  const kantoor = getKantoor(slug);
  assert.ok(kantoor, slug);
  assert.ok(kantoor.foto && kantoor.googlePlaceId, `Logo of reviewkoppeling ontbreekt: ${slug}`);
  const html = await read(`/kantoor/${slug}`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, slug);
  assert.equal([...main.matchAll(/<h1\b/g)].length, 1, slug);
  assert.ok(main.includes(kantoor.naam), slug);
  assert.ok(main.includes(kantoor.adres), slug);
  assert.ok(main.includes(`src="${kantoor.foto}"`), slug);
  assert.ok(main.includes(`alt="${kantoor.naam} logo"`), slug);
  const reviews = main.match(/<section[^>]*aria-labelledby="reviews"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(reviews, `Geen reviews: ${slug}`);
  assert.ok(reviews.includes(`placeid=${kantoor.googlePlaceId}`), slug);
  const cards = [...reviews.matchAll(/<figure\b/g)].length;
  assert.ok(cards > 0 && cards <= 4, slug);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const agent = schemas.find(s => s["@type"] === "RealEstateAgent");
  assert.equal(agent?.name, kantoor.naam, slug);
  assert.equal(agent.address.addressLocality, kantoor.gemeente, slug);
  assert.ok(agent.aggregateRating.reviewCount > 0, slug);
  assert.ok(agent.aggregateRating.ratingValue > 0 && agent.aggregateRating.ratingValue <= 5, slug);
  assert.equal(agent.review.length, cards, slug);
  assert.equal([...main.matchAll(/<form\b/g)].length, 1, slug);
  for (const bron of getKantoorInzichten(slug)?.bronnen ?? []) {
    assert.ok(main.includes(bron.url), slug);
    assert.ok(main.includes(`dateTime="${bron.geraadpleegdOp}"`) || main.includes(`datetime="${bron.geraadpleegdOp}"`), slug);
  }
  const logo = await fetch(`${base}${kantoor.foto}`, { signal: AbortSignal.timeout(60000) });
  assert.equal(logo.status, 200, kantoor.foto);
  assert.ok(logo.headers.get("content-type")?.startsWith("image/"), kantoor.foto);
  assert.ok((await logo.arrayBuffer()).byteLength > 100, kantoor.foto);
  assert.ok(overzicht.includes(`/kantoor/${slug}`), slug);
  assert.ok(sitemap.includes(`/kantoor/${slug}`), slug);
  console.log(`OK ${kantoor.naam}: logo, ${agent.aggregateRating.ratingValue}/5 (${agent.aggregateRating.reviewCount} reviews), ${cards} reviewkaarten, adres, bronnen, schema, formulier, overzicht en sitemap.`);
}
console.log(`${slugs.length}/${slugs.length} kantoorprofielen geslaagd (${base}).`);

async function read(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(60000) });
  assert.equal(response.status, 200, path);
  return response.text();
}
