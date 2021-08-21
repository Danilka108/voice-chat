import { Inject } from '@nestjs/common'
import { Twilio } from 'twilio'
import { CodeConfig, CODE_CONFIG } from '../../configs'
import { NotificationsConfig, NOTIFICATIONS_CONFIG } from '../../configs'
import { INotificationsService } from '../interfaces'
import { TWILIO } from '../providers'

export class NotificationsService implements INotificationsService {
  constructor(
    @Inject(NOTIFICATIONS_CONFIG)
    private readonly notificationsConfig: NotificationsConfig,
    @Inject(CODE_CONFIG) private readonly codeConfig: CodeConfig,
    @Inject(TWILIO) private readonly twilio: Twilio
  ) {}

  async sendAuthNotification(to: string, code: number): Promise<boolean> {
    const from = this.notificationsConfig.apiFrom
    const codeTTL = this.codeConfig.ttl

    try {
      const message = await this.twilio.messages.create({
        body: `Your security code: ${code}. Code lifetime is ${
          codeTTL / (60 * 1000)
        } minutes`,
        from,
        to,
      })

      return message.errorCode === null
    } catch (_) {
      return false
    }
  }
}
