import { useMemo, useState } from 'react'
import SearchBar from '../../../components/shared/SearchBar.jsx'
import FilterDropdown from '../../../components/shared/FilterDropdown.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { mockFilms, GENRES } from '../mock/filmsMockData.js'

const GENRE_OPTIONS = GENRES.map((g) => ({ value: g, label: g }))

function Home() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  const filtered = useMemo(() => {
    return mockFilms.filter((f) => {
      const matchesGenre = genre === 'All' || f.genre === genre
      const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase())
      return matchesGenre && matchesSearch
    })
  }, [search, genre])

  return (
    <div>
      {/* Hero — background gradient matches the exact computed value pulled via
          DevTools: linear-gradient(to top, rgb(8,8,15) 0%, rgba(8,8,15,.4) 60%, transparent 100%) */}
      <section
        className="relative flex min-h-[520px] items-end px-6 pb-16 pt-24 sm:px-10"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgb(8,8,15) 0%, rgba(8,8,15,0.4) 60%, transparent 100%), linear-gradient(to bottom, rgb(8,8,15), #1a0f0f)',
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="cine-label mb-3">Now Showing</p>
          <h1 className="font-display text-5xl font-semibold text-cine-text sm:text-6xl">
            This Week&apos;s Films
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by title or director…"
          />
          <FilterDropdown options={GENRE_OPTIONS} value={genre} onChange={setGenre} />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {filtered.map((film) => (
            <MovieCard key={film.id} film={film} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-cine-muted">No films match your search.</p>
        )}
      </section>
    </div>
  )
}

export default Home
