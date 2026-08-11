import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

function DashboardCard({ to, icon: Icon, title, subtitle }) {
  return (
    <Link
      to={to}
      className="cine-focus group flex items-center justify-between gap-4 rounded-[var(--radius-cine-card)]
        border border-cine-border bg-cine-surface p-6 transition-colors duration-200 hover:border-cine-gold/40"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cine-border-strong bg-cine-surface-raised text-cine-gold">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display font-semibold text-cine-text">{title}</p>
          <p className="text-sm text-cine-muted">{subtitle}</p>
        </div>
      </div>
      <ChevronRight
        className="h-4 w-4 text-cine-muted-dim transition-colors duration-200 group-hover:text-cine-gold"
        strokeWidth={1.75}
      />
    </Link>
  )
}

export default DashboardCard
