import Badge from '../../../components/shared/Badge.jsx'

const STATUS_MAP = {
  confirmed: { label: 'Confirmed', variant: 'gold' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
}

function StatusBadge({ status }) {
  const config = STATUS_MAP[status] ?? { label: status, variant: 'neutral' }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default StatusBadge
