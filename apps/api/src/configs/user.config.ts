import { Provider } from '@nestjs/common'
import { userConfig } from '@voice-chat/configs'

export interface UserConfig {
  name: {
    maxLen: number
  }
}

export const USER_CONFIG = 'USER_CONFIG'

export const userConfigProvider: Provider<UserConfig> = {
  provide: USER_CONFIG,
  useValue: {
    name: {
      maxLen: userConfig.name.maxLen,
    },
  },
}
