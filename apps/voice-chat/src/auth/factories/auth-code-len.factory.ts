import { InjectionToken } from '@angular/core'

export const AUTH_CODE_LEN = new InjectionToken('AUTH_CODE_LEN')
export const authCodeLenFactory = () => 6
