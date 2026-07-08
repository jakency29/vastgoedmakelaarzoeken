// Verstuurt formulierinzendingen rechtstreeks vanuit de browser naar Web3Forms.
// Web3Forms staat op het gratis plan enkel client-side submissions toe.
// De access key is publiek en wordt via NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY meegegeven
// (in Vercel > Settings > Environment Variables, en lokaal in .env.local).

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export async function submitToWeb3Forms(fields: Record<string, string>): Promise<void> {
  if (!ACCESS_KEY) {
    throw new Error("Web3Forms access key ontbreekt (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY).");
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...fields }),
  });

  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!res.ok || !json.success) {
    throw new Error(`web3forms: ${json.message || res.status}`);
  }
}
