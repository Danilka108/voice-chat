import { Module } from '@nestjs/common'
import { CacheModule } from '../cache'
import { ConfigsModule } from '../configs'
import { TokenModule } from '../token'
import { CacheInitProfileService, InitProfileService } from './shared'

@Module({
  imports: [CacheModule, ConfigsModule, TokenModule],
  providers: [CacheInitProfileService, InitProfileService],
  exports: [InitProfileService],
})
export class InitProfileModule {}
