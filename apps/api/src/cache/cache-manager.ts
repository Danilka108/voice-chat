import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as IORedis from 'ioredis'
import { Logger } from '@nestjs/common'
import { Redis } from 'ioredis'

export const CACHE_MANAGER = 'CACHE_CORE_MANAGER'
export type CacheManager = Redis

export const cacheManagerProvider = (): Provider => ({
  inject: [ConfigService],
  provide: CACHE_MANAGER,
  useFactory: (configService: ConfigService) => {
    const port = configService.get<number>('cache.port') || 6379
    const host = configService.get<string>('cache.host') || 'localhost'

    const client = new IORedis({
      port,
      host,
    })

    client.on('error', Logger.error)

    return client
  },
})
