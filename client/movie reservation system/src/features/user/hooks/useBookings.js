import { useCallback, useEffect, useState } from 'react'
import { getBookings } from '../services/userService.js'

export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const data = await getBookings()
        if (!cancelled) setBookings(data)
      } catch {
        if (!cancelled) setError('Could not load your bookings. Please try again.')
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

  return { bookings, loading, error, reload: load }
}
