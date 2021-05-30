import {
  CacheModuleOptions,
  CacheModule as NativeCacheModule,
  Module,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { CacheAuthService } from './cache-auth.service'

@Module({
  imports: [
    NativeCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('cache.host'),
          port: configService.get('cache.port'),
        } as CacheModuleOptions
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CacheAuthService],
  exports: [CacheAuthService],
})
export class CacheModule {}
