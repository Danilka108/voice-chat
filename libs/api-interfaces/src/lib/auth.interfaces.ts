/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRes } from './base-res'
import { UserIdentificationData, UserAuthorizationData, UserInitProfileData, UserProfileData } from '@voice-chat/user-interfaces'

export interface AuthTelStepReq {
  tel: string
  userIdentificationData: UserIdentificationData
}

export interface AuthTelStepRes extends BaseRes {}

export interface AuthCodeStepReq {
  tel: string
  code: number
  userIdentificationData: UserIdentificationData
}

export interface AuthCodeStepRes
  extends BaseRes<UserInitProfileData | UserAuthorizationData> {}

export interface AuthInitProfileStepReq {
  tel: string
  userProfileData: UserProfileData
  userInitProfileData: UserInitProfileData
  userIdentificationData: UserIdentificationData
}

export interface AuthInitProfileStepRes extends BaseRes<UserAuthorizationData> {}

export interface AuthRefreshSessionReq {
  userIdentificationData: UserIdentificationData
  userAuthorizationData: UserAuthorizationData
}

export interface AuthRefreshSessionRes extends BaseRes<UserAuthorizationData> {}
