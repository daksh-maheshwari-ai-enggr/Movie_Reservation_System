/** Matches the "Sign In / Register" segmented tab control shown in the Figma auth modal. */
function SegmentedToggle({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-full border border-cine-border bg-cine-surface p-1">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`cine-focus rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200
              ${active ? 'bg-cine-gold text-cine-bg' : 'text-cine-muted hover:text-cine-text'}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedToggle
