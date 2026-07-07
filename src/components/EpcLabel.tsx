// EPC-labelbadge met de Vlaamse EPC-kleuren.

const EPC_COLORS: Record<string, string> = {
  "A+": "#00a651", A: "#4cb847", B: "#a9cf38", C: "#f6eb14",
  D: "#fdb913", E: "#f58220", F: "#ed1c24", G: "#be1e2d",
};

export function EpcLabel({ label, verbruik }: { label: string; verbruik?: number | null }) {
  const color = EPC_COLORS[label] ?? "#94a3b8";
  const donker = ["B", "C"].includes(label);
  return (
    <span className="inline-flex items-center gap-2">
      <span
        style={{ backgroundColor: color, color: donker ? "#16253b" : "#ffffff" }}
        className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2 text-lg font-extrabold"
      >
        {label}
      </span>
      {verbruik ? <span className="text-sm text-slate-600">{verbruik} kWh/m2 per jaar</span> : null}
    </span>
  );
}
