import apiClient from '../../../services/apiClient'

export async function createMovie(movieData) {
  const response = await apiClient.post('/movies', movieData)
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
