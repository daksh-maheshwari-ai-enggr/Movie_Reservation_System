import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContextObject.js'
import { syncMockProfileIdentity } from '../features/user/mock/userMockData.js'

const SESSION_KEY = 'cinevault_demo_session'

/**
 * FRONTEND UI ONLY. This is NOT real authentication — no real tokens, no
 * password checks, no server-verified session. sessionStorage is used only
 * so the demo doesn't lose its "signed in" state on a page refresh; it is
 * NOT a substitute for a real auth token and holds no secrets.
 *
 * TODO(Module 1): replace this entire context with real auth — session
 * restored from a verified token/cookie on load, real login/register API
 * calls, and route protection. Keep the shape of `user` / `isAuthenticated`
 * the same if possible so consuming components (Navbar, route guards)
 * don't need to change.
 */
export function AuthProvider({ children }) {
  console.log("✅ AuthProvider mounted");
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
      else sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — demo session
      // simply won't survive a refresh; not a functional blocker.
    }
    // Re-sync on every user change, including the initial restore from
    // sessionStorage on reload (the mock profile module is a plain JS
    // object and does not itself survive a page reload).
    if (user) syncMockProfileIdentity(user)
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      // TODO(Module 1): replace with a real API call + token storage.
      login: (mockUser) => setUser(mockUser),
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
