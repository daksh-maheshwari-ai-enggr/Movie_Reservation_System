import { Ticket, Clock, Wallet, UserRound, History } from 'lucide-react'
import SectionHeader from '../../../components/shared/SectionHeader.jsx'
import EmptyState from '../../../components/shared/EmptyState.jsx'
import { SkeletonCard } from '../../../components/shared/LoadingSpinner.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import StatCard from '../../../components/shared/StatCard.jsx'
import DashboardCard from '../components/DashboardCard.jsx'
import BookingCard from '../components/BookingCard.jsx'
import { useUserProfile } from '../hooks/useUserProfile.js'
import { useBookings } from '../hooks/useBookings.js'
import { useNavigate } from 'react-router-dom'

/*
 * Reused patterns: SectionHeader (eyebrow + serif title, same as "NOW SHOWING
 * → This Week's Films"), StatCard (identical shape to the Admin Dashboard's
 * Films/Theaters/Revenue cards), BookingCard, and the same "No bookings yet"
 * empty state as the existing My Bookings screen.
 */
function Dashboard() {
  const { profile, loading: profileLoading } = useUserProfile()
  const { bookings, loading: bookingsLoading } = useBookings()
  const navigate = useNavigate()

  const upcoming = bookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.showDate) >= new Date('2026-07-25'),
  )
  const totalSpent = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.amount, 0)

  const loading = profileLoading || bookingsLoading

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Member Dashboard"
        title={profile ? `Welcome back, ${profile.name.split(' ')[0]}` : 'Welcome back'}
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard label="Total Bookings" value={bookings.length} icon={Ticket} />
            <StatCard label="Upcoming" value={upcoming.length} icon={Clock} />
            <StatCard label="Total Spent" value={`$${totalSpent.toFixed(2)}`} icon={Wallet} />
            <StatCard
              label="Member Since"
              value={
                profile
                  ? new Date(profile.joinedDate).getFullYear()
                  : '—'
              }
              icon={UserRound}
            />
          </>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold text-cine-text">
          Upcoming Booking
        </h2>
        {loading ? (
          <SkeletonCard />
        ) : upcoming.length > 0 ? (
          <BookingCard booking={upcoming[0]} />
        ) : (
          <div className="rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
            <EmptyState
              title="No upcoming bookings"
              subtitle="Browse films and reserve your seats."
              action={<PrimaryButton onClick={() => navigate('/')}>Browse Films</PrimaryButton>}
            />
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-cine-text">Recent Bookings</h2>
          <button
            type="button"
            onClick={() => navigate('/bookings')}
            className="cine-focus text-sm text-cine-muted transition-colors duration-200 hover:text-cine-gold"
          >
            View all
          </button>
        </div>
        {loading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
            <EmptyState title="No bookings yet" subtitle="Browse films and reserve your seats." />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold text-cine-text">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DashboardCard
            to="/profile"
            icon={UserRound}
            title="View Profile"
            subtitle="See your account details"
          />
          <DashboardCard
            to="/profile/edit"
            icon={UserRound}
            title="Edit Profile"
            subtitle="Update your information"
          />
          <DashboardCard
            to="/bookings"
            icon={History}
            title="Booking History"
            subtitle="Review past reservations"
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
