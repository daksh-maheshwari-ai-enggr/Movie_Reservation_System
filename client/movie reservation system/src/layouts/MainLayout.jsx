import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar.jsx'

function MainLayout() {
  return (
    <div className="min-h-screen bg-cine-bg">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
