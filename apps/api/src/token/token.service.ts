import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthDecoded } from '../common/interfaces/auth-decoded.interface'
import { isAuthDecoded } from '../common/validators/is-auth-decoded.validator'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  createAccessToken(data: AuthDecoded): string {
    const expiresIn = this.configService.get<number>('token.accessToken.expiresIn') || 0
    const secret = this.configService.get<string>('token.accessToken.secret') || ''

    const token = jwt.sign(data, secret, {
      expiresIn,
    })

    return token
  }

  decodeAccessToken(accessToken: string): AuthDecoded | null {
    const decoded = jwt.decode(accessToken)

    if (!isAuthDecoded(decoded)) {
      return null
    }

    return decoded as AuthDecoded
  }

  async verifyAccessToken(accessToken: string): Promise<AuthDecoded | null> {
    const secret = this.configService.get<string>('token.accessToken.secret') || ''

    const decoded = await new Promise<AuthDecoded | null>((resolve) => {
      jwt.verify(accessToken, secret, {}, (error, data) => {
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
    const randomBytes = crypto.randomBytes(64)

    const token = randomBytes.toString('hex')

    return token
  }
}
