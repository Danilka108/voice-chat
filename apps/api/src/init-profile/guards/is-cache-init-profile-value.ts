import { CacheInitProfileValue } from '../interfaces/init-profile.interface'

export const isCacheInitProfileValue = (data: unknown): data is CacheInitProfileValue => {
  const d = data as CacheInitProfileValue

  return d.initProfileToken !== undefined
}
