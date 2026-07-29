// Mirrors GET /api/films (out of Module 2's scope, but needed so the app
// has a Home page to demo against). Titles/genres/ratings/durations match
// the Figma exports exactly.

export const mockFilms = [
  {
    id: 'flm_1',
    title: 'Neon Frontier',
    genre: 'Sci-Fi',
    rating: 'PG-13',
    durationMinutes: 142,
    posterUrl:
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'flm_2',
    title: 'The Venetian Heist',
    genre: 'Thriller',
    rating: 'R',
    durationMinutes: 118,
    posterUrl:
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'flm_3',
    title: 'Ember & Ash',
    genre: 'Drama',
    rating: 'PG-13',
    durationMinutes: 126,
    posterUrl:
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'flm_4',
    title: 'Razorback',
    genre: 'Action',
    rating: 'R',
    durationMinutes: 108,
    posterUrl:
      'https://images.unsplash.com/photo-1489599162946-434b8dad6603?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'flm_5',
    title: 'The Laughing Fox',
    genre: 'Comedy',
    rating: 'PG',
    durationMinutes: 95,
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'flm_6',
    title: 'Whispers in the Deep',
    genre: 'Horror',
    rating: 'R',
    durationMinutes: 112,
    posterUrl:
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop',
  },
]

export const GENRES = ['All', 'Sci-Fi', 'Thriller', 'Drama', 'Action', 'Comedy', 'Horror']
