import { mockProfile, mockBookings } from '../mock/userMockData.js'

const LATENCY_MS = 350

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS))
}

// TODO(backend): replace the body of each function with a real fetch to the
// listed endpoint. The function signatures/return shapes are designed to
// stay the same so callers (hooks) don't need to change.

/** GET /api/users/profile */
export async function getProfile() {
  return delay({ ...mockProfile })
}

/** PUT /api/users/profile */
export async function updateProfile(updates) {
  Object.assign(mockProfile, updates)
  return delay({ ...mockProfile })
}

/** GET /api/users/bookings */
export async function getBookings() {
  return delay([...mockBookings])
}
