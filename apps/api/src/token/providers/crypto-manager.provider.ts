import * as crypto from 'crypto'
import { Provider } from '@nestjs/common'

export const CRYPTO_MANAGER = 'CRYPTO_MANAGER'

export const cryptoManagerProvider: Provider = {
  provide: CRYPTO_MANAGER,
  useValue: crypto,
}

export type CryptoManager = typeof crypto
