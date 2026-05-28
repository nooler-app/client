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

export function useSignInMutation(options?: {
  onError?: (error: Error) => void
  onSuccess?: () => void
}) {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => signInWithPassword(credentials),
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  })
}

export function useSignUpMutation(options?: {
  onError?: (error: Error) => void
  onSuccess?: () => void
}) {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => signUpWithPassword(credentials),
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  })
}

export function useSignOutMutation(options?: {
  onError?: (error: Error) => void
  onSuccess?: () => void
}) {
  return useMutation({
    mutationFn: signOut,
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  })
}
