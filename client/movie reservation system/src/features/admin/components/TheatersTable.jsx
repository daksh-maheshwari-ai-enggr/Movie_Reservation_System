import { useEffect, useState } from 'react'
import {
  getTheaters,
  deleteTheater,
} from '../api/adminApi'

export function TheatersTable({
  onAddTheater,
  onEditTheater,
  refreshKey,
}) {
  const [theaters, setTheaters] = useState([])

  async function fetchTheaters() {
    try {
      const response = await getTheaters()

      setTheaters(response.data)
    } catch (error) {
      console.log('Error fetching theaters:', error)
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this theater?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await deleteTheater(id)

      fetchTheaters()
    } catch (error) {
      console.log('Error deleting theater:', error)
      alert('Could not delete theater')
    }
  }

  useEffect(() => {
    fetchTheaters()
  }, [refreshKey])

  return (
    <div>

      <div className="mb-7 flex items-center justify-between gap-4">

        <h2 className="text-2xl font-semibold">
          Theaters
        </h2>

        <button
          onClick={onAddTheater}
          className="rounded-xl bg-[#d69b22] px-5 py-3 font-semibold text-black transition hover:bg-[#ecaf32]"
        >
          + Add Theater
        </button>

      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#292a42] bg-[#111119]">

        <table className="w-full min-w-[780px] border-collapse text-lg">

          <thead>
            <tr>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Theater
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Capacity
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Layout
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Description
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {theaters.map((theater) => (

              <tr key={theater._id}>

                <td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">
                  {theater.name}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {theater.rows * theater.seatsPerRow}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {theater.rows} × {theater.seatsPerRow}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {theater.description}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">

                  <button
                    onClick={() => onEditTheater(theater)}
                    className="mr-5 hover:text-[#d69b22]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(theater._id)}
                    className="hover:text-[#e37979]"
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}