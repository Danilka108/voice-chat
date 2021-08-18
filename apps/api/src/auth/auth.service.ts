import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthRefreshSessionDto } from './dto/auth-refresh-session.dto'
import { SessionService } from '../session/shared/session.service'
import { NotificationsService } from '../notifications/notifications.service'
import { UserDBService } from '../user/user-db.service'
import { CodeService } from '../code/shared/code.service'
import { AuthTelStepDto } from './dto/auth-tel-step.dto'
import { AuthCodeStepDto } from './dto/auth-code-step.dto'
import { InitProfileService } from '../init-profile/shared/init-profile.service'
import { AuthInitProfileStepDto } from './dto/auth-init-profile-step.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly codeService: CodeService,
    private readonly sessionService: SessionService,
    private readonly notificationsService: NotificationsService,
    private readonly userDBService: UserDBService,
    private readonly initProfileService: InitProfileService
  ) {}

  async telStep({ tel, userIdentificationData }: AuthTelStepDto) {
    const code = await this.codeService.create({
      tel,
      userIdentificationData,
    })

    const isNotificationSent = await this.notificationsService.sendAuthNotification(tel, code)

    if (!isNotificationSent) {
      await this.codeService.delete({
        tel,
        userIdentificationData,
      })
      throw new BadRequestException('Failed to send auth notification')
    }
  }

  async codeStep({ tel, code, userIdentificationData }: AuthCodeStepDto) {
    await this.codeService.verify(
      {
        tel,
        userIdentificationData,
      },
      code
    )

    await this.codeService.delete({
      tel,
      userIdentificationData,
    })

    const user = await this.userDBService.findByTel(tel)

    if (!user) {
      const initProfileToken = await this.initProfileService.create({
        tel,
        userIdentificationData,
      })

      return {
        initProfileToken,
      }
    }

    const session = await this.sessionService.create(tel, {
      id: user.id,
      userIdentificationData,
    })

    return session
  }

  async initProfileStep({
    tel,
    userProfileData,
    userInitProfileData,
    userIdentificationData,
  }: AuthInitProfileStepDto) {
    await this.initProfileService.verify(
      { tel, userIdentificationData },
      userInitProfileData.initProfileToken
    )

    const newUser = await this.userDBService.create(userProfileData.name, tel)

    const session = await this.sessionService.create(tel, {
      id: newUser.id,
      userIdentificationData,
    })

    return session
  }

  async refreshSession({
    userAuthorizationData,
    userIdentificationData,
  }: AuthRefreshSessionDto) {
    await this.sessionService.verify(userAuthorizationData, userIdentificationData)

    await this.sessionService.delete(userAuthorizationData, userIdentificationData)

    const newSession = await this.sessionService.create(
      userAuthorizationData.accessToken,
      userIdentificationData
    )

    return newSession
  }
}
