import { isUserIdentificationData } from '@voice-chat/user-interfaces'
import { CacheInitProfile } from '../interfaces/init-profile.interface'

export const isCacheInitProfile = (data: unknown): data is CacheInitProfile => {
  const d = data as CacheInitProfile

  return (
    d.tel !== undefined &&
    d.userIdentificationData !== undefined &&
    isUserIdentificationData(d.userIdentificationData)
  )
}
