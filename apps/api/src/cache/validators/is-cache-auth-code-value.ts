import { CacheAuthCodeValue } from '../interfaces/auth-code.interface'

export const isCacheAuthCodeValue = (
  data: unknown
): data is CacheAuthCodeValue => {
  return (
    (data as CacheAuthCodeValue)?.code !== undefined &&
    (data as CacheAuthCodeValue)?.createdAt !== undefined
  )
}
