import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthCodeDto } from './dto/auth-code.dto'
import { AuthRefreshTokenDto } from './dto/auth-refresh-token.dto'
import { AuthTelDto } from './dto/auth-tel.dto'
import { CacheAuthService } from '../cache/cache-auth.service'
import { SessionService } from '../session/session.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheAuthService: CacheAuthService,
    private readonly sessionService: SessionService
  ) {}

  async tel({ tel, browser, os }: AuthTelDto, ip: string) {
    const code = this.sessionService.createAuthCode()

    await this.cacheAuthService.set(
      {
        tel,
        browser,
        os,
        ip,
      },
      code
    )

    const apiID = this.configService.get<string>('sms.apiID') ?? ''
    const apiURL = this.configService.get<string>('sms.apiURL') ?? ''
  }

  async code({ code, browser, os }: AuthCodeDto, ip: string) {
    return {
      userID: 0,
      accessToken: '',
      refreshToken: '',
    }
  }

  async refreshToken(
    { refreshToken, userID, browser, os }: AuthRefreshTokenDto,
    ip: string
  ) {
    return {
      userID: 0,
      accessToken: '',
      refreshToken: '',
    }
  }
}
