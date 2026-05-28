import type { Session } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  getCurrentUser,
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from '../api/auth'
import type { AuthCredentials } from '../types/auth'

export function useCurrentUserQuery(session: Session | null) {
  return useQuery({
    queryKey: ['current-user', session?.access_token],
    queryFn: () => getCurrentUser(session?.access_token ?? ''),
    enabled: Boolean(session?.access_token),
  })
}

type AuthMutationOptions = {
  onMessageChange: (message: string) => void
  onPasswordReset?: () => void
}

export function useSignInMutation({
  onMessageChange,
  onPasswordReset,
}: AuthMutationOptions) {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => signInWithPassword(credentials),
    onError: (error) => {
      onMessageChange(error.message)
    },
    onSuccess: () => {
      onMessageChange('Signed in successfully.')
      onPasswordReset?.()
    },
  })
}

export function useSignUpMutation({
  onMessageChange,
  onPasswordReset,
}: AuthMutationOptions) {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => signUpWithPassword(credentials),
    onError: (error) => {
      onMessageChange(error.message)
    },
    onSuccess: () => {
      onMessageChange('Account created. Check your email if confirmation is enabled.')
      onPasswordReset?.()
    },
  })
}

export function useSignOutMutation({
  onMessageChange,
}: Pick<AuthMutationOptions, 'onMessageChange'>) {
  return useMutation({
    mutationFn: signOut,
    onError: (error) => {
      onMessageChange(error.message)
    },
    onSuccess: () => {
      onMessageChange('Signed out.')
    },
  })
}
