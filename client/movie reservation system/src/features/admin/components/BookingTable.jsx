import { bookings } from '../data/mockData'

export function BookingTable() {
  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold">All Bookings</h2>
      <div className="overflow-x-auto rounded-2xl border border-[#292a42] bg-[#111119]">
        <table className="w-full min-w-[800px] border-collapse text-lg">
          <thead>
            <tr>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Reference</th>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Film</th>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Customer</th>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Seats</th>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Total</th>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.reference}>
                <td className="border-t border-[#232438] px-6 py-5 font-mono text-[#d69b22]">{booking.reference}</td>
                <td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">{booking.film}</td>
                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">{booking.customer}</td>
                <td className="border-t border-[#232438] px-6 py-5 font-mono text-[#9997bd]">{booking.seats}</td>
                <td className="border-t border-[#232438] px-6 py-5 font-semibold text-[#f7f3ed]">{booking.total}</td>
                <td className="border-t border-[#232438] px-6 py-5"><span className="rounded-md bg-[#103427] px-3 py-1 text-sm font-semibold text-[#36d57b]">{booking.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
