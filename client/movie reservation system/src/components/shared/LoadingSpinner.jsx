export function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-cine-border-strong border-t-cine-gold" />
      <span className="text-sm text-cine-muted">{label}</span>
    </div>
  )
}

export function SkeletonLine({ className = '' }) {
  return (
    <span
      className={`block animate-pulse rounded-full bg-cine-surface-raised ${className}`}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-6">
      <SkeletonLine className="mb-4 h-3 w-24" />
      <SkeletonLine className="mb-2 h-6 w-32" />
      <SkeletonLine className="h-3 w-40" />
    </div>
  )
}
