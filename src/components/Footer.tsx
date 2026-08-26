// Navy portaal-voettekst met kernlinks en het logo in lichte variant.

import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-brand-200">{site.tagline}.</p>
          </div>
          <nav aria-labelledby="footer-verkopen">
            <p id="footer-verkopen" className="text-sm font-bold uppercase tracking-wide text-white">Verkopen</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/huis-laten-schatten" className="hover:text-accent-400">Huis laten schatten</Link></li>
              <li><Link href="/huis-verkopen-zonder-makelaar" className="hover:text-accent-400">Huis verkopen zonder makelaar</Link></li>
              <li><Link href="/kosten-vastgoedmakelaar" className="hover:text-accent-400">Kosten makelaar</Link></li>
              <li><Link href="/huis-verkopen-verplichtingen" className="hover:text-accent-400">Verplichtingen bij verkoop</Link></li>
              <li><Link href="/notariskosten-verkoop-huis" className="hover:text-accent-400">Notariskosten</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-attesten">
            <p id="footer-attesten" className="text-sm font-bold uppercase tracking-wide text-white">Attesten</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/asbestattest" className="hover:text-accent-400">Asbestattest</Link></li>
              <li><Link href="/huis-verkopen-verplichtingen/epc" className="hover:text-accent-400">EPC</Link></li>
              <li><Link href="/registratierechten" className="hover:text-accent-400">Registratierechten</Link></li>
              <li><Link href="/waarde-woning-berekenen" className="hover:text-accent-400">Waarde berekenen</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-info">
            <p id="footer-info" className="text-sm font-bold uppercase tracking-wide text-white">Info</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/huis-te-koop" className="hover:text-accent-400">Huizen te koop</Link></li>
              <li><Link href="/kennisbank" className="hover:text-accent-400">Kennisbank</Link></li>
              <li><Link href="/kantoor" className="hover:text-accent-400">Vastgoedkantoren</Link></li>
              <li><Link href="/werkwijze" className="hover:text-accent-400">Onze werkwijze</Link></li>
              <li><Link href="/contact" className="hover:text-accent-400">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-400">Privacybeleid</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-accent-400">Gebruiksvoorwaarden</Link></li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-accent-400">
                  {site.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-brand-300">
          <p>{site.name}. Vergelijk vastgoedmakelaars in België.</p>
          <p className="mt-2">
            Vastgoedmakelaarzoeken.com is eigendom van{" "}
            <a href={site.owner.url} className="font-semibold text-brand-100 hover:text-accent-400">
              {site.owner.name}
            </a>
            , {site.owner.streetAddress}, {site.owner.postalCode} {site.owner.addressLocality}.
            Ondernemingsnummer {site.owner.enterpriseNumber}. BTW {site.owner.vatID}.
          </p>
        </div>
      </div>
    </footer>
  );
}
