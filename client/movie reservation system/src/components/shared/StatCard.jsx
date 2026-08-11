/**
 * Visually identical to the Admin Dashboard's stat cards (uppercase muted
 * label, large gold number, flat surface card). Reused here for member
 * stats instead of introducing a new card type.
 */
function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-6">
      <div className="flex items-start justify-between">
        <p className="cine-label">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-cine-muted-dim" strokeWidth={1.75} />}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-cine-gold">{value}</p>
    </div>
  )
}

export default StatCard
