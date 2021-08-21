import { Module } from '@nestjs/common'
import { TokenService } from './shared'
import { ConfigsModule } from '../configs'
import { tokenManagerProvider, cryptoManagerProvider } from './providers'

@Module({
  imports: [ConfigsModule],
  providers: [TokenService, tokenManagerProvider, cryptoManagerProvider],
  exports: [TokenService],
})
export class TokenModule {}
