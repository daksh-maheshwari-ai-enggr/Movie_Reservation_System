import { useNavigate } from 'react-router-dom'
import SectionHeader from '../../../components/shared/SectionHeader.jsx'
import PrimaryButton from '../../../components/shared/PrimaryButton.jsx'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner.jsx'
import ProfileHeader from '../components/ProfileHeader.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import { useUserProfile } from '../hooks/useUserProfile.js'

/*
 * Reused patterns: SectionHeader, ProfileHeader (avatar + role badge, same
 * badge shape as Admin's "Administrator" pill), ProfileCard (surface card
 * using the repeated eyebrow-label field pattern), PrimaryButton.
 */
function ViewProfile() {
  const { profile, loading } = useUserProfile()
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Your Account"
        title="Profile"
        action={
          <PrimaryButton onClick={() => navigate('/profile/edit')}>Edit Profile</PrimaryButton>
        }
      />

      {loading || !profile ? (
        <LoadingSpinner label="Loading your profile…" />
      ) : (
        <div className="space-y-8">
          <ProfileHeader profile={profile} />
          <ProfileCard profile={profile} />
        </div>
      )}
    </div>
  )
}

export default ViewProfile
