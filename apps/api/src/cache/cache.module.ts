import { Logger, Module } from '@nestjs/common'
import { CacheManager } from './cache-manager'
import { ConfigService } from '@nestjs/config'
import IORedis = require('ioredis')

@Module({
  providers: [
    CacheManager,
    {
      inject: [ConfigService],
      provide: CacheManager,
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
    },
  ],
  exports: [CacheManager],
})
export class CacheModule {}
