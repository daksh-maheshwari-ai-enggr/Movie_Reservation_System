function Logo({ className = '' }) {
  return (
    <span
      className={`font-display text-xl font-semibold tracking-wide ${className}`}
    >
      <span className="text-cine-gold">CINÉ</span>
      <span className="text-cine-text">VAULT</span>
    </span>
  )
}

export default Logo
