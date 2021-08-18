import {
  UserAuthorizationData,
  UserIdentificationData,
  UserProfileData,
  UserInitProfileData,
} from './user.interfaces'

export const isUserIdentificationData = (data: unknown): data is UserIdentificationData => {
  const d = data as UserIdentificationData
  return d.browser !== undefined && d.os !== undefined
}

export const isUserAuthorizationData = (data: unknown): data is UserAuthorizationData => {
  const d = data as UserAuthorizationData

  return d.accessToken !== undefined && d.refreshToken !== undefined
}

export const isUserProfileData = (data: unknown): data is UserProfileData => {
  const d = data as UserProfileData

  return d.name !== undefined
}

export const isUserInitProfileData = (data: unknown): data is UserInitProfileData => {
  const d = data as UserInitProfileData

  return d.initProfileToken !== undefined
}
