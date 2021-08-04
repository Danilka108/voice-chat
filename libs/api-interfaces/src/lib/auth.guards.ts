import { UserAuthorizationData, UserIdentificationData } from './auth.interfaces'

export const isUserIdentificationData = (data: unknown): data is UserIdentificationData => {
  const d = data as UserIdentificationData
  return d.browser !== undefined && d.os !== undefined
}

export const isUserAuthorizationData = (data: unknown): data is UserAuthorizationData => {
  const d = data as UserAuthorizationData

  return d.accessToken !== undefined && d.refreshToken !== undefined
}
