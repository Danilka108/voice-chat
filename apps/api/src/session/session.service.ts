import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { isAuthDecoded } from '../common/validators/is-auth-decoded.validator'
import { AuthDecoded } from '../common/interfaces/auth-decoded.interface'

@Injectable()
export class SessionService {
  constructor(private readonly configService: ConfigService) {}

  createAuthCode(): number {
    const codeLen = this.configService.get<number>('auth.code.len') || 0

    let min = '1'
    let max = ''

    for (let i = 0; i < codeLen; i++) {
      if (i !== 0) {
        min += '0'
      }

      max += '9'
    }

    const code = crypto.randomInt(parseInt(min), parseInt(max))

    return code
  }

  createAccessToken(userID: number, tel: string): string {
    const expiresIn = this.configService.get<number>('token.accessToken.expiresIn') || 0
    const secret = this.configService.get<string>('token.accessToken.secret') || ''

    const token = jwt.sign({ userID, tel }, secret, {
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

  createRefreshToken(): string {
    const randomBytes = crypto.randomBytes(48)

    const token = randomBytes.toString('hex')

    return token
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
}
