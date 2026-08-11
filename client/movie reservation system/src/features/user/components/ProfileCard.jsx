function Field({ label, value }) {
  return (
    <div>
      <p className="cine-label mb-1.5">{label}</p>
      <p className="text-sm text-cine-text">{value || '—'}</p>
    </div>
  )
}

function ProfileCard({ profile }) {
  const joined = profile.joinedDate
    ? new Date(profile.joinedDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : '—'

  return (
    <div className="rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full Name" value={profile.name} />
        <Field label="Email Address" value={profile.email} />
        <Field label="Phone Number" value={profile.phone} />
        <Field label="Address" value={profile.address} />
        <Field label="Role" value={profile.role} />
        <Field label="Joined" value={joined} />
      </div>
    </div>
  )
}

export default ProfileCard
