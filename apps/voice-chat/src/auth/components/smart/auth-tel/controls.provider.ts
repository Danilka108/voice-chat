import { InjectionToken } from '@angular/core'

export enum AuthTelControls {
  TelCode = 'TEL_CODE',
  TelCodeSelect = 'TEL_CODE_SELECT',
  TelNumber = 'TEL_NUMBER',
}

export const AUTH_TEL_CONTROLS = new InjectionToken('Auth Tel Controls', {
  factory: () => AuthTelControls,
})
