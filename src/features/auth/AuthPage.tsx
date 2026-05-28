import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { AuthForm } from './AuthForm'
import { BackendAuthCheck } from './BackendAuthCheck'
import { useSignOutMutation } from './hooks/auth'

export function AuthPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [authMessage, setAuthMessage] = useState('')

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
      setAuthMessage('')
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOutMutation = useSignOutMutation({ onMessageChange: setAuthMessage })

  return (
    <main className="app-shell">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="section-heading">
          <p>Nooler</p>
          <h1 id="auth-title">AI workspace auth check</h1>
        </div>

        {session ? (
          <div className="stack">
            <Card>
              <CardHeader>
                <CardTitle>Supabase session</CardTitle>
              </CardHeader>
              <CardContent>
                <strong>{session.user.email}</strong>
              </CardContent>
            </Card>

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

        {authMessage ? (
          <Alert>
            <AlertTitle>Status</AlertTitle>
            <AlertDescription>{authMessage}</AlertDescription>
          </Alert>
        ) : null}
      </section>

      <BackendAuthCheck session={session} />
    </main>
  )
}
