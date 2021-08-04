import { UserIdentificationData } from '@voice-chat/api-interfaces'

export interface CacheInitProfile {
  tel: string
  userIdentificationData: UserIdentificationData
}

export interface CacheInitProfileValue {
  initProfileToken: string
}
