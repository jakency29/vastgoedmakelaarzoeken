// API-route voor leadformulier-submissions. Verstuurt de lead per e-mail via Resend.
// Zonder RESEND_API_KEY valt de route terug op loggen (handig lokaal / in preview).
// Vereiste env-variabelen op Vercel: RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL.

import { NextResponse } from "next/server";
import { Resend } from "resend";

const TRANSACTIES = new Set(["verkopen", "schatten", "verhuren", "kopen"]);

const TRANSACTIE_LABEL: Record<string, string> = {
  verkopen: "Woning verkopen",
  schatten: "Woning laten schatten",
  verhuren: "Woning verhuren",
  kopen: "Woning kopen",
};

type LeadInput = {
  transactie?: string;
  postcode?: string;
  email?: string;
  bron?: string;
};

async function deliverLead(lead: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Geen mailconfiguratie: log de lead zodat er niets verloren gaat.
    console.log("[lead] (geen e-mailconfig, enkel gelogd)", JSON.stringify(lead));
    return;
  }

  const resend = new Resend(apiKey);
  const label = TRANSACTIE_LABEL[lead.transactie] ?? lead.transactie;
  await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `Nieuwe lead: ${label} (${lead.postcode})`,
    text: [
      `Type aanvraag: ${label}`,
      `Postcode: ${lead.postcode}`,
      `E-mail bezoeker: ${lead.email}`,
      `Bron: ${lead.bron}`,
      `Ontvangen: ${lead.ontvangen}`,
    ].join("\n"),
  });
}

export async function POST(request: Request) {
  let data: LeadInput;
  try {
    data = (await request.json()) as LeadInput;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const transactie = String(data.transactie ?? "");
  const postcode = String(data.postcode ?? "").trim();
  const email = String(data.email ?? "").trim();

  const errors: string[] = [];
  if (!TRANSACTIES.has(transactie)) errors.push("transactie");
  if (!/^[1-9][0-9]{3}$/.test(postcode)) errors.push("postcode");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push("email");

  if (errors.length) {
    return NextResponse.json({ error: "Controleer je gegevens.", fields: errors }, { status: 422 });
  }

  const lead = {
    transactie,
    postcode,
    email,
    bron: String(data.bron ?? "onbekend"),
    ontvangen: new Date().toISOString(),
  };

  try {
    await deliverLead(lead);
  } catch (err) {
    console.error("[lead] versturen mislukt", err);
    return NextResponse.json({ error: "Versturen mislukt. Probeer later opnieuw." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
