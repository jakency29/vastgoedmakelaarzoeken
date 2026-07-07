// Sterrenweergave (0 tot 5). Amber gevulde sterren over grijze, breedte = rating-percentage.

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.1 20.9l1.1-6.5L2.5 9.8l6.5-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Rating({ rating, className = "" }: { rating: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className={`relative inline-block leading-none ${className}`} role="img" aria-label={`${rating.toFixed(1)} op 5 sterren`}>
      <Stars className="text-slate-200" />
      <span className="absolute inset-0 overflow-hidden text-accent-500" style={{ width: `${pct}%` }}>
        <Stars />
      </span>
    </span>
  );
}
