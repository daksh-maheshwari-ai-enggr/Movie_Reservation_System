import axios from 'axios'

// Change this URL when your Express server is running somewhere else.
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
})

export default apiClient
