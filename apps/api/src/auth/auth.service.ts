import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthCodeDto } from './dto/auth-code.dto'
import { AuthRefreshTokenDto } from './dto/auth-refresh-token.dto'
import { AuthTelDto } from './dto/auth-tel.dto'
import { CacheAuthService } from '../cache/cache-auth.service'
import { SessionService } from '../session/session.service'
import { NotificationsService } from '../notifications/notifications.service'
import { CacheAuthSession } from '../cache/interfaces/auth-session.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheAuthService: CacheAuthService,
    private readonly sessionService: SessionService,
    private readonly notificationsService: NotificationsService
  ) {}

  async tel({ tel, browser, os }: AuthTelDto, ip: string) {
    const code = this.sessionService.createAuthCode()

    const authSession = {
      tel,
      browser,
      os,
      ip,
    }

    const prevAuthSession = await this.cacheAuthService.get(authSession)

    const codeDisableRefreshPeriod =
      this.configService.get<number>('auth.codeDisableRefreshPeriod') ?? 0

    if (
      prevAuthSession !== null &&
      Date.now() - prevAuthSession.createdAt <= codeDisableRefreshPeriod
    ) {
      throw new NotAcceptableException(
        `The waiting time for sending a message is ${
          codeDisableRefreshPeriod / 60
        } minutes. Wait another ${
          codeDisableRefreshPeriod - (Date.now() - prevAuthSession.createdAt)
        } seconds.`
      )
    }

    await this.cacheAuthService.set(authSession, code)

    try {
      await this.notificationsService.sendAuthNotification(tel, code)
    } catch (e: unknown) {
      await this.cacheAuthService.del(authSession)
      throw e
    }
  }

  async code({ tel, code, browser, os }: AuthCodeDto, ip: string) {
    const authSession: CacheAuthSession = {
      browser,
      os,
      ip,
      tel,
    }

    const data = await this.cacheAuthService.get(authSession)

    if (data === null) throw new ForbiddenException('Auth error. Invalid code.')

    if (data.code !== code)
      throw new ForbiddenException('Auth error. Invalid code.')

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
