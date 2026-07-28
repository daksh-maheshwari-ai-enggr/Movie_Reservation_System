import { Search } from 'lucide-react'

function SearchBar({ value, onChange, placeholder = 'Search by film title…' }) {
  return (
    <div className="relative flex-1 sm:min-w-[260px]">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cine-muted-dim"
        strokeWidth={1.75}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="cine-focus w-full rounded-[var(--radius-cine-input)] border border-cine-border bg-cine-surface
          py-3 pl-11 pr-4 text-sm text-cine-text placeholder:text-cine-muted-dim
          transition-colors duration-200 focus:border-cine-gold/60"
      />
    </div>
  )
}

export default SearchBar
