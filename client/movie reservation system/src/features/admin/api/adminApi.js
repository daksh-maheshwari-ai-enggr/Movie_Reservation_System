import apiClient from '../../../services/apiClient'

export async function createMovie(movieData) {
  const response = await apiClient.post('/movies', movieData)
  return response.data
}

export async function getMovies() {
  const response = await apiClient.get('/movies')
  return response.data
}

export async function getMovieById(id) {
  const response = await apiClient.get(`/movies/${id}`)
  return response.data
}

export async function updateMovie(id, movieData) {
  const response = await apiClient.put(`/movies/${id}`, movieData)
  return response.data
}

export async function deleteMovie(id) {
  const response = await apiClient.delete(`/movies/${id}`)
  return response.data
}

export async function createTheater(theaterData) {
  const response = await apiClient.post('/theaters', theaterData)
  return response.data
}

export async function getTheaters() {
  const response = await apiClient.get('/theaters')
  return response.data
}

export async function updateTheater(id, theaterData) {
  const response = await apiClient.put(`/theaters/${id}`, theaterData)
  return response.data
}

export async function deleteTheater(id) {
  const response = await apiClient.delete(`/theaters/${id}`)
  return response.data
}

export async function createShowtime(showtimeData) {
  const response = await apiClient.post('/showtimes', showtimeData)
  return response.data
}

export async function getShowtimes() {
  const response = await apiClient.get('/showtimes')
  return response.data
}

export async function getShowtimeById(id) {
  const response = await apiClient.get(`/showtimes/${id}`)
  return response.data
}

export async function updateShowtime(id, showtimeData) {
  const response = await apiClient.put(`/showtimes/${id}`, showtimeData)
  return response.data
}

export async function deleteShowtime(id) {
  const response = await apiClient.delete(`/showtimes/${id}`)
  return response.data
}