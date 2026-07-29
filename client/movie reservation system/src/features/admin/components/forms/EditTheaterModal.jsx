import { useState } from 'react'
import { ModalShell } from './ModalShell'
import { updateTheater } from '../../api/adminApi'

export function EditTheaterModal({
  theater,
  onClose,
  onTheaterUpdated,
}) {
  const [name, setName] = useState(theater.name)
  const [rows, setRows] = useState(theater.rows)
  const [seatsPerRow, setSeatsPerRow] = useState(theater.seatsPerRow)
  const [description, setDescription] = useState(
    theater.description || ''
  )

  const capacity = Number(rows || 0) * Number(seatsPerRow || 0)

  async function handleSubmit(event) {
    event.preventDefault()

    const updatedData = {
      name,
      rows: Number(rows),
      seatsPerRow: Number(seatsPerRow),
      description,
    }

    try {
      await updateTheater(theater._id, updatedData)

      onTheaterUpdated()
    } catch (error) {
      console.log('Error updating theater:', error)
      alert('Could not update theater')
    }
  }

  return (
    <ModalShell title="Edit Theater" onClose={onClose}>
      <form onSubmit={handleSubmit}>

        {/* Theater Name */}
        <label className="block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Theater name
          </span>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="e.g. Screen 4 — IMAX"
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none placeholder:text-[#6e6d7f] focus:border-[#d69b22]"
          />
        </label>

        {/* Rows + Seats */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

          <label>
            <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
              Rows
            </span>

            <input
              value={rows}
              onChange={(event) => setRows(event.target.value)}
              type="number"
              min="1"
              required
              className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
              Seats per row
            </span>

            <input
              value={seatsPerRow}
              onChange={(event) => setSeatsPerRow(event.target.value)}
              type="number"
              min="1"
              required
              className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
            />
          </label>

        </div>

        {/* Capacity */}
        <p className="mt-5 text-[#a09fc3]">
          Total capacity: {capacity} seats
        </p>

        {/* Description */}
        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Description
          </span>

          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Brief description"
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none placeholder:text-[#6e6d7f] focus:border-[#d69b22]"
          />
        </label>

        {/* Buttons */}
        <div className="mt-9 flex gap-4">

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#2d2e45] bg-[#1a1a26] px-5 py-4 text-lg font-semibold hover:bg-[#242434]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#d69b22] px-5 py-4 text-lg font-semibold text-black hover:bg-[#ebae30]"
          >
            Save Changes
          </button>

        </div>

      </form>
    </ModalShell>
  )
}