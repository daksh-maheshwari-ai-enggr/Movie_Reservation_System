// Mock data only. Shapes mirror what GET /api/users/profile and
// GET /api/users/bookings are expected to return, so swapping the service
// layer for real fetch calls later needs no changes in components/hooks.

export const mockProfile = {
  id: 'usr_2291',
  name: 'Alex Rivera',
  email: 'alex.rivera@cinevault.demo',
  phone: '+1 (415) 555-0148',
  address: 'San Francisco, CA',
  role: 'Member',
  avatarUrl: '',
  joinedDate: '2024-03-12',
}

// TODO(Module 1): once real auth exists, GET /api/users/profile will
// naturally return the logged-in user's own data — this bridge function
// won't be needed. For now it keeps the Dashboard/Profile mock in sync
// with whichever demo account was used to sign in.
export function syncMockProfileIdentity({ name, email, role }) {
  Object.assign(mockProfile, { name, email, role })
}

export const mockBookings = [
  {
    id: 'bkg_1001',
    filmTitle: 'Neon Frontier',
    genre: 'Sci-Fi',
    posterUrl: '',
    theater: 'CinéVault Downtown — Hall 3',
    showDate: '2026-08-02',
    showTime: '19:30',
    seats: ['G4', 'G5'],
    amount: 24.0,
    status: 'confirmed',
  },
  {
    id: 'bkg_1002',
    filmTitle: 'The Venetian Heist',
    genre: 'Thriller',
    posterUrl: '',
    theater: 'CinéVault Riverside — Hall 1',
    showDate: '2026-06-14',
    showTime: '21:00',
    seats: ['D2'],
    amount: 13.5,
    status: 'completed',
  },
  {
    id: 'bkg_1003',
    filmTitle: 'Ember & Ash',
    genre: 'Drama',
    posterUrl: '',
    theater: 'CinéVault Downtown — Hall 2',
    showDate: '2026-05-01',
    showTime: '18:00',
    seats: ['B7', 'B8', 'B9'],
    amount: 40.5,
    status: 'cancelled',
  },
]
