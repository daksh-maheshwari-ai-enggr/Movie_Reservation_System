import apiClient from '../../../services/apiClient'

// These functions are ready to use after you create matching Express routes.
export async function createFilm(filmData) {
  const response = await apiClient.post('/films', filmData)
  return response.data
}

export async function createTheater(theaterData) {
  const response = await apiClient.post('/theaters', theaterData)
  return response.data
}

export async function createShowtime(showtimeData) {
  const response = await apiClient.post('/showtimes', showtimeData)
  return response.data
}
