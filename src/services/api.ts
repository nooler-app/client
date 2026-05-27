import { env } from '../lib/env'

export type CurrentUser = {
  id: string
  email: string | null
  role: string | null
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
