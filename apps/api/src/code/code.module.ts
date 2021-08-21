import { Module } from '@nestjs/common'
import { CacheModule } from '../cache'
import { CodeService } from './shared'
import { CacheCodeService } from './shared'
import { ConfigsModule } from '../configs'

@Module({
  imports: [CacheModule, ConfigsModule],
  providers: [CodeService, CacheCodeService],
  exports: [CodeService],
})
export class CodeModule {}
