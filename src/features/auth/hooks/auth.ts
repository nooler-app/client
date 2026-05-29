import type { Session } from '@supabase/supabase-js'
import { useMutation, useQuery, type UseMutationOptions } from '@tanstack/react-query'

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

type AuthMutationOptions = UseMutationOptions<void, Error, AuthCredentials>

export function useSignInMutation(options?: AuthMutationOptions) {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => signInWithPassword(credentials),
    ...options,
  })
}

export function useSignUpMutation(options?: AuthMutationOptions) {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => signUpWithPassword(credentials),
    ...options,
  })
}

export function useSignOutMutation(options?: UseMutationOptions<void, Error, void>) {
  return useMutation({
    mutationFn: signOut,
    ...options,
  })
}
