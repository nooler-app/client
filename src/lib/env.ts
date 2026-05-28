type ClientEnv = {
  apiBaseUrl: string
  supabaseAnonKey: string
  supabaseUrl: string
}

function readRequiredEnv(name: string): string {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

export const env: ClientEnv = {
  apiBaseUrl: readRequiredEnv('VITE_API_BASE_URL'),
  supabaseAnonKey: readRequiredEnv('VITE_SUPABASE_ANON_KEY'),
  supabaseUrl: readRequiredEnv('VITE_SUPABASE_URL'),
}
