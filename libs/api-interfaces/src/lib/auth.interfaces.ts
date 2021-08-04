/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRes } from './base-res'

export interface UserIdentificationData {
  browser: string
  os: string
}

export interface UserAuthorizationData {
  accessToken: string
  refreshToken: string
}

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
  extends BaseRes<
    | {
        initProfileToken: string
      }
    | UserAuthorizationData
  > {}

export interface AuthInitProfileStepReq {
  tel: string
  name: string
  initProfileToken: string
  userIdentificationData: UserIdentificationData
}

export interface AuthInitProfileStepRes extends BaseRes<UserAuthorizationData> {}

export interface AuthRefreshSessionReq {
  userIdentificationData: UserIdentificationData
  userAuthorizationData: UserAuthorizationData
}

export interface AuthRefreshSessionRes extends BaseRes<UserAuthorizationData> {}
