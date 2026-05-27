import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'

import { Button } from '../../components/Button'
import { StatusCard } from '../../components/StatusCard'
import { supabase } from '../../lib/supabase'
import { AuthForm } from './AuthForm'
import { BackendAuthCheck } from './BackendAuthCheck'

export function AuthPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [authMessage, setAuthMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setAuthMessage('')
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      setAuthMessage('Signed out.')
    },
    onError: (error) => {
      setAuthMessage(error.message)
    },
  })

  return (
    <main className="app-shell">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="section-heading">
          <p>Nooler</p>
          <h1 id="auth-title">AI workspace auth check</h1>
        </div>

        {session ? (
          <div className="stack">
            <StatusCard label="Supabase session">{session.user.email}</StatusCard>

            <Button
              type="button"
              onClick={() => signOutMutation.mutate()}
              disabled={signOutMutation.isPending}
              variant="secondary"
            >
              {signOutMutation.isPending ? 'Signing out...' : 'Sign out'}
            </Button>
          </div>
        ) : (
          <AuthForm onMessageChange={setAuthMessage} />
        )}

        {authMessage ? <p className="message">{authMessage}</p> : null}
      </section>

      <BackendAuthCheck session={session} />
    </main>
  )
}

