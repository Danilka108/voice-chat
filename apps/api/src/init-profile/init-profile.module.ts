import { Module } from '@nestjs/common'
import { CacheModule } from '../cache/cache.module'
import { ConfigModule } from '../config/config.module'
import { TokenModule } from '../token/token.module'
import { CacheInitProfileService } from './shared/cache-init-profile.service'
import { InitProfileService } from './shared/init-profile.service'

@Module({
  imports: [CacheModule, ConfigModule, TokenModule],
  providers: [CacheInitProfileService, InitProfileService],
  exports: [InitProfileService],
})
export class InitProfileModule {}
