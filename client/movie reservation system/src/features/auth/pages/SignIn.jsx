import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../../layouts/AuthLayout.jsx'
import SegmentedToggle from '../../../components/shared/SegmentedToggle.jsx'
import InputField from '../../../components/shared/InputField.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import { TextLink } from '../../../components/shared/SecondaryButton.jsx'
import { useAuth } from '../../../context/useAuth.js'

const DEMO_ACCOUNTS = [
  { label: 'Member — Alex Rivera', email: 'alex.rivera@cinevault.demo', name: 'Alex Rivera', role: 'Member' },
  { label: 'Admin — Morgan Adeyemi', email: 'morgan.adeyemi@cinevault.demo', name: 'Morgan Adeyemi', role: 'Admin' },
]

/**
 * FRONTEND UI ONLY — Module 2 scaffolding so the app can be demoed end to end.
 * Module 1 owns real authentication and should replace handleLogin() with an
 * actual API call / session write, keeping the JSX and mock-data hook points
 * (marked below) intact.
 */
function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // TODO(Module 1): replace with real authentication (API call, token storage,
  // error handling for invalid credentials). This mock simply validates the
  // field is non-empty, "logs in" as the matching demo account (or a generic
  // Member), and redirects to the Dashboard.
  const handleLogin = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      const match = DEMO_ACCOUNTS.find((acc) => acc.email === email)
      login(match ?? { name: 'Alex Rivera', email, role: 'Member' })
      setLoading(false)
      navigate('/dashboard')
    }, 400)
  }

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-semibold text-cine-text">Sign In</h1>

      <div className="mt-6">
        <SegmentedToggle
          value="sign-in"
          onChange={(val) => val === 'register' && navigate('/register')}
          options={[
            { value: 'sign-in', label: 'Sign In' },
            { value: 'register', label: 'Register' },
          ]}
        />
      </div>

      <form onSubmit={handleLogin} className="mt-6 space-y-5">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />

        <div className="rounded-[var(--radius-cine-input)] border border-cine-border bg-cine-surface-raised p-4">
          <p className="mb-3 text-xs font-medium text-cine-gold">
            Demo accounts — click to autofill:
          </p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => setEmail(account.email)}
                className="cine-focus block text-sm text-cine-muted transition-colors duration-200 hover:text-cine-text"
              >
                {account.label}
              </button>
            ))}
          </div>
        </div>

        <PrimaryButton type="submit" fullWidth loading={loading}>
          Sign In
        </PrimaryButton>

        <div className="text-center">
          <TextLink onClick={() => navigate('/')}>Cancel</TextLink>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignIn
