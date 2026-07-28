/** Dark/transparent pill — matches the inactive "Register" tab in the Sign In modal. */
export function SecondaryButton({
  children,
  type = 'button',
  onClick,
  className = '',
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cine-focus inline-flex items-center justify-center gap-2 rounded-full
        border border-cine-border-strong bg-cine-surface-raised px-6 py-3 text-sm font-semibold
        text-cine-muted transition-colors duration-200 hover:text-cine-text hover:border-cine-gold/40
        ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

/** Plain text link — matches "Cancel" beneath the Sign In button. */
export function TextLink({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cine-focus rounded text-sm text-cine-muted transition-colors duration-200 hover:text-cine-text ${className}`}
    >
      {children}
    </button>
  )
}
