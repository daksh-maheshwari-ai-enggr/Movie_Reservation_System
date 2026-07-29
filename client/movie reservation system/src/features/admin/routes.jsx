import { Route } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

// TODO(Module 1 / access control): wrap in an <AdminRoute> guard once real
// auth + roles exist, redirecting non-admins away.
export const adminRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/admin" element={<AdminDashboard />} />
  </Route>
)
