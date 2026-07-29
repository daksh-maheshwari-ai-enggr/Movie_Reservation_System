import { useState } from 'react'
import { AdminHeader } from '../../../components/layout/AdminHeader'
import { StatCard } from '../../../components/ui/StatCard'
import { AdminTabs } from '../components/AdminTabs'
import { BookingTable } from '../components/BookingTable'
import { MoviesTable } from '../components/MoviesTable'
import { ShowtimesTable } from '../components/ShowtimesTable'
import { TheatersTable } from '../components/TheatersTable'

import { AddFilmModal } from '../components/forms/AddFilmModal'
import { AddShowtimeModal } from '../components/forms/AddShowtimeModal'
import { AddTheaterModal } from '../components/forms/AddTheaterModal'
import { EditTheaterModal } from '../components/forms/EditTheaterModal'

import { bookings, films, theaters } from '../data/mockData'

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false)
  const [isTheaterModalOpen, setIsTheaterModalOpen] = useState(false)
  const [isShowtimeModalOpen, setIsShowtimeModalOpen] = useState(false)

  // Theater being edited
  const [editingTheater, setEditingTheater] = useState(null)

  // Used to tell TheatersTable to fetch data again
  const [theaterRefreshKey, setTheaterRefreshKey] = useState(0)

  const [notification, setNotification] = useState('')

  function showNotification(message) {
    setNotification(message)

    window.setTimeout(() => {
      setNotification('')
    }, 2600)
  }

  function handleFilmAdded() {
    setIsFilmModalOpen(false)
    showNotification('Film created successfully')
  }

  function handleTheaterAdded() {
    setIsTheaterModalOpen(false)

    // change key -> TheatersTable useEffect runs again
    setTheaterRefreshKey((previous) => previous + 1)

    showNotification('Theater created successfully')
  }

  function handleTheaterUpdated() {
    setEditingTheater(null)

    // fetch theaters again
    setTheaterRefreshKey((previous) => previous + 1)

    showNotification('Theater updated successfully')
  }

  function handleShowtimeAdded() {
    setIsShowtimeModalOpen(false)
    showNotification('Showtime created successfully')
  }

  let activeContent = <BookingTable />

  if (activeTab === 'movies') {
    activeContent = (
      <MoviesTable
        onAddFilm={() => setIsFilmModalOpen(true)}
      />
    )
  }

  if (activeTab === 'theaters') {
    activeContent = (
      <TheatersTable
        onAddTheater={() => setIsTheaterModalOpen(true)}
        onEditTheater={(theater) => setEditingTheater(theater)}
        refreshKey={theaterRefreshKey}
      />
    )
  }

  if (activeTab === 'showtimes') {
    activeContent = (
      <ShowtimesTable
        onAddShowtime={() => setIsShowtimeModalOpen(true)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#08080f] text-[#f7f3ed] selection:bg-[#d69b22] selection:text-black">

      <AdminHeader />

      <main className="mx-auto w-full max-w-[1920px] px-5 py-10 sm:px-9 lg:px-12">

        <div className="mb-12 flex items-center justify-between gap-5">

          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Admin Dashboard
          </h1>

          <span className="rounded-full border border-[#6f4b12] bg-[#20190e] px-4 py-2 text-sm font-semibold text-[#d69b22]">
            Administrator
          </span>

        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            label="Films"
            value={films.length}
          />

          <StatCard
            label="Theaters"
            value={theaters.length}
          />

          <StatCard
            label="Confirmed bookings"
            value={bookings.length}
          />

          <StatCard
            label="Revenue"
            value="$33.60"
          />

        </section>

        <AdminTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <section className="pt-10">
          {activeContent}
        </section>

      </main>

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-[#4e3c17] bg-[#1d1912] px-5 py-3 text-sm text-[#f5d183] shadow-2xl">
          {notification}
        </div>
      )}

      {isFilmModalOpen && (
        <AddFilmModal
          onClose={() => setIsFilmModalOpen(false)}
          onFilmAdded={handleFilmAdded}
        />
      )}

      {isTheaterModalOpen && (
        <AddTheaterModal
          onClose={() => setIsTheaterModalOpen(false)}
          onTheaterAdded={handleTheaterAdded}
        />
      )}

      {editingTheater && (
        <EditTheaterModal
          theater={editingTheater}
          onClose={() => setEditingTheater(null)}
          onTheaterUpdated={handleTheaterUpdated}
        />
      )}

      {isShowtimeModalOpen && (
        <AddShowtimeModal
          onClose={() => setIsShowtimeModalOpen(false)}
          onShowtimeAdded={handleShowtimeAdded}
        />
      )}

    </div>
  )
}