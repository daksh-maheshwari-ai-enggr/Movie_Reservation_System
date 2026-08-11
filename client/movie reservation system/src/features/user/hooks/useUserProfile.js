import { useCallback, useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../services/userService.js'

export function useUserProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const data = await getProfile()
        if (!cancelled) setProfile(data)
      } catch {
        if (!cancelled) setError('Could not load your profile. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [reloadToken])

  const load = useCallback(() => setReloadToken((t) => t + 1), [])

  const save = useCallback(async (updates) => {
    setSaving(true)
    setError(null)
    try {
      const data = await updateProfile(updates)
      setProfile(data)
      return { ok: true }
    } catch {
      setError('Could not save your changes. Please try again.')
      return { ok: false }
    } finally {
      setSaving(false)
    }
  }, [])

  return { profile, loading, error, saving, save, reload: load }
}
