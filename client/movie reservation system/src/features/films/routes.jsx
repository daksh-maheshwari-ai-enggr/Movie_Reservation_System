import { Route } from 'react-router-dom'
import PublicLayout from '../../layouts/PublicLayout.jsx'
import Home from './pages/Home.jsx'

export const filmsRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
  </Route>
)
