import type { Session } from '@supabase/supabase-js'
import { Server, ShieldAlert, ShieldCheck } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useCurrentUserQuery } from './hooks/auth'

type BackendAuthCheckProps = {
  session: Session | null
}

export function BackendAuthCheck({ session }: BackendAuthCheckProps) {
  const currentUserQuery = useCurrentUserQuery(session)

  return (
    <section className="backend-panel" aria-labelledby="backend-title">
      {!session ? (
        <div className="status-row">
          <div>
            <p className="muted">Backend verification</p>
            <strong id="backend-title">Waiting for sign in</strong>
          </div>
          <span className="status-badge">
            <Server size={14} aria-hidden="true" />
            Idle
          </span>
        </div>
      ) : currentUserQuery.isLoading ? (
        <div className="status-row">
          <div>
            <p className="muted">Backend verification</p>
            <strong id="backend-title">Checking session</strong>
          </div>
          <span className="status-badge">
            <Server size={14} aria-hidden="true" />
            Syncing
          </span>
        </div>
      ) : currentUserQuery.isError ? (
        <Alert variant="destructive">
          <ShieldAlert aria-hidden="true" />
          <AlertTitle id="backend-title">Verification failed</AlertTitle>
          <AlertDescription>{currentUserQuery.error.message}</AlertDescription>
        </Alert>
      ) : currentUserQuery.data ? (
        <div>
          <div className="status-row">
            <div>
              <p className="muted">Backend verified</p>
              <strong id="backend-title">
                {currentUserQuery.data.email ?? currentUserQuery.data.id}
              </strong>
            </div>
            <span className="status-badge">
              <ShieldCheck size={14} aria-hidden="true" />
              Secured
            </span>
          </div>
          <pre className="session-json">{JSON.stringify(currentUserQuery.data, null, 2)}</pre>
        </div>
      ) : null}
    </section>
  )
}
