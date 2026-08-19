import { writeFile } from "node:fs/promises";

const baseUrl = (process.env.QA_BASE_URL || "https://www.vastgoedmakelaarzoeken.be").replace(/\/$/, "");
const outputPath = process.argv[2];

const pages = [
  { group: "money", path: "/" },
  { group: "money", path: "/kantoor" },
  { group: "money", path: "/kosten-vastgoedmakelaar" },
  { group: "money", path: "/kosten-verkoop-huis" },
  { group: "money", path: "/huis-laten-schatten" },
  { group: "money", path: "/woning-verkopen" },
  { group: "hub", path: "/huis-verkopen-verplichtingen" },
  { group: "opportunity", path: "/akte-verlijden" },
  { group: "opportunity", path: "/prijs-bouwgrond-berekenen" },
  { group: "opportunity", path: "/bod-intrekken-huis" },
  { group: "opportunity", path: "/huis-gekocht-wat-nu" },
  { group: "office", path: "/kantoor/we-invest-demervallei" },
  { group: "office", path: "/kantoor/hillewaere-vastgoed" },
  { group: "office", path: "/kantoor/heylen-vastgoed" },
  { group: "province", path: "/vastgoedkantoren/limburg" },
  { group: "province", path: "/vastgoedkantoren/antwerpen" },
  { group: "trust", path: "/privacy" },
  { group: "trust", path: "/voorwaarden" },
  { group: "error", path: "/qa-bestaat-niet-20260819", expectedStatus: 404 },
];

const redirectCases = [
  { label: "slash", url: `${baseUrl}/kantoor/` },
  { label: "http-www", url: "http://www.vastgoedmakelaarzoeken.be/kantoor" },
  { label: "https-apex", url: "https://vastgoedmakelaarzoeken.be/kantoor" },
  { label: "http-apex-slash", url: "http://vastgoedmakelaarzoeken.be/kantoor/" },
  { label: "legacy-asbest", url: `${baseUrl}/asbestattest/bij-verkoop` },
];

const text = (html, tag) => {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : null;
};

const countMatches = (html, pattern) => [...html.matchAll(pattern)].length;

async function inspectPage(page) {
  const url = page.path === "/" ? `${baseUrl}/` : `${baseUrl}${page.path}`;
  const response = await fetch(url, { redirect: "manual", headers: { "user-agent": "VMZ-Production-QA/1.0" } });
  const html = await response.text();
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
    || null;
  const expectedCanonical = page.path === "/" ? baseUrl : `${baseUrl}${page.path}`;
  const internalLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") || href.startsWith(baseUrl));

  return {
    ...page,
    url,
    status: response.status,
    expectedStatus: page.expectedStatus || 200,
    title: text(html, "title"),
    h1: text(html, "h1"),
    h1Count: countMatches(html, /<h1\b[^>]*>/gi),
    canonical,
    canonicalMatches: page.expectedStatus === 404 ? canonical == null : canonical === expectedCanonical,
    formCount: countMatches(html, /<form\b[^>]*>/gi),
    internalLinkCount: internalLinks.length,
    hasPrivacyLink: internalLinks.some((href) => href === "/privacy" || href === `${baseUrl}/privacy`),
    passed: response.status === (page.expectedStatus || 200)
      && (page.expectedStatus === 404 || (canonical === expectedCanonical && countMatches(html, /<h1\b[^>]*>/gi) === 1)),
  };
}

async function inspectRedirect(testCase) {
  const hops = [];
  let current = testCase.url;

  for (let index = 0; index < 10; index += 1) {
    const response = await fetch(current, { redirect: "manual", headers: { "user-agent": "VMZ-Production-QA/1.0" } });
    const location = response.headers.get("location");
    hops.push({ url: current, status: response.status, location });
    if (!location || response.status < 300 || response.status >= 400) break;
    current = new URL(location, current).toString();
  }

  return {
    ...testCase,
    hops,
    redirectCount: hops.filter((hop) => hop.status >= 300 && hop.status < 400).length,
    finalUrl: hops.at(-1)?.url,
    finalStatus: hops.at(-1)?.status,
  };
}

const pageResults = await Promise.all(pages.map(inspectPage));
const redirectResults = [];
for (const testCase of redirectCases) redirectResults.push(await inspectRedirect(testCase));

const result = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  summary: {
    pagesChecked: pageResults.length,
    pagesPassed: pageResults.filter((page) => page.passed).length,
    pagesFailed: pageResults.filter((page) => !page.passed).length,
  },
  pages: pageResults,
  redirects: redirectResults,
};

const serialized = `${JSON.stringify(result, null, 2)}\n`;
if (outputPath) await writeFile(outputPath, serialized, "utf8");
process.stdout.write(serialized);
