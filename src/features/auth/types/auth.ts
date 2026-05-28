export type AuthCredentials = {
  email: string
  password: string
}

export type CurrentUser = {
  id: string
  email: string | null
  role: string | null
}
