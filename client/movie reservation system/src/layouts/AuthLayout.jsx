import Logo from '../components/shared/Logo.jsx'

/**
 * Reproduces the Sign In modal's composition: centered card on the dark
 * base background, serif title, generous card padding, same border/radius
 * language as every other CinéVault surface.
 */
function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cine-bg px-6 py-16">
      <div className="mb-8">
        <Logo className="text-2xl" />
      </div>
      <div className="w-full max-w-md rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-8 sm:p-10">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
