import { Calendar, MapPin, Ticket } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function BookingCard({ booking }) {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-cine-text">
            {booking.filmTitle}
          </h3>
          <StatusBadge status={booking.status} />
        </div>
        <p className="mt-1 text-sm text-cine-muted">{booking.genre}</p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-cine-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
            {formatDate(booking.showDate)} · {booking.showTime}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            {booking.theater}
          </span>
          <span className="flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5" strokeWidth={1.75} />
            Seats {booking.seats.join(', ')}
          </span>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="cine-label mb-1">Total</p>
        <p className="font-display text-xl font-semibold text-cine-gold">
          ${booking.amount.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default BookingCard
