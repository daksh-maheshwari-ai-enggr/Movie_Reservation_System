function EmptyState({ title, subtitle, action = null }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-24 text-center">
      <p className="text-lg text-cine-muted">{title}</p>
      {subtitle && <p className="text-sm text-cine-muted-dim">{subtitle}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default EmptyState
