import { Module } from '@nestjs/common'
import { SessionService } from './shared/session.service'
import { CacheModule } from '../cache/cache.module'
import { CacheSessionService } from './shared/cache-session.service'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [CacheModule, TokenModule],
  providers: [SessionService, CacheSessionService],
  exports: [SessionService],
})
export class SessionModule {}
