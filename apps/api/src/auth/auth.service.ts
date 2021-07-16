import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthCodeDto } from './dto/auth-code.dto'
import { AuthRefreshTokenDto } from './dto/auth-refresh-token.dto'
import { AuthTelDto } from './dto/auth-tel.dto'
import { SessionService } from '../session/shared/session.service'
import { NotificationsService } from '../notifications/notifications.service'
import { UserDBService } from '../user/user-db.service'
import { CodeService } from '../code/shared/code.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly codeService: CodeService,
    private readonly sessionService: SessionService,
    private readonly notificationsService: NotificationsService,
    private readonly userDBService: UserDBService
  ) {}

  async tel({ tel, browser, os }: AuthTelDto, ip: string): Promise<void> {
    const cacheCodeKey = {
      tel,
      browser,
      os,
      ip,
    }

    const code = await this.codeService.create(cacheCodeKey)

    const isMessageSended = await this.notificationsService.sendAuthNotification(tel, code)

    if (!isMessageSended) {
      await this.codeService.delete(cacheCodeKey)
      throw new BadRequestException('Failed to send auth message')
    }
  }

  async code(
    { tel, code, browser, os, name }: AuthCodeDto,
    ip: string
  ): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const cacheCodeKey = {
      tel,
      browser,
      os,
      ip,
    }

    await this.codeService.verify(cacheCodeKey, code)

    let user = await this.userDBService.findByTel(tel)

    if (user === null && name.trim().length === 0) {
      throw new BadRequestException('A name is required to create a user.')
    } else if (user === null) {
      user = await this.userDBService.create(name, tel)
    }

    await this.codeService.delete(cacheCodeKey)

    const cacheSessionKey = {
      id: user.id,
      os,
      browser,
      ip,
    }

    const result = await this.sessionService.create(tel, cacheSessionKey)

    return result
  }

  async refreshToken(
    { refreshToken, accessToken, browser, os }: AuthRefreshTokenDto,
    ip: string
  ) {
    await this.sessionService.verify(accessToken, refreshToken, browser, os, ip)

    const newSession = await this.sessionService.create(accessToken, {
      browser,
      ip,
      os,
    })

    return newSession
  }
}
