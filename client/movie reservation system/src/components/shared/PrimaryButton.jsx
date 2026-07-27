/**
 * Reused across the app: Sign In (auth), Save (Edit Profile),
 * Quick actions (Dashboard). Fully-rounded gold fill, dark text —
 * matches the "Sign In" / "Add Film → Save" buttons in the Figma.
 */
function PrimaryButton({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cine-focus inline-flex items-center justify-center gap-2 rounded-full
        bg-cine-gold px-6 py-3 text-sm font-semibold text-cine-bg
        transition-colors duration-200 hover:bg-cine-gold-hover
        disabled:cursor-not-allowed disabled:opacity-60
        ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-cine-bg/40 border-t-cine-bg" />
      )}
      {children}
    </button>
  )
}

export default PrimaryButton
