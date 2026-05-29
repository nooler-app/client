import { useState } from 'react'
import { LogIn, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSignInMutation, useSignUpMutation } from './hooks/auth'

type AuthFormProps = {
  onMessageChange: (message: string) => void
}

export function AuthForm({ onMessageChange }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signInMutation = useSignInMutation({
    onMessageChange,
    onPasswordReset: () => setPassword(''),
  })

  const signUpMutation = useSignUpMutation({
    onMessageChange,
    onPasswordReset: () => setPassword(''),
  })

  const authIsPending = signInMutation.isPending || signUpMutation.isPending

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault()
        signInMutation.mutate({ email, password })
      }}
    >
      <div className="field-stack">
        <Label htmlFor="email">Email</Label>
        <Input
          autoComplete="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="field-stack">
        <Label htmlFor="password">Password</Label>
        <Input
          autoComplete="current-password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your Supabase password"
          required
          type="password"
          value={password}
        />
      </div>

      <div className="auth-actions">
        <Button type="submit" disabled={authIsPending} size="lg">
          <LogIn aria-hidden="true" />
          {signInMutation.isPending ? 'Signing in...' : 'Sign in'}
        </Button>

        <Button
          type="button"
          disabled={authIsPending}
          onClick={() => signUpMutation.mutate({ email, password })}
          size="lg"
          variant="secondary"
        >
          <UserPlus aria-hidden="true" />
          {signUpMutation.isPending ? 'Creating...' : 'Create account'}
        </Button>
      </div>
    </form>
  )
}
