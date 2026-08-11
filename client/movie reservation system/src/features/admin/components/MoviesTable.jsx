import { useEffect, useState } from 'react'
import { getMovies, deleteMovie } from '../api/adminApi.js'
import { EditFilmModal } from './forms/EditFilmModal.jsx'

export function MoviesTable({ onAddFilm }) {
  const [movies, setMovies] = useState([])
  const [editingMovie, setEditingMovie] = useState(null)

  async function fetchMovies() {
    try {
      const response = await getMovies()
      setMovies(response.data)
    } catch (error) {
      console.log('Error fetching movies:', error)
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await deleteMovie(id)
      fetchMovies()
    } catch (error) {
      console.log(error)
      alert('Could not delete movie')
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div>

      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Films</h2>

        <button
          onClick={onAddFilm}
          className="rounded-xl bg-[#d69b22] px-5 py-3 font-semibold text-black transition hover:bg-[#ecaf32]"
        >
          + Add Film
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#292a42] bg-[#111119]">

        <table className="w-full min-w-[780px] border-collapse text-lg">

          <thead>
            <tr>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Title
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Genre
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Duration
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Rating
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Year
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>

                <td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">
                  {movie.title}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {movie.genre}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {movie.duration} min
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {movie.rating}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                  {movie.year}
                </td>

                <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">

                  <button
                    onClick={() => setEditingMovie(movie)}
                    className="mr-5 hover:text-[#d69b22]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(movie._id)}
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


      {/* Edit Movie Modal */}

      {editingMovie && (
        <EditFilmModal
          movie={editingMovie}

          onClose={() => {
            setEditingMovie(null)
          }}

          onFilmUpdated={() => {
            setEditingMovie(null)
            fetchMovies()
          }}
        />
      )}

    </div>
  )
}