import { CacheCodeValue } from '../interfaces/code.interface'

export const isCacheCodeValue = (data: unknown): data is CacheCodeValue => {
  return (
    (data as CacheCodeValue)?.code !== undefined &&
    (data as CacheCodeValue)?.createdAt !== undefined
  )
}
