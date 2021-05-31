export interface CacheAuthSession {
  id: number
  os: string
  browser: string
  ip: string
}

export interface CacheAuthSessionValue {
  refreshToken: string
}
