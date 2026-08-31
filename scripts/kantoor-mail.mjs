import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import nodemailer from "nodemailer";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const STATE_PATH = path.join(PROJECT_ROOT, "var", "office-outreach.json");

dotenv.config({ path: path.join(PROJECT_ROOT, ".env.office.local"), quiet: true });
dotenv.config({ path: path.join(PROJECT_ROOT, ".env.local"), quiet: true });

const REQUIRED_ENV = [
  "OFFICE_MAIL_USER",
  "OFFICE_MAIL_PASSWORD",
  "OFFICE_MAIL_SMTP_HOST",
  "OFFICE_MAIL_IMAP_HOST",
];

function config() {
  return {
    user: process.env.OFFICE_MAIL_USER?.trim() ?? "",
    password: process.env.OFFICE_MAIL_PASSWORD ?? "",
    smtpHost: process.env.OFFICE_MAIL_SMTP_HOST?.trim() ?? "",
    smtpPort: Number(process.env.OFFICE_MAIL_SMTP_PORT || 587),
    imapHost: process.env.OFFICE_MAIL_IMAP_HOST?.trim() ?? "",
    imapPort: Number(process.env.OFFICE_MAIL_IMAP_PORT || 993),
    fromName: process.env.OFFICE_MAIL_FROM_NAME?.trim() || "Vastgoedmakelaarzoeken",
  };
}

function missingConfig() {
  return REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
}

function assertConfigured() {
  const missing = missingConfig();
  if (missing.length) {
    throw new Error(`Ontbrekende mailboxinstellingen: ${missing.join(", ")}`);
  }
}

function defaultState() {
  return {
    version: 1,
    lastInboxUid: 0,
    contacts: [],
    suppressions: [],
    replies: [],
  };
}

async function readState() {
  try {
    return { ...defaultState(), ...JSON.parse(await fs.readFile(STATE_PATH, "utf8")) };
  } catch (error) {
    if (error.code === "ENOENT") return defaultState();
    throw error;
  }
}

async function writeState(state) {
  await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
  const temporaryPath = `${STATE_PATH}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, STATE_PATH);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isGeneralBusinessEmail(value) {
  const localPart = normalizeEmail(value).split("@")[0];
  return /^(?:info|contact|immo|kantoor|office|hallo|hello|onthaal|receptie|reception|administratie|sales|team)(?:[.+_-].*)?$/.test(localPart);
}

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

function todayInBrussels() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function buildMessage(officeName, profileUrl, sourceUrl) {
  const subject = `${officeName} gratis toegevoegd aan Vastgoedmakelaarzoeken.com`;
  const text = [
    "Beste,",
    "",
    `We hebben ${officeName} gratis toegevoegd aan Vastgoedmakelaarzoeken.com:`,
    "",
    profileUrl,
    "",
    "Op de pagina staan onder meer jullie contactgegevens en diensten. Waar beschikbaar tonen we ook een logo en actuele Google-beoordelingen. De vermelding is volledig gratis en brengt geen verplichtingen met zich mee.",
    "",
    `We vonden de openbare bedrijfsvermelding via ${sourceUrl} en controleerden de gegevens op jullie officiële website. We gebruiken dit algemene bedrijfsadres eenmalig om jullie over de vermelding te informeren. Meer informatie over het doel, de bewaartermijn en jullie privacyrechten staat op https://www.vastgoedmakelaarzoeken.com/privacy.`,
    "",
    "Willen jullie gegevens laten aanpassen of aanvullen? Reageer gerust op deze e-mail met de gewenste wijzigingen.",
    "",
    "Willen jullie niet op onze website vermeld staan? Laat dit dan weten door op deze e-mail te antwoorden. We verwijderen de vermelding dan zo snel mogelijk.",
    "",
    "Met vriendelijke groet,",
    "",
    "Vastgoedmakelaarzoeken.com",
    "info@vastgoedmakelaarzoeken.com",
    "https://www.vastgoedmakelaarzoeken.com",
  ].join("\n");

  return { subject, text };
}

