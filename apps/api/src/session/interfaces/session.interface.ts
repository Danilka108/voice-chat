export interface CacheSession {
  id: number
  os: string
  browser: string
  ip: string
}

export interface CacheSessionValue {
  refreshToken: string
}
