import type { Session } from '@supabase/supabase-js'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCurrentUserQuery } from './hooks/auth'

type BackendAuthCheckProps = {
  session: Session | null
}

export function BackendAuthCheck({ session }: BackendAuthCheckProps) {
  const currentUserQuery = useCurrentUserQuery(session)

  return (
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
        <Alert variant="destructive">
          <AlertTitle>Verification failed</AlertTitle>
          <AlertDescription>{currentUserQuery.error.message}</AlertDescription>
        </Alert>
      ) : currentUserQuery.data ? (
        <div className="stack">
          <Card>
            <CardHeader>
              <CardTitle>Backend verified user</CardTitle>
            </CardHeader>
            <CardContent>
              <strong>{currentUserQuery.data.email ?? currentUserQuery.data.id}</strong>
            </CardContent>
          </Card>
          <pre>{JSON.stringify(currentUserQuery.data, null, 2)}</pre>
        </div>
      ) : null}
    </section>
  )
}
