import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { Button } from '../../components/Button'
import { Field } from '../../components/Field'
import { supabase } from '../../lib/supabase'

type AuthFormProps = {
  onMessageChange: (message: string) => void
}

export function AuthForm({ onMessageChange }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signInMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      onMessageChange('Signed in successfully.')
      setPassword('')
    },
    onError: (error) => {
      onMessageChange(error.message)
    },
  })

  const signUpMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw error
      }
    },
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
        signInMutation.mutate()
      }}
    >
      <Field
        autoComplete="email"
        label="Email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        type="email"
        value={email}
      />

      <Field
        autoComplete="current-password"
        label="Password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Your Supabase password"
        required
        type="password"
        value={password}
      />

      <Button type="submit" disabled={authIsPending}>
        {signInMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>

      <Button
        type="button"
        disabled={authIsPending}
        onClick={() => signUpMutation.mutate()}
        variant="secondary"
      >
        {signUpMutation.isPending ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}

