import Link from "next/link";

const routes = [
  { href: "/", label: "Vastgoedmakelaars vergelijken" },
  { href: "/kantoor", label: "Vastgoedkantoren bekijken" },
  { href: "/woning-verkopen", label: "Een woning verkopen" },
  { href: "/kennisbank", label: "In de kennisbank zoeken" },
];

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-24">
      <p className="text-sm font-bold uppercase tracking-wide text-accent-700">Fout 404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-900">
        Deze pagina bestaat niet meer
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
        De link is mogelijk verouderd of het adres is niet volledig. Kies hieronder de route die
        het best bij je vraag past. Een inhoudelijke fout kun je ook via de contactpagina melden.
      </p>
      <nav aria-label="Nuttige pagina's na een foutmelding" className="mt-8 grid gap-4 sm:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 font-bold text-brand-800 shadow-sm transition hover:border-brand-300 hover:text-brand-950"
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/contact"
        className="mt-8 inline-flex rounded-full bg-accent-500 px-6 py-3 font-bold text-brand-900 hover:bg-accent-400"
      >
        Neem contact op
      </Link>
    </main>
  );
}
