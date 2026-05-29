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
    <section
      className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3.5 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-teal-500"
      aria-labelledby="backend-title"
    >
      {!session ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="m-0 text-[13px] leading-normal text-slate-500">
              Backend verification
            </p>
            <strong id="backend-title" className="text-sm text-slate-950">
              Waiting for sign in
            </strong>
          </div>
          <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700">
            <Server size={14} aria-hidden="true" />
            Idle
          </span>
        </div>
      ) : currentUserQuery.isLoading ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="m-0 text-[13px] leading-normal text-slate-500">
              Backend verification
            </p>
            <strong id="backend-title" className="text-sm text-slate-950">
              Checking session
            </strong>
          </div>
          <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700">
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
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="m-0 text-[13px] leading-normal text-slate-500">
                Backend verified
              </p>
              <strong id="backend-title" className="break-words text-sm text-slate-950">
                {currentUserQuery.data.email ?? currentUserQuery.data.id}
              </strong>
            </div>
            <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700">
              <ShieldCheck size={14} aria-hidden="true" />
              Secured
            </span>
          </div>
          <pre className="mt-3 max-h-44 max-w-full overflow-auto rounded-lg border border-slate-200 bg-white p-3 text-xs leading-normal text-slate-700">
            {JSON.stringify(currentUserQuery.data, null, 2)}
          </pre>
        </div>
      ) : null}
    </section>
  )
}
