import { env } from '@/lib/env'
import { supabase } from '@/lib/supabase'
import type { AuthCredentials, CurrentUser } from '../types/auth'

export async function signInWithPassword({
  email,
  password,
}: AuthCredentials): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }
}

export async function signUpWithPassword({
  email,
  password,
}: AuthCredentials): Promise<void> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function getCurrentUser(accessToken: string): Promise<CurrentUser> {
  const response = await fetch(`${env.apiBaseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Backend auth check failed with ${response.status}`)
  }

  return response.json()
}
