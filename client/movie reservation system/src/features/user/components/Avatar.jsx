function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

const SIZES = {
  md: 'h-12 w-12 text-base',
  lg: 'h-20 w-20 text-2xl',
}

function Avatar({ name, imageUrl, size = 'md' }) {
  const sizeClasses = SIZES[size] ?? SIZES.md

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses} rounded-full border border-cine-gold/40 object-cover`}
      />
    )
  }

  return (
    <div
      className={`${sizeClasses} flex items-center justify-center rounded-full border border-cine-gold/40 bg-cine-surface-raised font-display font-semibold text-cine-gold`}
    >
      {getInitials(name) || '?'}
    </div>
  )
}

export default Avatar
