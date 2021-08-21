import { Provider } from '@nestjs/common'

export interface TokenConfig {
  secret: string
  /** In seconds */
  expiresIn: number
}

export const TOKEN_CONFIG = Symbol('Token Config')

export const tokenConfigProvider: Provider<TokenConfig> = {
  provide: TOKEN_CONFIG,
  useValue: {
    secret: <string>process.env.ACCESS_TOKEN_SECRET,
    expiresIn: 60 * 60,
  },
}
