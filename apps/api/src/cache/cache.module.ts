import { Logger, Module } from '@nestjs/common'
import { CacheManager } from './cache-manager'
import IORedis = require('ioredis')
import { ConfigModule } from '../config/config.module'
import { CacheConfig, CACHE_CONFIG } from '../config/cache.config'

@Module({
  providers: [
    CacheManager,
    ConfigModule,
    {
      inject: [CACHE_CONFIG],
      provide: CacheManager,
      useFactory: (cacheConfig: CacheConfig) => {
        const port = Number(cacheConfig.port)
        const host = cacheConfig.host

        const client = new IORedis({
          port,
          host,
        })

        client.on('error', Logger.error)

        return client
      },
    },
  ],
  exports: [CacheManager],
})
export class CacheModule {}
