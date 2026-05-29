import { useState } from 'react'
import { Bot } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthForm } from './AuthForm'

export function AuthPage() {
  const [authMessage, setAuthMessage] = useState('')

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
            <CardTitle id="auth-title">Sign in to Nooler</CardTitle>
            <CardDescription>
              Use your project account to continue into the AI workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <AuthForm onMessageChange={setAuthMessage} />

            {authMessage ? (
              <Alert>
                <AlertTitle>Status</AlertTitle>
                <AlertDescription>{authMessage}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
