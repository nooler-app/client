import type { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

import { StatusCard } from '../../components/StatusCard'
import { getCurrentUser } from '../../services/api'

type BackendAuthCheckProps = {
  session: Session | null
}

export function BackendAuthCheck({ session }: BackendAuthCheckProps) {
  const currentUserQuery = useQuery({
    queryKey: ['current-user', session?.access_token],
    queryFn: () => getCurrentUser(session?.access_token ?? ''),
    enabled: Boolean(session?.access_token),
  })

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
        <StatusCard label="Verification failed" tone="error">
          {currentUserQuery.error.message}
        </StatusCard>
      ) : currentUserQuery.data ? (
        <div className="stack">
          <StatusCard label="Backend verified user">
            {currentUserQuery.data.email ?? currentUserQuery.data.id}
          </StatusCard>
          <pre>{JSON.stringify(currentUserQuery.data, null, 2)}</pre>
        </div>
      ) : null}
    </section>
  )
}

