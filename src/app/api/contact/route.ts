// API-route voor het contactformulier. Verstuurt het bericht per e-mail via Resend.
// Zonder RESEND_API_KEY valt de route terug op loggen (handig lokaal / in preview).
// Vereiste env-variabelen op Vercel: RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL.

import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactInput = {
  naam?: string;
  email?: string;
  bericht?: string;
};

async function deliver(bericht: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.log("[contact] (geen e-mailconfig, enkel gelogd)", JSON.stringify(bericht));
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    replyTo: bericht.email,
    subject: `Nieuw contactbericht: ${bericht.naam}`,
    text: [
      `Naam: ${bericht.naam}`,
      `E-mail: ${bericht.email}`,
      `Bericht: ${bericht.bericht}`,
      `Ontvangen: ${bericht.ontvangen}`,
    ].join("\n"),
  });
}

export async function POST(request: Request) {
  let data: ContactInput;
  try {
    data = (await request.json()) as ContactInput;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const naam = String(data.naam ?? "").trim();
  const email = String(data.email ?? "").trim();
  const bericht = String(data.bericht ?? "").trim();

  const errors: string[] = [];
  if (naam.length < 2) errors.push("naam");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push("email");
  if (bericht.length < 2) errors.push("bericht");

  if (errors.length) {
    return NextResponse.json({ error: "Controleer je gegevens.", fields: errors }, { status: 422 });
  }

  try {
    await deliver({ naam, email, bericht, ontvangen: new Date().toISOString() });
  } catch (err) {
    console.error("[contact] versturen mislukt", err);
    return NextResponse.json({ error: "Versturen mislukt. Probeer later opnieuw." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
