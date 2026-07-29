import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import Badge from './Badge.jsx'
import PrimaryButton from './PrimaryButton.jsx'
import { useAuth } from '../../context/useAuth.js'

const navLinkClasses = ({ isActive }) =>
  `cine-focus rounded text-sm transition-colors duration-200 ${
    isActive ? 'text-cine-gold' : 'text-cine-muted hover:text-cine-text'
  }`

/**
 * Three states, matching the Figma exports exactly:
 *  - Logged out: logo, "Films", "Sign In" button (image 1)
 *  - Member: + "My Bookings", name/role stack, "Sign out" (image 6)
 *  - Admin: + "Admin" link, ADMIN badge (image 7)
 */
function Navbar() {
  const navigate = useNavigate()
   const { user, isAuthenticated, logout } = useAuth()

  const handleSignOut = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-cine-border bg-cine-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/" end className={navLinkClasses}>
              Films
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/bookings" className={navLinkClasses}>
                My Bookings
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink to="/profile" className={navLinkClasses}>
                Profile
              </NavLink>
            )}
            {user?.role === 'Admin' && (
              <NavLink to="/admin" className={navLinkClasses}>
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-cine-text">{user.name}</p>
              <p className="text-xs text-cine-muted">
                {user.role === 'Admin' ? 'Administrator' : 'Member'}
              </p>
            </div>
            {user.role === 'Admin' && <Badge variant="gold">ADMIN</Badge>}
            <button
              type="button"
              onClick={handleSignOut}
              className="cine-focus rounded text-sm text-cine-muted transition-colors duration-200 hover:text-cine-text"
            >
              Sign out
            </button>
          </div>
        ) : (
          <PrimaryButton onClick={() => navigate('/sign-in')}>Sign In</PrimaryButton>
        )}
      </div>
    </header>
  )
}

export default Navbar
