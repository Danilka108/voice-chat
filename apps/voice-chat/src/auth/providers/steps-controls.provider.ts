import { InjectionToken } from '@angular/core'

export enum AuthStepsControls {
  WelcomeStep = 'WELCOME_STEP',
  TelStep = 'TEL_STEP',
  CodeStep = 'CODE_STEP',
  InitProfileStep = 'INIT_PROFILE_STEP',
}

export const AUTH_STEPS_CONTROLS = new InjectionToken('Auth Steps Controls', {
  factory: () => AuthStepsControls,
})
