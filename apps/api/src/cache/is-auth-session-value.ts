import { CacheAuthSessionValue } from './interfaces/auth-session.interface'

export const isAuthSessionValue = (
  data: unknown
): data is CacheAuthSessionValue => {
  return (
    !!(data as CacheAuthSessionValue)?.code &&
    !!(data as CacheAuthSessionValue)?.createdAt
  )
}
