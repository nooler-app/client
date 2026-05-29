import type { Session } from '@supabase/supabase-js'
import { Bot, LogOut, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BackendAuthCheck } from '@/features/auth/BackendAuthCheck'
import { useSignOutMutation } from '@/features/auth/hooks/auth'

type HomePageProps = {
  session: Session
}

export function HomePage({ session }: HomePageProps) {
  const signOutMutation = useSignOutMutation()

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
      <div className="mx-auto grid w-full max-w-5xl gap-6">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-slate-950 text-white">
              <Bot size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="m-0 text-sm font-medium text-slate-500">Nooler</p>
              <h1 className="m-0 text-xl font-semibold tracking-tight">Workspace</h1>
            </div>
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
        </header>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Your account is signed in and ready for the next workspace features.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
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

            <BackendAuthCheck session={session} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
