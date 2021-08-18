import { UserIdentificationData } from '@voice-chat/user-interfaces'

export interface CacheCode {
  tel: string
  userIdentificationData: UserIdentificationData
}

export interface CacheCodeValue {
  code: number
  createdAt: number
}
