import { UserIdentificationData } from '@voice-chat/user-interfaces'

export interface CacheSession {
  id: number
  userIdentificationData: UserIdentificationData
}

export interface CacheSessionValue {
  refreshToken: string
}
