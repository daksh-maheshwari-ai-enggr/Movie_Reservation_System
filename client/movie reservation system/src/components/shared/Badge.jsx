const VARIANTS = {
  gold: 'border-cine-gold/40 bg-cine-gold-dim text-cine-gold',
  neutral: 'border-cine-border-strong bg-cine-surface-raised text-cine-muted',
  success: 'border-cine-success/30 bg-cine-success/10 text-cine-success',
  danger: 'border-cine-danger/30 bg-cine-danger/10 text-cine-danger',
  dark: 'border-transparent bg-black/70 text-cine-text',
}

/** Pill badge — role tags (ADMIN), rating tags, and booking status all share this shape. */
function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide
        ${VARIANTS[variant] ?? VARIANTS.neutral} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
