import { UserIdentificationData } from '@voice-chat/user-interfaces'

export interface CacheInitProfile {
  tel: string
  userIdentificationData: UserIdentificationData
}

export interface CacheInitProfileValue {
  initProfileToken: string
}
