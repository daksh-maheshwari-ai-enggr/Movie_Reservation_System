import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

/** GET /api/users/profile */
export async function getProfile() {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
}

/** PUT /api/users/profile */
export async function updateProfile(updates) {
  const response = await axios.put(`${API_URL}/profile`, updates);
  return response.data;
}

/** GET /api/users/bookings */
export async function getBookings() {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
}
