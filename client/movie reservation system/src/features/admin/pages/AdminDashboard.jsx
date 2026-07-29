import { useState } from 'react'
import { Plus } from 'lucide-react'
import SectionHeader from '../../../components/shared/SectionHeader.jsx'
import Badge from '../../../components/shared/Badge.jsx'
import StatCard from '../../../components/shared/StatCard.jsx'
import EmptyState from '../../../components/shared/EmptyState.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import AddFilmModal from '../components/AddFilmModal.jsx'
import { mockFilms } from '../../films/mock/filmsMockData.js'
import {
  mockAdminStats,
  mockTheaters,
  mockShowtimes,
  mockAllBookings,
} from '../mock/adminMockData.js'

const TABS = ['Overview', 'Movies', 'Theaters', 'Showtimes']

/*
 * Reused patterns: SectionHeader, StatCard (identical component used on the
 * Member Dashboard), Badge (same pill as the "ADMIN" nav badge), EmptyState
 * ("No bookings yet." pattern). Tab underline uses the same gold-active /
 * muted-inactive language as filter chips elsewhere.
 */
function AdminDashboard() {
  const [tab, setTab] = useState('Overview')
  const [films, setFilms] = useState(mockFilms)
  const [showAddFilm, setShowAddFilm] = useState(false)

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Admin"
        title="Admin Dashboard"
        action={<Badge variant="gold">Administrator</Badge>}
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Films" value={films.length} />
        <StatCard label="Theaters" value={mockTheaters.length} />
        <StatCard label="Confirmed Bookings" value={mockAdminStats.confirmedBookings} />
        <StatCard label="Revenue" value={`$${mockAdminStats.revenue.toFixed(2)}`} />
      </section>

      <div className="flex gap-6 border-b border-cine-border">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`cine-focus -mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-200 ${
              tab === t
                ? 'border-cine-gold text-cine-gold'
                : 'border-transparent text-cine-muted hover:text-cine-text'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-cine-text">All Bookings</h2>
          {mockAllBookings.length === 0 ? (
            <p className="text-sm text-cine-muted">No bookings yet.</p>
          ) : (
            <EmptyState title="No bookings yet" />
          )}
        </section>
      )}

      {tab === 'Movies' && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-cine-text">Films</h2>
            <PrimaryButton onClick={() => setShowAddFilm(true)}>
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Film
            </PrimaryButton>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
            {films.map((film, i) => (
              <div
                key={film.id}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  i !== films.length - 1 ? 'border-b border-cine-border' : ''
                }`}
              >
                <div>
                  <p className="font-display font-semibold text-cine-text">{film.title}</p>
                  <p className="text-xs text-cine-muted">
                    {film.genre} · {film.durationMinutes}m
                  </p>
                </div>
                <Badge variant="dark">{film.rating}</Badge>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'Theaters' && (
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-cine-text">Theaters</h2>
          <div className="overflow-hidden rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
            {mockTheaters.map((theater, i) => (
              <div
                key={theater.id}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  i !== mockTheaters.length - 1 ? 'border-b border-cine-border' : ''
                }`}
              >
                <p className="font-display font-semibold text-cine-text">{theater.name}</p>
                <p className="text-cine-muted">{theater.halls} halls</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'Showtimes' && (
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-cine-text">Showtimes</h2>
          <div className="overflow-hidden rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
            {mockShowtimes.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  i !== mockShowtimes.length - 1 ? 'border-b border-cine-border' : ''
                }`}
              >
                <p className="font-display font-semibold text-cine-text">{s.film}</p>
                <p className="text-cine-muted">
                  {s.theater} · {new Date(s.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {showAddFilm && (
        <AddFilmModal
          onClose={() => setShowAddFilm(false)}
          onSave={(newFilm) =>
            setFilms((prev) => [
              ...prev,
              {
                id: `flm_${prev.length + 1}`,
                title: newFilm.title,
                genre: newFilm.genre,
                rating: newFilm.rating,
                durationMinutes: Number(newFilm.duration) || 0,
                posterUrl: '',
              },
            ])
          }
        />
      )}
    </div>
  )
}

export default AdminDashboard
