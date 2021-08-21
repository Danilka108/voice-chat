import { InjectionToken } from '@angular/core'
import { userConfig } from '@voice-chat/configs'

export interface UserConfig {
  name: {
    maxLen: number
  }
}

export const USER_CONFIG = new InjectionToken<UserConfig>('User Config', {
  factory: () => ({
    name: {
      maxLen: userConfig.name.maxLen,
    },
  }),
})
