import { Provider } from '@nestjs/common'

export interface InitProfileConfig {
  /** In milliseconds */
  ttl: number
}

export const INIT_PROFILE_CONFIG = Symbol('Init Profile Config')

export const initProfileConfigProvider: Provider<InitProfileConfig> = {
  provide: INIT_PROFILE_CONFIG,
  useValue: {
    ttl: 30 * 60 * 1000,
  },
}
