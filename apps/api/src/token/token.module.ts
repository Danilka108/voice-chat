import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import * as jwt from 'jsonwebtoken'
import { tokenManagerFactory, TOKEN_MANAGER } from './token-manager.factory'
import { cryptoManagerFactory, CRYPTO_MANAGER } from './crypto-manager.factory'

@Module({
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
