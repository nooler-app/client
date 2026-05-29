import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import {
  Bot,
  BrainCircuit,
  CalendarCheck,
  FileText,
  LogOut,
  Mail,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

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

  const signOutMutation = useSignOutMutation({ onMessageChange: setAuthMessage })

  return (
    <main className="app-shell">
      <div className="auth-layout">
        <section className="brand-panel" aria-labelledby="brand-title">
          <div className="brand-topbar">
            <div className="brand-mark">
              <span className="brand-glyph">
                <Bot size={18} aria-hidden="true" />
              </span>
              <span>Nooler</span>
            </div>

            <span className="edition-pill">Agent OS</span>
          </div>

          <div className="brand-copy">
            <div className="eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              Private beta workspace
            </div>
            <h1 id="brand-title">Your AI workspace for thinking and doing.</h1>
            <p>
              Bring conversations, documents, research, email, and calendar actions into
              one agent-powered workspace.
            </p>

            <div className="tool-strip" aria-label="Planned Nooler tools">
              <span className="tool-pill">
                <Mail size={15} aria-hidden="true" />
                Email
              </span>
              <span className="tool-pill">
                <CalendarCheck size={15} aria-hidden="true" />
                Calendar
              </span>
              <span className="tool-pill">
                <Search size={15} aria-hidden="true" />
                Research
              </span>
              <span className="tool-pill">
                <FileText size={15} aria-hidden="true" />
                Documents
              </span>
            </div>
          </div>

          <div className="agent-visual" aria-hidden="true">
            <div className="agent-card agent-card-main">
              <div className="agent-card-header">
                <span className="agent-icon">
                  <BrainCircuit size={16} />
                </span>
                <span>Planner</span>
              </div>
              <div className="agent-lines">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="agent-card agent-card-side">
              <div className="agent-card-header">
                <span className="agent-icon">
                  <MessageSquareText size={16} />
                </span>
                <span>Conversation</span>
              </div>
              <div className="agent-meter">
                <span />
              </div>
            </div>

            <div className="agent-node node-one" />
            <div className="agent-node node-two" />
            <div className="agent-node node-three" />
          </div>
        </section>

        <section className="auth-content" aria-labelledby="auth-title">
          <Card className="auth-card">
            <CardHeader>
              <CardTitle id="auth-title">
                {session ? 'Workspace access!!!' : 'Sign in to Nooler'}
              </CardTitle>
              <CardDescription>
                {session
                  ? 'Your Supabase session is active and ready for backend requests.'
                  : 'Use your project account to continue into the AI workspace.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="card-stack">
              {session ? (
                <div className="signed-in-card">
                  <div className="user-row">
                    <div className="user-identity">
                      <p className="muted">Signed in as</p>
                      <strong>{session.user.email}</strong>
                    </div>
                    <span className="status-badge">
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
      </div>
    </main>
  )
}
