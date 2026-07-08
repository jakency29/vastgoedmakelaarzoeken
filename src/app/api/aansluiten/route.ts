// API-route voor aanmeldingen van vastgoedmakelaars/kantoren die willen aansluiten.
// Los van /api/lead zodat deze aanvragen herkenbaar binnenkomen. Verstuurt per e-mail via Resend.
// Zonder RESEND_API_KEY valt de route terug op loggen (handig lokaal / in preview).
// Vereiste env-variabelen op Vercel: RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL.

import { NextResponse } from "next/server";
import { Resend } from "resend";

type AanmeldingInput = {
  naam?: string;
  kantoor?: string;
  email?: string;
  telefoon?: string;
  bericht?: string;
};

async function deliver(aanmelding: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.log("[aansluiten] (geen e-mailconfig, enkel gelogd)", JSON.stringify(aanmelding));
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    replyTo: aanmelding.email,
    subject: `Nieuwe aanmelding vastgoedmakelaar: ${aanmelding.naam}${aanmelding.kantoor ? ` (${aanmelding.kantoor})` : ""}`,
    text: [
      `Naam: ${aanmelding.naam}`,
      `Kantoor: ${aanmelding.kantoor || "niet opgegeven"}`,
      `E-mail: ${aanmelding.email}`,
      `Telefoon: ${aanmelding.telefoon || "niet opgegeven"}`,
      `Bericht: ${aanmelding.bericht || "niet opgegeven"}`,
      `Ontvangen: ${aanmelding.ontvangen}`,
    ].join("\n"),
  });
}

export async function POST(request: Request) {
  let data: AanmeldingInput;
  try {
    data = (await request.json()) as AanmeldingInput;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const naam = String(data.naam ?? "").trim();
  const email = String(data.email ?? "").trim();

  const errors: string[] = [];
  if (naam.length < 2) errors.push("naam");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push("email");

  if (errors.length) {
    return NextResponse.json({ error: "Controleer je gegevens.", fields: errors }, { status: 422 });
  }

  const aanmelding = {
    naam,
    kantoor: String(data.kantoor ?? "").trim(),
    email,
    telefoon: String(data.telefoon ?? "").trim(),
    bericht: String(data.bericht ?? "").trim(),
    ontvangen: new Date().toISOString(),
  };

  try {
    await deliver(aanmelding);
  } catch (err) {
    console.error("[aansluiten] versturen mislukt", err);
    return NextResponse.json({ error: "Versturen mislukt. Probeer later opnieuw." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
