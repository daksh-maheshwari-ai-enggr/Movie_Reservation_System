// Mirrors what GET /api/admin/overview would return. Counts match the
// Figma export exactly (6 films, 3 theaters, 0 confirmed bookings, $0 revenue).

export const mockAdminStats = {
  filmsCount: 6,
  theatersCount: 3,
  confirmedBookings: 0,
  revenue: 0,
}

export const mockTheaters = [
  { id: 'thr_1', name: 'CinéVault Downtown', halls: 3 },
  { id: 'thr_2', name: 'CinéVault Riverside', halls: 2 },
  { id: 'thr_3', name: 'CinéVault Uptown', halls: 4 },
]

export const mockShowtimes = [
  { id: 'sh_1', film: 'Neon Frontier', theater: 'CinéVault Downtown — Hall 3', time: '2026-08-02T19:30' },
  { id: 'sh_2', film: 'The Venetian Heist', theater: 'CinéVault Riverside — Hall 1', time: '2026-08-03T21:00' },
]

export const mockAllBookings = []
