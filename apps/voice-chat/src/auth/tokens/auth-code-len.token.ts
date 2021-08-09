import { InjectionToken } from '@angular/core'

export const AUTH_CODE_LEN = new InjectionToken('Auth Code Len', {
  factory: () => 6,
})
