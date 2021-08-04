import { Provider } from '@nestjs/common'

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
    len: 6,
    ttl: 10 * 60 * 1000,
    periodOfBanOfRefresh: 2 * 60,
  },
}
