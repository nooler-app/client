import { useState } from 'react'

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
    onSuccess: () => {
      onMessageChange('Signed in successfully.')
      setPassword('')
    },
    onError: (error) => {
      onMessageChange(error.message)
    },
  })

  const signUpMutation = useSignUpMutation({
    onSuccess: () => {
      onMessageChange('Account created. Check your email if confirmation is enabled.')
      setPassword('')
    },
    onError: (error) => {
      onMessageChange(error.message)
    },
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

      <Button type="submit" disabled={authIsPending} size="lg">
        {signInMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>

      <Button
        type="button"
        disabled={authIsPending}
        onClick={() => signUpMutation.mutate({ email, password })}
        size="lg"
        variant="secondary"
      >
        {signUpMutation.isPending ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}
