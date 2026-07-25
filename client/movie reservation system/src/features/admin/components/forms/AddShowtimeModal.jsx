import { useState } from 'react'
import { ModalShell } from './ModalShell'

export function AddShowtimeModal({ onClose, onShowtimeAdded }) {
  const [film, setFilm] = useState('Neon Frontier')
  const [theater, setTheater] = useState('Grand Hall')
  const [dateTime, setDateTime] = useState('')
  const [ticketPrice, setTicketPrice] = useState('16')

  function submitShowtime(event) {
    event.preventDefault()
    onShowtimeAdded({ film, theater, dateTime, ticketPrice })
  }

  return (
    <ModalShell title="Add Showtime" onClose={onClose}>
      <form onSubmit={submitShowtime}>
        <label className="block"><span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">Film</span><input value={film} onChange={(event) => setFilm(event.target.value)} required className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]" /></label>
        <label className="mt-5 block"><span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">Theater</span><input value={theater} onChange={(event) => setTheater(event.target.value)} required className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]" /></label>
        <label className="mt-5 block"><span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">Date & time</span><input value={dateTime} onChange={(event) => setDateTime(event.target.value)} required type="datetime-local" className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]" /></label>
        <label className="mt-5 block"><span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">Ticket price ($)</span><input value={ticketPrice} onChange={(event) => setTicketPrice(event.target.value)} required type="number" min="0" step="0.01" className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]" /></label>
        <div className="mt-9 flex gap-4"><button type="button" onClick={onClose} className="flex-1 rounded-xl border border-[#2d2e45] bg-[#1a1a26] px-5 py-4 text-lg font-semibold hover:bg-[#242434]">Cancel</button><button className="flex-1 rounded-xl bg-[#d69b22] px-5 py-4 text-lg font-semibold text-black hover:bg-[#ebae30]">Add Showtime</button></div>
      </form>
    </ModalShell>
  )
}
