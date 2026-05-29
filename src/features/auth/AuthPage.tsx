import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Bot, LogOut, ShieldCheck } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

  const signOutMutation = useSignOutMutation({
    onError: (error) => {
      setAuthMessage(error.message)
    },
    onSuccess: () => {
      setAuthMessage('Signed out.')
    },
  })

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-900">
      <section className="grid w-full max-w-md gap-6" aria-labelledby="auth-title">
        <div className="grid gap-3 text-center">
          <div className="mx-auto grid size-11 place-items-center rounded-lg bg-slate-950 text-white">
            <Bot size={20} aria-hidden="true" />
          </div>
          <div className="grid gap-1">
            <p className="m-0 text-sm font-medium text-slate-500">Nooler</p>
            <h1 className="m-0 text-2xl font-semibold tracking-tight">
              AI workspace sign in
            </h1>
          </div>
          <p className="m-0 text-sm leading-6 text-slate-500">
            Access your conversations, tools, and workspace data.
          </p>
        </div>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle id="auth-title">
              {session ? 'Workspace access' : 'Sign in to Nooler'}
            </CardTitle>
            <CardDescription>
              {session
                ? 'Your Supabase session is active and ready for backend requests.'
                : 'Use your project account to continue into the AI workspace.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {session ? (
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="grid min-w-0 gap-0.5">
                    <p className="m-0 text-[13px] leading-normal text-slate-500">
                      Signed in as
                    </p>
                    <strong className="break-words text-sm text-slate-950">
                      {session.user.email}
                    </strong>
                  </div>
                  <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700">
                    <ShieldCheck size={14} aria-hidden="true" />
                    Active
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={() => signOutMutation.mutate()}
                  disabled={signOutMutation.isPending}
                  variant="secondary"
                >
                  <LogOut aria-hidden="true" />
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

            <BackendAuthCheck session={session} />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
