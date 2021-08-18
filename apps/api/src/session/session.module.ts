import { Module } from '@nestjs/common'
import { SessionService } from './shared/session.service'
import { CacheModule } from '../cache/cache.module'
import { CacheSessionService } from './shared/cache-session.service'
import { TokenModule } from '../token/token.module'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [CacheModule, TokenModule, ConfigModule],
  providers: [SessionService, CacheSessionService],
  exports: [SessionService],
})
export class SessionModule {}
