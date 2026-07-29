import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../../../components/shared/SectionHeader.jsx'
import EmptyState from '../../../components/shared/EmptyState.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import { SkeletonCard } from '../../../components/shared/LoadingSpinner.jsx'
import SearchBar from '../../../components/shared/SearchBar.jsx'
import FilterDropdown from '../../../components/shared/FilterDropdown.jsx'
import BookingCard from '../components/BookingCard.jsx'
import BookingTable from '../components/BookingTable.jsx'
import { useBookings } from '../hooks/useBookings.js'

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

/*
 * Reused patterns: title/heading matches the real "My Bookings" screen
 * exactly (no eyebrow label there, unlike the net-new Module 2 pages).
 * SearchBar + FilterDropdown are the same search input and filter-chip row
 * used on the Films page. BookingTable/BookingCard reuse the surface-card
 * language. Empty state matches the existing My Bookings screen verbatim
 * ("No bookings yet" / "Browse films and reserve your seats.").
 */
function BookingHistory() {
  const { bookings, loading } = useBookings()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch = b.filmTitle.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === 'all' || b.status === status
      return matchesSearch && matchesStatus
    })
  }, [bookings, search, status])

  return (
    <div className="space-y-8">
      <SectionHeader title="My Bookings" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <FilterDropdown options={STATUS_FILTERS} value={status} onChange={setStatus} />
      </div>

      {loading ? (
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
          <EmptyState
            title={bookings.length === 0 ? 'No bookings yet' : 'No bookings match your search'}
            subtitle={
              bookings.length === 0
                ? 'Browse films and reserve your seats.'
                : 'Try a different title or filter.'
            }
            action={
              bookings.length === 0 && (
                <PrimaryButton onClick={() => navigate('/')}>Browse Films</PrimaryButton>
              )
            }
          />
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <BookingTable bookings={filtered} />
          </div>
          <div className="space-y-3 md:hidden">
            {filtered.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BookingHistory