function createTransport(mailConfig) {
  return nodemailer.createTransport({
    host: mailConfig.smtpHost,
    port: mailConfig.smtpPort,
    secure: mailConfig.smtpPort === 465,
    requireTLS: mailConfig.smtpPort !== 465,
    auth: { user: mailConfig.user, pass: mailConfig.password },
  });
}

function createImapClient(mailConfig) {
  return new ImapFlow({
    host: mailConfig.imapHost,
    port: mailConfig.imapPort,
    secure: mailConfig.imapPort === 993,
    auth: { user: mailConfig.user, pass: mailConfig.password },
    logger: false,
  });
}

async function verifyConnections() {
  assertConfigured();
  const mailConfig = config();
  const transport = createTransport(mailConfig);
  await transport.verify();

  const imap = createImapClient(mailConfig);
  await imap.connect();
  await imap.logout();

  return { smtp: "ok", imap: "ok", user: mailConfig.user };
}

async function sendOfficeEmail(args) {
  const recipient = normalizeEmail(args.to);
  const officeName = String(args.office || "").trim();
  const officeSlug = String(args.slug || "").trim();
  const profileUrl = String(args.url || "").trim();
  const sourceUrl = String(args.source || "").trim();

  if (!isEmail(recipient)) throw new Error("Gebruik --to met een geldig e-mailadres.");
  if (!isGeneralBusinessEmail(recipient)) throw new Error("Gebruik uitsluitend een algemeen bedrijfsadres zoals info@, contact@ of immo@.");
  if (!officeName) throw new Error("Gebruik --office met de kantoornaam.");
  if (!officeSlug) throw new Error("Gebruik --slug met de kantoor-slug.");
  if (!/^https:\/\//i.test(profileUrl)) throw new Error("Gebruik --url met de live https-profiel-URL.");
  if (!sourceUrl.startsWith("https://www.immokantorenoverzicht.be/immo-")) {
    throw new Error("Gebruik --source met de exacte ImmokantorenOverzicht-bron-URL.");
  }

  const state = await readState();
  if (state.suppressions.some((item) => normalizeEmail(item.email) === recipient)) {
    throw new Error("Dit adres staat op de suppressielijst en mag niet worden gemaild.");
  }
  if (state.contacts.some((item) => normalizeEmail(item.email) === recipient || item.officeSlug === officeSlug)) {
    throw new Error("Dit kantoor of e-mailadres is al eerder benaderd.");
  }

  const today = todayInBrussels();
  const sentToday = state.contacts.filter((item) => item.sentAt?.startsWith(today)).length;
  if (sentToday >= 3) throw new Error("Daglimiet van 3 kantoorberichten is bereikt.");

  const message = buildMessage(officeName, profileUrl, sourceUrl);
  if (args["dry-run"]) {
    return { dryRun: true, to: recipient, officeName, officeSlug, profileUrl, sourceUrl, ...message };
  }

  assertConfigured();
  const mailConfig = config();
  const transport = createTransport(mailConfig);
  const result = await transport.sendMail({
    from: { name: mailConfig.fromName, address: mailConfig.user },
    replyTo: mailConfig.user,
    to: recipient,
    subject: message.subject,
    text: message.text,
    headers: { "X-VMZ-Office-Slug": officeSlug },
  });

  state.contacts.push({
    email: recipient,
    officeName,
    officeSlug,
    profileUrl,
    sourceUrl,
    sentAt: new Date().toISOString(),
    messageId: result.messageId,
  });
  await writeState(state);

  return { sent: true, to: recipient, officeName, officeSlug, profileUrl, sourceUrl, messageId: result.messageId };
}

function replyTextBeforeQuote(text) {
  return String(text || "")
    .split(/\n(?:Op .+schreef|Van:|From:|On .+wrote:|>\s)/i)[0]
    .slice(0, 2000)
    .trim();
}

function isOptOutReply(text) {
  return [
    /\bafmeld/i,
    /\buitschrijf/i,
    /\bunsubscribe\b/i,
    /\bremove\b/i,
    /\bverwijder(?:en)?\b/i,
    /\bniet\s+(?:meer\s+)?(?:op|vermeld)/i,
    /\bgeen\s+verdere\s+(?:mail|berichten)/i,
    /\bhaal\s+(?:ons|mij|de vermelding).*(?:offline|weg)/i,
    /^\s*stop\s*[.!]?\s*$/i,
  ].some((pattern) => pattern.test(text));
}

async function checkReplies() {
  assertConfigured();
  const state = await readState();
  const known = new Map(state.contacts.map((item) => [normalizeEmail(item.email), item]));
  const mailConfig = config();
  const client = createImapClient(mailConfig);
  const newReplies = [];

  await client.connect();
  const lock = await client.getMailboxLock("INBOX");
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const uids = await client.search({ since }, { uid: true });
    const pendingUids = uids.filter((uid) => uid > state.lastInboxUid).sort((a, b) => a - b);

    for (const uid of pendingUids) {
      const message = await client.fetchOne(uid, { source: true, envelope: true }, { uid: true });
      state.lastInboxUid = Math.max(state.lastInboxUid, uid);
      if (!message?.source) continue;

      const parsed = await simpleParser(message.source);
      const sender = normalizeEmail(parsed.from?.value?.[0]?.address);
      const contact = known.get(sender);
      if (!contact) continue;

      const freshText = replyTextBeforeQuote(parsed.text || parsed.html || "");
      const optOut = isOptOutReply(freshText);
      const reply = {
        uid,
        email: sender,
        officeName: contact.officeName,
        officeSlug: contact.officeSlug,
        profileUrl: contact.profileUrl,
        subject: parsed.subject || "",
        receivedAt: parsed.date?.toISOString() || new Date().toISOString(),
        optOut,
      };
      state.replies.push(reply);
      newReplies.push(reply);

      if (optOut && !state.suppressions.some((item) => normalizeEmail(item.email) === sender)) {
        state.suppressions.push({
          email: sender,
          officeName: contact.officeName,
          officeSlug: contact.officeSlug,
          reason: "Afmelding per e-mailantwoord",
          createdAt: new Date().toISOString(),
        });
      }
    }
  } finally {
    lock.release();
    await client.logout();
  }

  await writeState(state);
  return { checked: true, newReplies, suppressions: state.suppressions.length };
}

