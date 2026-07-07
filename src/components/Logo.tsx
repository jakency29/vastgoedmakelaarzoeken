// Merklogo: huis-mark (navy outline + amber gable + vlaggetje) plus woordmerk.
// variant "dark" voor lichte achtergrond, "light" voor de navy footer.

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const navy = variant === "dark" ? "var(--color-brand-800)" : "#ffffff";
  const word = variant === "dark" ? "text-brand-800" : "text-white";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        width="36"
        height="36"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* huis-outline */}
        <path
          d="M6 22.5 L23 7 a2 2 0 0 1 2.6 0 L34 14.7 V9.5 a1.5 1.5 0 0 1 1.5-1.5 h3 a1.5 1.5 0 0 1 1.5 1.5 V22.5 M6 22.5 V39 a2 2 0 0 0 2 2 H20"
          stroke={navy}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* amber gable */}
        <path
          d="M23.2 20 a1.6 1.6 0 0 1 1.6 0 L31 26 a1.4 1.4 0 0 1 -0.9 2.5 H18.9 A1.4 1.4 0 0 1 18 26 Z"
          fill="var(--color-accent-500)"
        />
      </svg>
      <span className={`text-lg font-extrabold leading-none tracking-tight ${word}`}>
        Vastgoedmakelaar<span className="text-accent-500">Zoeken</span>
      </span>
    </span>
  );
}
