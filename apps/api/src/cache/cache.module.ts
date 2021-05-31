import {
  CacheModuleOptions,
  CacheModule as NativeCacheModule,
  Module,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { CacheAuthCodeService } from './shared/cache-auth-code.service'
import { CacheAuthSessionService } from './shared/cache-auth-session.service'

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
  providers: [CacheAuthCodeService, CacheAuthSessionService],
  exports: [CacheAuthCodeService, CacheAuthSessionService],
})
export class CacheModule {}
