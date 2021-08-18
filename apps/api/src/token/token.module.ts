import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { tokenManagerFactory, TOKEN_MANAGER } from './token-manager.factory'
import { cryptoManagerFactory, CRYPTO_MANAGER } from './crypto-manager.factory'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [ConfigModule],
  providers: [
    TokenService,
    {
      provide: TOKEN_MANAGER,
      useFactory: tokenManagerFactory,
    },
    {
      provide: CRYPTO_MANAGER,
      useFactory: cryptoManagerFactory,
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
