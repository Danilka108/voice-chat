import { InjectionToken } from '@angular/core'

export enum AuthInitProfileControls {
  Name = 'NAME',
}

export const AUTH_INIT_PROFILE_CONTROLS = new InjectionToken('Auth Init Profile Controls', {
  factory: () => AuthInitProfileControls,
})
