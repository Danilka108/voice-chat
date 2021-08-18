import * as crypto from 'crypto'

export const cryptoManagerFactory = () => crypto

export const CRYPTO_MANAGER = 'CRYPTO_MANAGER'

export type CryptoManager = typeof crypto
