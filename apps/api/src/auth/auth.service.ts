import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthCodeDto } from './dto/auth-code.dto'
import { AuthRefreshTokenDto } from './dto/auth-refresh-token.dto'
import { AuthTelDto } from './dto/auth-tel.dto'
import { CacheAuthCodeService } from '../cache/shared/cache-auth-code.service'
import { SessionService } from '../session/session.service'
import { NotificationsService } from '../notifications/notifications.service'
import { CacheAuthCode } from '../cache/interfaces/auth-code.interface'
import { UserDBService } from '../user/user-db.service'
import { CacheAuthSessionService } from '../cache/shared/cache-auth-session.service'
import { CacheAuthSession } from '../cache/interfaces/auth-session.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheAuthCodeService: CacheAuthCodeService,
    private readonly sessionService: SessionService,
    private readonly notificationsService: NotificationsService,
    private readonly userDBService: UserDBService,
    private readonly cacheAuthSessionService: CacheAuthSessionService
  ) {}

  async tel({ tel, browser, os }: AuthTelDto, ip: string): Promise<void> {
    const code = this.sessionService.createAuthCode()

    const cacheData = {
      tel,
      browser,
      os,
      ip,
    }

    const prevCacheData = await this.cacheAuthCodeService.get(cacheData)

    const codeDisableRefreshPeriod =
      this.configService.get<number>('auth.code.disableRefreshPeriod') || 0

    if (
      prevCacheData !== null &&
      Date.now() - prevCacheData.createdAt <= codeDisableRefreshPeriod
    ) {
      throw new NotAcceptableException(
        `The waiting time for sending a message is ${
          codeDisableRefreshPeriod / 60
        } minutes. Wait another ${
          codeDisableRefreshPeriod - (Date.now() - prevCacheData.createdAt)
        } seconds.`
      )
    }

    await this.cacheAuthCodeService.set(cacheData, code)

    const isSendedMessage = await this.notificationsService.sendAuthNotification(
      tel,
      code
    )

    if (!isSendedMessage) {
      await this.cacheAuthCodeService.del(cacheData)
      throw new BadRequestException('Failed to send authentication message')
    }
  }

  async code(
    { tel, code, browser, os }: AuthCodeDto,
    ip: string
  ): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const cacheData: CacheAuthCode = {
      tel,
      browser,
      os,
      ip,
    }

    const cachedData = await this.cacheAuthCodeService.get(cacheData)

    if (cachedData === null || cachedData.code !== code)
      throw new ForbiddenException('Auth error. Failed verify code.')

    const cacheCode: CacheAuthCode = {
      tel,
      ip,
      os,
      browser,
    }

    await this.cacheAuthCodeService.del(cacheCode)

    let user = await this.userDBService.findByTel(tel)

    if (user === null) {
      user = await this.userDBService.create('', tel)
    }

    const accessToken = this.sessionService.createAccessToken(user.id, user.tel)
    const refreshToken = this.sessionService.createRefreshToken()

    const cacheSession: CacheAuthSession = {
      id: user.id,
      os,
      browser,
      ip,
    }

    await this.cacheAuthSessionService.set(cacheSession, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(
    { refreshToken, accessToken, browser, os }: AuthRefreshTokenDto,
    ip: string
  ) {
    const decoded = this.sessionService.decodeAccessToken(accessToken)

    if (decoded === null) {
      throw new ForbiddenException('Auth error. Failed verify token.')
    }

    const cacheSession: CacheAuthSession = {
      id: decoded.userID,
      os,
      browser,
      ip,
    }

    const cacheSessionValue = await this.cacheAuthSessionService.get(
      cacheSession
    )

    if (
      cacheSessionValue === null ||
      cacheSessionValue.refreshToken !== refreshToken
    ) {
      throw new ForbiddenException('Auth error. Failed verify token.')
    }

    const newAccessToken = this.sessionService.createAccessToken(
      decoded.userID,
      decoded.tel
    )
    const newRefreshToken = this.sessionService.createRefreshToken()

    await this.cacheAuthSessionService.set(cacheSession, newRefreshToken)

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
}
