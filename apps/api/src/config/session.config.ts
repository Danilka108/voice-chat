import { Provider } from '@nestjs/common'

export interface SessionConfig {
  /** In milliseconds */
  ttl: number
}

export const SESSION_CONFIG = Symbol('Session Config')

export const sessionConfigProvider: Provider<SessionConfig> = {
  provide: SESSION_CONFIG,
  useValue: {
    ttl: 365 * 24 * 3600 * 1000,
  },
}
