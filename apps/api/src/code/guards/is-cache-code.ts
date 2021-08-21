import { isUserIdentificationData } from '@voice-chat/user-interfaces'
import { CacheCode } from '../interfaces'

export const isCacheCode = (data: unknown): data is CacheCode => {
  const d = data as CacheCode

  return (
    d.tel !== undefined &&
    d.userIdentificationData !== undefined &&
    isUserIdentificationData(d.userIdentificationData)
  )
}
