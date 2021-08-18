import { InjectionToken } from '@angular/core'

export enum AuthCodeControls {
  Code = 'CODE',
}

export const AUTH_CODE_CONTROLS = new InjectionToken('Auth Code Controls', {
  factory: () => AuthCodeControls,
})
