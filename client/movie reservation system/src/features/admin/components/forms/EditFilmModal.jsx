import { useState } from 'react'
import { ModalShell } from './ModalShell'
import { updateMovie } from '../../api/adminApi'

export function EditFilmModal({ movie, onClose, onFilmUpdated }) {
  const [title, setTitle] = useState(movie.title)
  const [genre, setGenre] = useState(movie.genre)
  const [rating, setRating] = useState(movie.rating)
  const [duration, setDuration] = useState(movie.duration)
  const [year, setYear] = useState(movie.year)
  const [director, setDirector] = useState(movie.director)
  const [cast, setCast] = useState(movie.cast?.join(', ') || '')
  const [description, setDescription] = useState(movie.description)
  const [posterUrl, setPosterUrl] = useState(movie.poster || '')

  async function handleSubmit(event) {
    event.preventDefault()

    const movieData = {
      title,
      genre,
      duration: Number(duration),
      year: Number(year),
      rating,
      description,
      director,
      cast: cast
        .split(',')
        .map((actor) => actor.trim())
        .filter(Boolean),
      poster: posterUrl,
    }

    try {
      await updateMovie(movie._id, movieData)

      alert('Movie updated successfully')

      onFilmUpdated()
    } catch (error) {
      console.log('Error updating movie:', error)
      alert('Could not update movie. Please try again.')
    }
  }

  return (
    <ModalShell title="Edit Film" onClose={onClose}>
      <form onSubmit={handleSubmit}>

        <label className="mb-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Title
          </span>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          />
        </label>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <label>
            <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
              Genre
            </span>

            <input
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
              Rating
            </span>

            <input
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
              Duration (min)
            </span>

            <input
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              type="number"
              className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
              Year
            </span>

            <input
              value={year}
              onChange={(event) => setYear(event.target.value)}
              type="number"
              className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
            />
          </label>

        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Director
          </span>

          <input
            value={director}
            onChange={(event) => setDirector(event.target.value)}
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Cast (comma-separated)
          </span>

          <input
            value={cast}
            onChange={(event) => setCast(event.target.value)}
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Description
          </span>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-28 w-full resize-y rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 py-4 outline-none focus:border-[#d69b22]"
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Poster URL (optional)
          </span>

          <input
            value={posterUrl}
            onChange={(event) => setPosterUrl(event.target.value)}
            placeholder="https://..."
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none placeholder:text-[#6e6d7f] focus:border-[#d69b22]"
          />
        </label>

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
            Update Film
          </button>

        </div>

      </form>
    </ModalShell>
  )
}