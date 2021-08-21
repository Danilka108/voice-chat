import { Provider } from '@nestjs/common'

export interface CacheConfig {
  port: string
  host: string
}

export const CACHE_CONFIG = Symbol('Cache Config')

export const cacheConfigProvider: Provider<CacheConfig> = {
  provide: CACHE_CONFIG,
  useValue: {
    port: <string>process.env.CACHE_PORT,
    host: <string>process.env.CACHE_HOST,
  },
}
