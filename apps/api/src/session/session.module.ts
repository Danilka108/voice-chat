import { Module } from '@nestjs/common'
import { CacheModule } from '../cache'
import { CacheSessionService, SessionService } from './shared'
import { TokenModule } from '../token'
import { ConfigsModule } from '../configs'

@Module({
  imports: [CacheModule, TokenModule, ConfigsModule],
  providers: [SessionService, CacheSessionService],
  exports: [SessionService],
})
export class SessionModule {}
