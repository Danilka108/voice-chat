import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import {
  randomBytes as cryptoRandomBytes,
  randomInt as cryptoRandomInt,
} from 'crypto'
import { isAuthDecoded } from '../common/validators/is-auth-decoded.validator'
import { AuthDecoded } from '../common/interfaces/auth-decoded.interface'

@Injectable()
export class SessionService {
  constructor(private readonly configService: ConfigService) {}

  createAuthCode(): number {
    const codeMax = this.configService.get<number>('auth.codeMax') ?? 0
    const code = cryptoRandomInt(codeMax)

    return code
  }

  createAccessToken(userID: number, tel: string): string {
    const expiresIn =
      this.configService.get<number>('token.accessToken.expiresIn') ?? 0
    const secret =
      this.configService.get<string>('token.accessToken.secret') ?? ''

    const token = jwtSign({ userID, tel }, secret, {
      expiresIn,
    })

    return token
  }

  createRefreshToken(): string {
    const randomBytes = cryptoRandomBytes(48)

    const token = randomBytes.toString('hex')

    return token
  }

  async verifyAccessToken(accessToken: string): Promise<AuthDecoded | null> {
    const secret =
      this.configService.get<string>('token.accessToken.secret') ?? ''

    const decoded = new Promise<AuthDecoded | null>((resolve) => {
      jwtVerify(accessToken, secret, {}, (error, data) => {
        if (error || !isAuthDecoded(data)) {
          resolve(null)
          return
        }

        resolve(data)
      })
    })

    return await decoded
  }
}
