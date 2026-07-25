import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../../../components/shared/SectionHeader.jsx'
import InputField from '../../../components/shared/InputField.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import { SecondaryButton } from '../../../components/shared/SecondaryButton.jsx'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner.jsx'
import { useUserProfile } from '../hooks/useUserProfile.js'

/*
 * Reused patterns: SectionHeader, InputField (identical to Sign In / Add
 * Film modal inputs — uppercase labels, same border/radius), two-column
 * field grid mirroring the Add Film modal's Genre/Rating row, PrimaryButton
 * for Save + SecondaryButton-style Cancel.
 */
function EditProfile() {
  const { profile, loading, saving, save } = useUserProfile()
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Your Account" title="Edit Profile" />

      {loading || !profile ? (
        <LoadingSpinner label="Loading your profile…" />
      ) : (
        // key={profile.id} gives the form fresh, correctly-initialized local
        // state from `profile` without syncing it in via a useEffect.
        <ProfileForm
          key={profile.id}
          profile={profile}
          saving={saving}
          onSave={save}
          onCancel={() => navigate('/profile')}
        />
      )}
    </div>
  )
}

function ProfileForm({ profile, saving, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setSaved(false)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    const result = await onSave(form)
    if (result.ok) setSaved(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6 rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-6 sm:p-8"
    >
      <InputField
        id="name"
        label="Full Name"
        value={form.name}
        onChange={update('name')}
        error={errors.name}
        required
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          required
        />
        <InputField
          id="phone"
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={update('phone')}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <InputField
        id="address"
        label="Address"
        as="textarea"
        rows={3}
        value={form.address}
        onChange={update('address')}
        placeholder="City, State"
      />

      {saved && <p className="text-sm text-cine-success">Your profile has been updated.</p>}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        <PrimaryButton type="submit" loading={saving}>
          Save Changes
        </PrimaryButton>
      </div>
    </form>
  )
}

export default EditProfile
