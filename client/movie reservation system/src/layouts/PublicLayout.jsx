import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar.jsx'

/** Used for public pages (Films/Home) that need edge-to-edge hero sections. */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-cine-bg">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout
