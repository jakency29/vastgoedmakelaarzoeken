import Link from "next/link";

export function FormPrivacyNote() {
  return (
    <p className="mt-3 text-xs leading-relaxed text-slate-500">
      We gebruiken je gegevens om de aanvraag te verwerken en kunnen ze aan een passend kantoor
      bezorgen. Lees het <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-2">privacybeleid</Link>.
    </p>
  );
}
