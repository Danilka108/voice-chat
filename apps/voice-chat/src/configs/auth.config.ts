import { InjectionToken } from '@angular/core'
import { authConfig } from '@voice-chat/configs'

export interface AuthConfig {
  code: {
    len: number
  }
}

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('Auth Config', {
  factory: () => ({
    code: {
      len: authConfig.code.len,
    },
  }),
})
