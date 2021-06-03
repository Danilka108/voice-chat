import { CacheAuthSessionValue } from '../interfaces/auth-session.interface'

export const isCacheAuthSessionValue = (data: unknown): data is CacheAuthSessionValue => {
  const cacheValue = data as CacheAuthSessionValue

  return cacheValue?.refreshToken !== undefined
}
