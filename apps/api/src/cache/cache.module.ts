import { Module } from '@nestjs/common'
import { cacheManagerProvider } from './cache-manager'
import { CacheAuthCodeService } from './shared/cache-auth-code.service'
import { CacheAuthSessionService } from './shared/cache-auth-session.service'

@Module({
  imports: [],
  providers: [CacheAuthCodeService, CacheAuthSessionService, cacheManagerProvider()],
  exports: [CacheAuthCodeService, CacheAuthSessionService],
})
export class CacheModule {}
