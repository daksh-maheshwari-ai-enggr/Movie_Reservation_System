import Avatar from './Avatar.jsx'
import Badge from '../../../components/shared/Badge.jsx'

function ProfileHeader({ profile }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
      <Avatar name={profile.name} imageUrl={profile.avatarUrl} size="lg" />
      <div>
        <h2 className="font-display text-2xl font-semibold text-cine-text">{profile.name}</h2>
        <p className="mt-1 text-sm text-cine-muted">{profile.email}</p>
        <Badge variant="gold" className="mt-3">
          {profile.role}
        </Badge>
      </div>
    </div>
  )
}

export default ProfileHeader
