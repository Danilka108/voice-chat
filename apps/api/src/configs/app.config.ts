import { Provider } from '@nestjs/common'

export interface AppConfig {
  port: string
}

export const APP_CONFIG = Symbol('App Config')

export const appConfigProvider: Provider<AppConfig> = {
  provide: APP_CONFIG,
  useValue: {
    port: <string>process.env.APP_PORT,
  },
}
