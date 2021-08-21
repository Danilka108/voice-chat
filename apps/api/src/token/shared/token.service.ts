import { Inject, Injectable } from '@nestjs/common'
import { AuthDecoded } from '../../common'
import { isAuthDecoded } from '../../common'
import { TokenManager, TOKEN_MANAGER } from '../providers'
import { CryptoManager, CRYPTO_MANAGER } from '../providers'
import { TokenConfig, TOKEN_CONFIG } from '../../configs'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_CONFIG) private readonly config: TokenConfig,
    @Inject(TOKEN_MANAGER) private readonly tokenManager: TokenManager,
    @Inject(CRYPTO_MANAGER) private readonly cryptoManager: CryptoManager
  ) {}

  createInitProfileToken() {
    const randomBytes = this.cryptoManager.randomBytes(64)

    const token = randomBytes.toString('hex')

    return token
  }

  createAccessToken(data: AuthDecoded): string {
    const expiresIn = this.config.expiresIn
    const secret = this.config.secret

    const token = this.tokenManager.sign(data, secret, {
      expiresIn,
    })

    return token
  }

  decodeAccessToken(accessToken: string) {
    const decoded = this.tokenManager.decode(accessToken)

    if (!isAuthDecoded(decoded)) {
      return null
    }

    return decoded
  }

  async verifyAccessToken(accessToken: string): Promise<AuthDecoded | null> {
    const secret = this.config.secret

    const decoded = await new Promise<AuthDecoded | null>((resolve) => {
      this.tokenManager.verify(accessToken, secret, {}, (error, data) => {
        if (error || !isAuthDecoded(data)) {
          resolve(null)
          return
        }

        resolve(data)
      })
    })

    return decoded
  }

  createRefreshToken(): string {
    const randomBytes = this.cryptoManager.randomBytes(64)

    const token = randomBytes.toString('hex')

    return token
  }
}
