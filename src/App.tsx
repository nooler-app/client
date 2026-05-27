import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/react-query'

import './App.css'
import { getCurrentUser } from './services/api'
import { supabase } from './lib/supabase'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const currentUserQuery = useQuery({
    queryKey: ['current-user', session?.access_token],
    queryFn: () => getCurrentUser(session?.access_token ?? ''),
    enabled: Boolean(session?.access_token),
  })

  const signInMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      setAuthMessage('Signed in successfully.')
      setPassword('')
    },
    onError: (error) => {
      setAuthMessage(error.message)
    },
  })

  const signUpMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      setAuthMessage('Account created. Check your email if confirmation is enabled.')
      setPassword('')
    },
    onError: (error) => {
      setAuthMessage(error.message)
    },
  })

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
            <div className="status-card success">
              <span>Supabase session</span>
              <strong>{session.user.email}</strong>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() => signOutMutation.mutate()}
              disabled={signOutMutation.isPending}
            >
              {signOutMutation.isPending ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        ) : (
          <form
            className="stack"
            onSubmit={(event) => {
              event.preventDefault()
              signInMutation.mutate()
            }}
          >
            <label>
              Email
              <input
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label>
              Password
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your Supabase password"
                required
                type="password"
                value={password}
              />
            </label>

            <button
              type="submit"
              className="primary-button"
              disabled={signInMutation.isPending || signUpMutation.isPending}
            >
              {signInMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>

            <button
              type="button"
              className="secondary-button"
              disabled={signInMutation.isPending || signUpMutation.isPending}
              onClick={() => signUpMutation.mutate()}
            >
              {signUpMutation.isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        )}

        {authMessage ? <p className="message">{authMessage}</p> : null}
      </section>

      <section className="auth-panel" aria-labelledby="backend-title">
        <div className="section-heading">
          <p>Backend</p>
          <h2 id="backend-title">/auth/me verification</h2>
        </div>

        {!session ? (
          <p className="muted">Sign in to call the protected backend route.</p>
        ) : currentUserQuery.isLoading ? (
          <p className="muted">Checking backend session...</p>
        ) : currentUserQuery.isError ? (
          <div className="status-card error">
            <span>Verification failed</span>
            <strong>{currentUserQuery.error.message}</strong>
          </div>
        ) : currentUserQuery.data ? (
          <div className="stack">
            <div className="status-card success">
              <span>Backend verified user</span>
              <strong>{currentUserQuery.data.email ?? currentUserQuery.data.id}</strong>
            </div>
            <pre>{JSON.stringify(currentUserQuery.data, null, 2)}</pre>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App
