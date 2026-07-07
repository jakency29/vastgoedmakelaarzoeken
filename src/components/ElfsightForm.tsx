// Elfsight-leadformulier (Form Builder). Site-breed gebruikt voor alle leads:
// vastgoedmakelaar, asbestattest, EPC, asbest verwijderen, enz.
// Het platform.js-script wordt eenmalig in de root layout geladen; dit rendert enkel
// de mount-div die Elfsight client-side invult.

const ELFSIGHT_APP = "elfsight-app-cec3ca11-b1cb-4af3-9720-8f593946b60b";

export function ElfsightForm({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5 ${className}`}>
      <div className={ELFSIGHT_APP} data-elfsight-app-lazy />
    </div>
  );
}
