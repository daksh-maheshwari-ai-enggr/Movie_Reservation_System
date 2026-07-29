import { Routes } from 'react-router-dom'
import { authRoutes } from './features/auth/routes.jsx'
import { userRoutes } from './features/user/routes.jsx'
import { filmsRoutes } from './features/films/routes.jsx'
import { adminRoutes } from './features/admin/routes.jsx'

function App() {
  return (
    <Routes>
      {filmsRoutes}
      {authRoutes}
      {userRoutes}
      {adminRoutes}
    </Routes>
  )
}

export default App
