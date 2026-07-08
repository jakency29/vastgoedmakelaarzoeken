// Badge voor premium partnerkantoren. Site-breed getoond waar een kantoor verschijnt.

export function PremiumBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-brand-900 shadow-sm ${className}`}
      title="Premium partner"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
      </svg>
      Premium partner
    </span>
  );
}
