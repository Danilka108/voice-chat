/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRes } from './base-res'

export interface AuthTelReq {
  tel: string
  browser: string
  os: string
}

export interface AuthCodeReq {
  code: number
  browser: string
  os: string
}

export interface AuthRefreshTokenReq {
  userID: number
  refreshToken: string
  browser: string
  os: string
}

export interface AuthTelRes extends BaseRes {}

export interface AuthCodeRes
  extends BaseRes<{
    userID: number
    accessToken: string
    refreshToken: string
  }> {}

export interface AuthRefreshTokenRes
  extends BaseRes<{
    userID: number
    accessToken: string
    refreshToken: string
  }> {}
