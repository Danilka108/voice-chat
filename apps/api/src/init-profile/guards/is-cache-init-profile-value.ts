import { CacheInitProfileValue } from '../interfaces'

export const isCacheInitProfileValue = (
  data: unknown
): data is CacheInitProfileValue => {
  const d = data as CacheInitProfileValue

  return d.initProfileToken !== undefined
}
