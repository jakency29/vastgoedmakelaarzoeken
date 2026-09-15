import assert from "node:assert/strict";

const base = (process.argv[2] || "http://127.0.0.1:3002").replace(/\/$/, "");
assert.ok(["http:", "https:"].includes(new URL(base).protocol));
const placeId = "ChIJV4WOkyzZwEcRFmVp2fxiCaM";
const html = await read("/kantoor/sensimmo-genk");
const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
assert.ok(main, "Zichtbaar profiel ontbreekt");
assert.equal([...main.matchAll(/<h1\b/g)].length, 1);
assert.match(main, /Sensimmo Genk/);
assert.match(main, /hoofdkantoor/);
assert.match(main, /Berglaan 40, 3600 Genk/);
assert.match(main, /src="\/afbeeldingen\/kantoren\/sensimmo.svg"/);
assert.match(main, /alt="Sensimmo Genk logo"/);
assert.match(main, /id="reviews"/);
assert.match(main, new RegExp(`placeid=${placeId}`));
assert.doesNotMatch(main, /placeid=ChIJwZpJUvfEwEcR9VX1gGAmLZk/);
const reviews = main.match(/<section[^>]*aria-labelledby="reviews"[^>]*>([\s\S]*?)<\/section>/)?.[1];
assert.ok(reviews);
assert.ok([...reviews.matchAll(/<figure\b/g)].length > 0, "Geen reviewkaarten");
assert.ok([...reviews.matchAll(/<figure\b/g)].length <= 4);
assert.match(main, /href="https:\/\/www.sensimmo.be\/contact"/);
assert.match(main, /[dD]ate[Tt]ime="2026-09-15"/);
assert.equal([...main.matchAll(/<form\b/g)].length, 1);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const agent = schemas.find(s => s["@type"] === "RealEstateAgent");
assert.equal(agent.name, "Sensimmo Genk");
assert.equal(agent.address.addressLocality, "Genk");
assert.ok(agent.aggregateRating.reviewCount > 0);
assert.ok(agent.aggregateRating.ratingValue > 0 && agent.aggregateRating.ratingValue <= 5);
assert.equal(agent.review.length, [...reviews.matchAll(/<figure\b/g)].length);
const logo = await read("/afbeeldingen/kantoren/sensimmo.svg", "image/svg+xml");
assert.match(logo, /<path\b/);
assert.match(logo, /fill='#fff'/);
assert.match(logo, /fill='#856e50'/);
assert.doesNotMatch(logo, /<script|<foreignObject|onload=/i);
const overview = await read("/kantoor");
assert.ok(overview.includes("/kantoor/sensimmo-genk"));
const sitemap = await read("/sitemap.xml");
assert.ok(sitemap.includes("/kantoor/sensimmo-genk"));
console.log(`Sensimmo Genk OK: profiel, logo, ${agent.aggregateRating.ratingValue}/5 (${agent.aggregateRating.reviewCount} reviews), ${agent.review.length} reviewkaarten, adres, bronnen, formulier, overzicht en sitemap (${base}).`);

async function read(path, contentType) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(60000) });
  assert.equal(response.status, 200, path);
  if (contentType) assert.ok(response.headers.get("content-type")?.includes(contentType), path);
  return response.text();
}
