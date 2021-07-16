import { CacheSession } from '../interfaces/session.interface'

export const isCacheSession = (data: unknown): data is CacheSession => {
  const d = data as CacheSession

  return (
    d.browser !== undefined && d.id !== undefined && d.ip !== undefined && d.os !== undefined
  )
}
