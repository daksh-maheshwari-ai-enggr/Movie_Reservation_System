import { useState } from 'react'
import { X } from 'lucide-react'
import InputField from '../../../components/shared/InputField.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import { SecondaryButton } from '../../../components/shared/SecondaryButton.jsx'

const initialForm = {
  title: '',
  genre: '',
  rating: '',
  duration: '',
  year: '',
  director: '',
  cast: '',
}

/** Matches the Figma "Add Film" modal exactly: field order, layout, placeholders. */
function AddFilmModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm)
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave?.(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10">
      <div className="w-full max-w-md rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-cine-text">Add Film</h2>
          <button
            type="button"
            onClick={onClose}
            className="cine-focus rounded text-cine-muted transition-colors duration-200 hover:text-cine-text"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="title"
            label="Title"
            value={form.title}
            onChange={update('title')}
            placeholder="e.g. Neon Frontier"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="genre"
              label="Genre"
              value={form.genre}
              onChange={update('genre')}
              placeholder="Sci-Fi"
            />
            <InputField
              id="rating"
              label="Rating"
              value={form.rating}
              onChange={update('rating')}
              placeholder="PG-13"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="duration"
              label="Duration (min)"
              type="number"
              value={form.duration}
              onChange={update('duration')}
              placeholder="120"
            />
            <InputField
              id="year"
              label="Year"
              type="number"
              value={form.year}
              onChange={update('year')}
              placeholder="2026"
            />
          </div>

          <InputField
            id="director"
            label="Director"
            value={form.director}
            onChange={update('director')}
            placeholder="Director name"
          />

          <InputField
            id="cast"
            label="Cast (comma-separated)"
            value={form.cast}
            onChange={update('cast')}
            placeholder="Actor 1, Actor 2"
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton type="submit">Save Film</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFilmModal
