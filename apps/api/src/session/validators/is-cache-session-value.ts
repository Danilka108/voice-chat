import { CacheSessionValue } from '../interfaces/session.interface'

export const isCacheSessionValue = (data: unknown): data is CacheSessionValue => {
  const cacheValue = data as CacheSessionValue

  return cacheValue?.refreshToken !== undefined
}
