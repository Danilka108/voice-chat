import { UserIdentificationData } from '@voice-chat/api-interfaces'

export interface CacheSession {
  id: number
  userIdentificationData: UserIdentificationData
}

export interface CacheSessionValue {
  refreshToken: string
}
