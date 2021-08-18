import { isUserIdentificationData } from '@voice-chat/user-interfaces'
import { CacheSession } from '../interfaces/session.interface'

export const isCacheSession = (data: unknown): data is CacheSession => {
  const d = data as CacheSession

  return (
    d.id !== undefined &&
    d.userIdentificationData !== undefined &&
    isUserIdentificationData(d.userIdentificationData)
  )
}
