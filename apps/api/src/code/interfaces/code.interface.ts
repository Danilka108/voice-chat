import { UserIdentificationData } from '@voice-chat/api-interfaces'

export interface CacheCode {
  tel: string
  userIdentificationData: UserIdentificationData
}

export interface CacheCodeValue {
  code: number
  createdAt: number
}
