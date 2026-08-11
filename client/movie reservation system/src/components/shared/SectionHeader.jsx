function SectionHeader({ eyebrow, title, action = null, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && <p className="cine-label mb-2">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-semibold text-cine-text sm:text-4xl">
          {title}
        </h1>
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
