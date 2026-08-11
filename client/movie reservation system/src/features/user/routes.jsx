import { Route } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ViewProfile from './pages/ViewProfile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import BookingHistory from './pages/BookingHistory.jsx'

// Module 2 (User Management) routes. All wrapped in MainLayout (Navbar + shell).
// TODO(Module 1): wrap this element tree in a <ProtectedRoute> once real auth
// exists, so unauthenticated users are redirected to /sign-in.
export const userRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<ViewProfile />} />
    <Route path="/profile/edit" element={<EditProfile />} />
    <Route path="/bookings" element={<BookingHistory />} />
  </Route>
)
