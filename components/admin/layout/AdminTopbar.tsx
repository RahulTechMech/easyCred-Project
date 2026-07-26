"use client";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-hairline/10 bg-ink-950/80 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline/10 text-frost-200"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-grad-signal font-display text-xs font-bold text-white">
          EC
        </span>
        <span className="font-display text-sm font-bold text-frost-50">Admin CRM</span>
      </div>
    </header>
  );
}
