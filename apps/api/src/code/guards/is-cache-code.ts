import { isUserIdentificationData } from '@voice-chat/api-interfaces'
import { CacheCode } from '../interfaces/code.interface'

export const isCacheCode = (data: unknown): data is CacheCode => {
  const d = data as CacheCode

  return (
    d.tel !== undefined &&
    d.userIdentificationData !== undefined &&
    isUserIdentificationData(d.userIdentificationData)
  )
}
