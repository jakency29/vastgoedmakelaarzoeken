// Elfsight-leadformulier (Form Builder). Gebruikt voor alle leads: vastgoedmakelaar,
// asbestattest, EPC, asbest verwijderen, enz. Het platform.js-script wordt hier geladen
// (strategy lazyOnload, tijdens idle) zodat het enkel laadt op pagina's die het formulier
// tonen en de mobiele renderfase niet blokkeert. next/script dedupt op id, dus meerdere
// formulieren op een pagina laden het script maar een keer.

import Script from "next/script";

const ELFSIGHT_APP = "elfsight-app-cec3ca11-b1cb-4af3-9720-8f593946b60b";

export function ElfsightForm({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5 ${className}`}>
      <div className={ELFSIGHT_APP} data-elfsight-app-lazy />
      <Script id="elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </div>
  );
}
