import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../../layouts/AuthLayout.jsx'
import SegmentedToggle from '../../../components/shared/SegmentedToggle.jsx'
import InputField from '../../../components/shared/InputField.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import { TextLink } from '../../../components/shared/SecondaryButton.jsx'
import { useAuth } from '../../../context/useAuth.js'

/**
 * FRONTEND UI ONLY. See SignIn.jsx for the Module 1 integration note —
 * the same applies here: handleRegister() is a mock that validates the
 * form shape and redirects, ready to be swapped for a real signup call.
 */
function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  // TODO(Module 1): replace with real registration (API call, password
  // hashing happens server-side, duplicate-email handling, etc).
  const handleRegister = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.password.length < 6) nextErrors.password = 'Use at least 6 characters.'
    if (form.confirm !== form.password) nextErrors.confirm = 'Passwords do not match.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    setTimeout(() => {
      login({ name: form.name, email: form.email, role: 'Member' })
      setLoading(false)
      navigate('/dashboard')
    }, 400)
  }

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-semibold text-cine-text">Create Account</h1>

      <div className="mt-6">
        <SegmentedToggle
          value="register"
          onChange={(val) => val === 'sign-in' && navigate('/sign-in')}
          options={[
            { value: 'sign-in', label: 'Sign In' },
            { value: 'register', label: 'Register' },
          ]}
        />
      </div>

      <form onSubmit={handleRegister} className="mt-6 space-y-5">
        <InputField
          id="name"
          label="Full Name"
          value={form.name}
          onChange={update('name')}
          placeholder="Alex Rivera"
          error={errors.name}
          required
        />
        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={update('email')}
          placeholder="your@email.com"
          error={errors.email}
          required
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={update('password')}
          placeholder="••••••••"
          error={errors.password}
          required
        />
        <InputField
          id="confirm"
          label="Confirm Password"
          type="password"
          value={form.confirm}
          onChange={update('confirm')}
          placeholder="••••••••"
          error={errors.confirm}
          required
        />

        <PrimaryButton type="submit" fullWidth loading={loading}>
          Create Account
        </PrimaryButton>

        <div className="text-center">
          <TextLink onClick={() => navigate('/')}>Cancel</TextLink>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Register
