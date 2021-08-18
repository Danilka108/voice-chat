import { Module } from '@nestjs/common'
import { CacheModule } from '../cache/cache.module'
import { CodeService } from './shared/code.service'
import { CacheCodeService } from './shared/cache-code.service'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [CacheModule, ConfigModule],
  providers: [CodeService, CacheCodeService],
  exports: [CodeService],
})
export class CodeModule {}
