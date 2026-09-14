import assert from "node:assert/strict";
import { kantoorInzichten, vergelijkbareKantoren } from "../src/lib/kantoor-inzichten.ts";
import { kantoren } from "../src/lib/kantoren.ts";

const base = (process.argv[2] || "http://127.0.0.1:3002").replace(/\/$/, "");
assert.ok(["http:", "https:"].includes(new URL(base).protocol));
const slugs = Object.keys(kantoorInzichten);
let passed = 0;
for (let start = 0; start < slugs.length; start += 3) {
  await Promise.all(slugs.slice(start, start + 3).map(async slug => {
    const response = await fetch(`${base}/kantoor/${slug}`, { signal: AbortSignal.timeout(60000) });
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main, `Geen main: ${slug}`);
    assert.equal([...main.matchAll(/<h1\b/g)].length, 1, slug);
    const insights = main.match(/<section[^>]*aria-labelledby="publieke-informatie"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(insights, `Geen zichtbare bronsectie: ${slug}`);
    assert.equal([...insights.matchAll(/<article\b/g)].length, 2, slug);
    assert.equal([...insights.matchAll(/Vraag voor jouw dossier/g)].length, 2, slug);
    for (const item of kantoorInzichten[slug].inzichten) {
      const source = kantoorInzichten[slug].bronnen[item.bron];
      assert.ok(insights.includes(source.url.replaceAll("&", "&amp;")), `Bronlink ontbreekt: ${slug}`);
      assert.ok(insights.includes(`dateTime="${source.geraadpleegdOp}"`) || insights.includes(`datetime="${source.geraadpleegdOp}"`), slug);
    }
    const kantoor = kantoren.find(k => k.slug === slug);
    const related = vergelijkbareKantoren(kantoor, kantoren);
    const comparison = main.match(/<section[^>]*aria-labelledby="kantoren-vergelijken"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.equal(!!comparison, related.length > 0, slug);
    if (comparison) {
      assert.equal([...comparison.matchAll(/<article\b/g)].length, related.length, slug);
      for (const item of related) assert.ok(comparison.includes(`/kantoor/${item.kantoor.slug}`), slug);
    }
    assert.equal([...main.matchAll(/<form\b/g)].length, 1, `Contactformulier: ${slug}`);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
    const agent = schemas.find(s=>s["@type"] === "RealEstateAgent");
    assert.ok(agent, `Kantoorschema ontbreekt: ${slug}`);
    if (agent.review) {
      assert.ok(agent.review.length <= 4, slug);
      assert.ok(agent.review.every(r=>!kantoor.verborgenReviewRatings?.includes(r.reviewRating.ratingValue)), slug);
    }
    passed++;
  }));
}
console.log(`${passed}/${slugs.length} kantoorprofielen geslaagd: HTTP, bronblokken, datums, vergelijking, formulier en JSON-LD (${base}).`);
