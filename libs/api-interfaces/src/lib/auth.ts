/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRes } from './base-res'

export interface AuthTelReq {
  tel: string
  browser: string
  os: string
}

export interface AuthCodeReq {
  tel: string
  code: number
  browser: string
  os: string
  name?: string
}

export interface AuthRefreshSessionReq {
  accessToken: string
  refreshToken: string
  browser: string
  os: string
}

export interface AuthTelRes extends BaseRes {}

export interface AuthCodeRes
  extends BaseRes<{
    accessToken: string
    refreshToken: string
  }> {}

export interface AuthRefreshSessionRes
  extends BaseRes<{
    accessToken: string
    refreshToken: string
  }> {}
