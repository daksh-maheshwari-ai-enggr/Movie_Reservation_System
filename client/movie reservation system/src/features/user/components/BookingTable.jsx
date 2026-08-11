import StatusBadge from './StatusBadge.jsx'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Desktop-only booking table. BookingCard is used below the md breakpoint. */
function BookingTable({ bookings }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-cine-border">
            {['Film', 'Showtime', 'Theater', 'Seats', 'Total', 'Status'].map((col) => (
              <th key={col} className="cine-label px-6 py-4 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b border-cine-border last:border-0 transition-colors duration-200 hover:bg-cine-surface-raised"
            >
              <td className="px-6 py-4">
                <p className="font-display font-semibold text-cine-text">{booking.filmTitle}</p>
                <p className="text-xs text-cine-muted">{booking.genre}</p>
              </td>
              <td className="px-6 py-4 text-cine-muted">
                {formatDate(booking.showDate)}
                <br />
                {booking.showTime}
              </td>
              <td className="px-6 py-4 text-cine-muted">{booking.theater}</td>
              <td className="px-6 py-4 text-cine-muted">{booking.seats.join(', ')}</td>
              <td className="px-6 py-4 font-semibold text-cine-gold">
                ${booking.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={booking.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingTable
