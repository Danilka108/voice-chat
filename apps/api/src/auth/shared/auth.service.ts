import { BadRequestException, Injectable } from '@nestjs/common'
import {
  AuthTelStepDto,
  AuthCodeStepDto,
  AuthInitProfileStepDto,
  AuthRefreshSessionDto,
} from '../dto'
import { SessionService } from '../../session'
import { NotificationsService } from '../../notifications'
import { UserDBService } from '../../user'
import { CodeService } from '../../code'
import { InitProfileService } from '../../init-profile'

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

    const isNotificationSent = await this.notificationsService.sendAuthNotification(
      tel,
      code
    )

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
    await this.sessionService.verify(
      userAuthorizationData,
      userIdentificationData
    )

    await this.sessionService.delete(
      userAuthorizationData,
      userIdentificationData
    )

    const newSession = await this.sessionService.create(
      userAuthorizationData.accessToken,
      userIdentificationData
    )

    return newSession
  }
}
