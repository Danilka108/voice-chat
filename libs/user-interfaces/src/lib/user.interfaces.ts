export interface UserAuthorizationData {
  accessToken: string
  refreshToken: string
}

export interface UserIdentificationData {
  os: string
  browser: string
}

export interface UserProfileData {
  name: string
}

export interface UserInitProfileData {
  initProfileToken: string
}
