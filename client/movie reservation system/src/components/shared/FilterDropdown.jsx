/** Same pill-chip row used for genre filters on the Films page, repurposed for booking status. */
function FilterDropdown({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`cine-focus rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200
              ${
                active
                  ? 'border-cine-gold bg-cine-gold text-cine-bg'
                  : 'border-cine-border-strong bg-cine-surface-raised text-cine-muted hover:text-cine-text'
              }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default FilterDropdown
