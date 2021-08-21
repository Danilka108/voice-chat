import { Provider } from '@nestjs/common'
import { authConfig } from '@voice-chat/configs'

export interface CodeConfig {
  len: number
  /** In milliseconds */
  ttl: number
  /** In seconds */
  periodOfBanOfRefresh: number
}

export const CODE_CONFIG = Symbol('Code Config')

export const codeConfigProvider: Provider<CodeConfig> = {
  provide: CODE_CONFIG,
  useValue: {
    len: authConfig.code.len,
    ttl: 10 * 60 * 1000,
    periodOfBanOfRefresh: 2 * 60,
  },
}
