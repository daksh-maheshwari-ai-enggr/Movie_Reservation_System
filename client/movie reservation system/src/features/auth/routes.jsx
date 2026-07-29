import { Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import Register from './pages/Register.jsx'

// FRONTEND UI ONLY — placeholder routes so Module 2 can be demoed.
// TODO(Module 1): replace this file's contents with the real auth module
// (protected-route wrapper, session context, etc). Keeping auth routes in
// their own file/array keeps this swap a one-file change.
export const authRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/register" element={<Register />} />
  </>
)
