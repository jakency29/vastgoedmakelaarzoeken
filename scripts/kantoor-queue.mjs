import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const CANDIDATES_PATH = path.join(PROJECT_ROOT, "src", "data", "limburg-office-candidates.json");
const QUEUE_STATE_PATH = path.join(PROJECT_ROOT, "var", "office-queue-state.json");
const OFFICES_PATH = path.join(PROJECT_ROOT, "src", "lib", "kantoren.ts");
const OUTREACH_PATH = path.join(PROJECT_ROOT, "var", "office-outreach.json");

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) values[key] = true;
    else {
      values[key] = next;
      index += 1;
    }
  }
  return values;
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(?:bv|bvba|nv|cv|vzw)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, filePath);
}

async function loadCandidates() {
  const source = await readJson(CANDIDATES_PATH, null);
  if (!source || !Array.isArray(source.candidates)) {
    throw new Error("De Limburgse kandidatenlijst ontbreekt of is ongeldig.");
  }
  if (source.total !== source.candidates.length) {
    throw new Error("Het opgegeven totaalaantal komt niet overeen met de kandidatenlijst.");
  }
  return source;
}

async function loadExistingNames() {
  const source = await fs.readFile(OFFICES_PATH, "utf8");
  return [...source.matchAll(/\bnaam:\s*"([^"]+)"/g)].map((match) => match[1]);
}

async function loadState() {
  return readJson(QUEUE_STATE_PATH, { version: 1, decisions: [] });
}

async function buildQueue() {
  const [source, state, existingNames, outreach] = await Promise.all([
    loadCandidates(),
    loadState(),
    loadExistingNames(),
    readJson(OUTREACH_PATH, { contacts: [] }),
  ]);
  const decided = new Set(state.decisions.map((item) => item.sourceUrl));
  const existing = new Set(existingNames.map(normalize));
  const contacted = new Set((outreach.contacts || []).map((item) => normalize(item.officeName)));
  const pending = source.candidates.filter((candidate) => {
    if (decided.has(candidate.sourceUrl)) return false;
    const name = normalize(candidate.name);
    return !existing.has(name) && !contacted.has(name);
  });
  return { source, state, existingNames, pending };
}

async function status() {
  const { source, state, existingNames, pending } = await buildQueue();
  const counts = state.decisions.reduce((result, item) => {
    result[item.status] = (result[item.status] || 0) + 1;
    return result;
  }, {});
  const existingSet = new Set(existingNames.map(normalize));
  const exactExistingMatches = source.candidates.filter((candidate) => existingSet.has(normalize(candidate.name))).length;
  return {
    source: source.source,
    collectedOn: source.collectedOn,
    total: source.total,
    pending: pending.length,
    exactExistingMatches,
    decisions: state.decisions.length,
    byStatus: counts,
  };
}

async function next(args) {
  const requested = Number(args.limit || 3);
  if (!Number.isInteger(requested) || requested < 1 || requested > 3) {
    throw new Error("Gebruik --limit met een geheel getal van 1 tot en met 3.");
  }
  const { source, pending } = await buildQueue();
  return {
    source: source.source,
    limit: requested,
    candidates: pending.slice(0, requested),
  };
}

async function mark(args) {
  const sourceUrl = String(args.source || "").trim();
  const statusValue = String(args.status || "").trim();
  const allowedStatuses = new Set(["added", "skipped", "blocked"]);
  if (!sourceUrl.startsWith("https://www.immokantorenoverzicht.be/immo-")) {
    throw new Error("Gebruik --source met de exacte ImmokantorenOverzicht-bron-URL.");
  }
  if (!allowedStatuses.has(statusValue)) {
    throw new Error("Gebruik --status met added, skipped of blocked.");
  }

  const source = await loadCandidates();
  const candidate = source.candidates.find((item) => item.sourceUrl === sourceUrl);
  if (!candidate) throw new Error("Deze bron-URL staat niet in de kandidatenlijst.");

  const state = await loadState();
  if (state.decisions.some((item) => item.sourceUrl === sourceUrl)) {
    throw new Error("Voor deze kandidaat bestaat al een wachtrijbeslissing.");
  }

  state.decisions.push({
    sourceUrl,
    candidateName: candidate.name,
    status: statusValue,
    reason: String(args.reason || "").trim(),
    officeSlug: String(args.slug || "").trim(),
    email: String(args.email || "").trim().toLowerCase(),
    profileUrl: String(args.url || "").trim(),
    decidedAt: new Date().toISOString(),
  });
  await writeJson(QUEUE_STATE_PATH, state);
  return { marked: true, candidate: candidate.name, status: statusValue };
}

const command = process.argv[2] || "status";
const args = parseArgs(process.argv.slice(3));

try {
  let result;
  if (command === "status") result = await status();
  else if (command === "next") result = await next(args);
  else if (command === "mark") result = await mark(args);
  else throw new Error(`Onbekend commando: ${command}`);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
