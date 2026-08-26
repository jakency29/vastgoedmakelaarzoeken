import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const NEXT_CONFIG = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
const PROXY = fs.readFileSync(path.join(ROOT, "src", "proxy.ts"), "utf8");
const SITE = fs.readFileSync(path.join(ROOT, "src", "lib", "site.ts"), "utf8");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(file);
    return entry.isFile() && entry.name.endsWith(".mdx") ? [file] : [];
  });
}

function slugFor(file) {
  return path.relative(CONTENT, file).replaceAll("\\", "/").replace(/\.mdx$/, "").replace(/\/index$/, "");
}

const redirectTargets = new Map([
  ["hypothecaire-volmacht", "hypothecair-mandaat"],
  ["renovatieplicht-bestaande-woning", "renovatieplicht-2030"],
  ["asbestattest/verplicht", "asbestattest"],
  ["asbestattest/vanaf-wanneer", "asbestattest"],
  ["asbestattest/wetgeving", "asbestattest"],
  ["asbestattest/wie", "asbestattest"],
  ...[
    "antwerpen", "brugge", "dendermonde", "gent", "hasselt", "herentals", "leuven", "lier",
    "limburg", "lokeren", "oost-vlaanderen", "oudenaarde", "sint-niklaas", "turnhout",
    "vlaams-brabant", "west-vlaanderen",
  ].map((location) => [`asbestattest/${location}`, "asbestattest"]),
]);

const files = walk(CONTENT);
const errors = [];
let activePages = 0;
let noindexPages = 0;
let sourceNotes = 0;
let testedRedirectResponses = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const slug = slugFor(file);
  if (data.noindex) noindexPages += 1;
  else activePages += 1;
  if (content.includes("<SourceNote ")) sourceNotes += 1;

  if (String(data.editorial?.author ?? "").includes(".be")) {
    errors.push(`${slug}: domeingebonden auteursnaam`);
  }
  if (/https?:\/\/(?:www\.)?vastgoedmakelaarzoeken\.be/i.test(content)) {
    errors.push(`${slug}: absoluut .be-adres in zichtbare content`);
  }

  for (const [from] of redirectTargets) {
    if (slug !== from && (content.includes(`(/${from})`) || content.includes(`href="/${from}"`))) {
      errors.push(`${slug}: interne link naar redirectbron /${from}`);
    }
  }

  const related = Array.isArray(data.related)
    ? data.related.map((item) => typeof item === "string" ? item : item?.slug).filter(Boolean)
    : [];
  if (new Set(related).size !== related.length) errors.push(`${slug}: dubbel related-doel`);
  for (const [from] of redirectTargets) {
    if (slug !== from && related.includes(from)) errors.push(`${slug}: related-link naar redirectbron /${from}`);
  }
}

for (const [from, to] of redirectTargets) {
  const file = files.find((candidate) => slugFor(candidate) === from);
  if (!file) errors.push(`redirectbron ontbreekt in contentregister: /${from}`);
  else if (!matter(fs.readFileSync(file, "utf8")).data.noindex) errors.push(`redirectbron is niet noindex: /${from}`);
  if (!NEXT_CONFIG.includes(`{ from: "/${from}", to: "/${to}" }`)) {
    errors.push(`301 ontbreekt: /${from} -> /${to}`);
  }
}

if (!SITE.includes("NEXT_PUBLIC_SITE_URL")) errors.push("NEXT_PUBLIC_SITE_URL ontbreekt in siteconfiguratie");
if (!SITE.includes("NEXT_PUBLIC_CONTACT_EMAIL")) errors.push("NEXT_PUBLIC_CONTACT_EMAIL ontbreekt in siteconfiguratie");
if (!PROXY.includes("MIGRATION_TARGET_HOST")) errors.push("MIGRATION_TARGET_HOST ontbreekt in hostredirect");
if (!PROXY.includes("status: 301")) errors.push("klassieke 301 ontbreekt in proxy");
if (!NEXT_CONFIG.includes("LEGACY_MIGRATION_HOSTS")) {
  errors.push("legacy-hostregels ontbreken voor redirects met een gewijzigd pad");
}
if (!NEXT_CONFIG.includes("legacyMigrationRedirects")) {
  errors.push("directe migratieredirects ontbreken voor padconsolidaties");
}
if (!NEXT_CONFIG.includes("`https://${migrationTargetHost}${redirect.to}`")) {
  errors.push("padconsolidaties verwijzen niet rechtstreeks naar de migratiehost");
}
if (NEXT_CONFIG.includes("data-tf-popup") || PROXY.includes("data-tf-popup")) {
  errors.push("oude Typeform-route gevonden");
}

const migrationTestOrigin = process.env.MIGRATION_TEST_ORIGIN?.trim();
const migrationTargetHost = process.env.MIGRATION_TARGET_HOST?.trim().toLowerCase();

function requestRedirect(origin, legacyHost, requestPath) {
  const target = new URL(requestPath, origin);
  return new Promise((resolve, reject) => {
    const request = http.request(
      target,
      { method: "GET", headers: { host: legacyHost } },
      (response) => {
        response.resume();
        response.on("end", () => resolve({
          status: response.statusCode,
          location: response.headers.location,
        }));
      },
    );
    request.on("error", reject);
    request.end();
  });
}

if (migrationTestOrigin) {
  if (!migrationTargetHost) {
    errors.push("MIGRATION_TARGET_HOST ontbreekt voor de HTTP-migratietest");
  } else {
    const legacyHosts = ["vastgoedmakelaarzoeken.be", "www.vastgoedmakelaarzoeken.be"];
    for (const legacyHost of legacyHosts) {
      for (const [from, to] of redirectTargets) {
        for (const suffix of ["", "/"]) {
          const query = "?migration_check=1";
          const result = await requestRedirect(migrationTestOrigin, legacyHost, `/${from}${suffix}${query}`);
          const expectedLocation = `https://${migrationTargetHost}/${to}${query}`;
          testedRedirectResponses += 1;
          if (result.status !== 301 || result.location !== expectedLocation) {
            errors.push(
              `${legacyHost}/${from}${suffix}: verwacht 301 naar ${expectedLocation}, kreeg ${result.status} naar ${result.location ?? "geen locatie"}`,
            );
          }
        }
      }
    }
  }
}

const result = {
  pages: files.length,
  activePages,
  noindexPages,
  consolidationRedirects: redirectTargets.size,
  testedRedirectResponses,
  sourceNotes,
  errors,
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