async function addSuppression(args) {
  const email = normalizeEmail(args.email);
  if (!isEmail(email)) throw new Error("Gebruik --email met een geldig e-mailadres.");
  const state = await readState();
  if (!state.suppressions.some((item) => normalizeEmail(item.email) === email)) {
    const contact = state.contacts.find((item) => normalizeEmail(item.email) === email);
    state.suppressions.push({
      email,
      officeName: contact?.officeName || "",
      officeSlug: contact?.officeSlug || "",
      reason: String(args.reason || "Handmatig toegevoegd").trim(),
      createdAt: new Date().toISOString(),
    });
    await writeState(state);
  }
  return { suppressed: true, email };
}

async function status() {
  const state = await readState();
  const mailConfig = config();
  return {
    configured: missingConfig().length === 0,
    missing: missingConfig(),
    user: mailConfig.user,
    smtpHost: mailConfig.smtpHost,
    smtpPort: mailConfig.smtpPort,
    imapHost: mailConfig.imapHost,
    imapPort: mailConfig.imapPort,
    contacts: state.contacts.length,
    suppressions: state.suppressions.length,
    replies: state.replies.length,
    lastInboxUid: state.lastInboxUid,
  };
}

const command = process.argv[2] || "status";
const args = parseArgs(process.argv.slice(3));

try {
  let result;
  if (command === "status") result = await status();
  else if (command === "verify") result = await verifyConnections();
  else if (command === "send") result = await sendOfficeEmail(args);
  else if (command === "check-replies") result = await checkReplies();
  else if (command === "suppress") result = await addSuppression(args);
  else throw new Error(`Onbekend commando: ${command}`);

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
