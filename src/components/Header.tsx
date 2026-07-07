"use client";

// Sticky portaal-hoofding: logo links, horizontale nav (desktop), amber CTA, hamburger op mobiel.

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header({ nav }: { nav: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label={site.name}>
          <Logo />
        </Link>

        <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
          <ul className="flex items-center gap-7 whitespace-nowrap text-sm font-semibold text-brand-800">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-accent-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#leadform"
            className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-brand-900 shadow-sm transition-colors hover:bg-accent-400 sm:inline-block"
          >
            Gratis offertes
          </Link>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-brand-800 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobiele navigatie" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 text-sm font-semibold text-brand-800">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-slate-100 last:border-0">
                <Link href={item.href} className="block py-3 hover:text-accent-600" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/#leadform"
                className="block rounded-full bg-accent-500 px-5 py-3 text-center font-bold text-brand-900"
                onClick={() => setOpen(false)}
              >
                Gratis offertes
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
