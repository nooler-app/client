import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

import { AuthPage } from '../features/auth/AuthPage'
import { HomePage } from '../features/home/HomePage'
import { supabase } from '../lib/supabase'

export function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  return session ? <HomePage session={session} /> : <AuthPage />
}
