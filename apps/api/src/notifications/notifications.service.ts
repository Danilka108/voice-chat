import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Twilio } from 'twilio'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('twilio') private readonly twilio: Twilio
  ) {}

  async sendAuthNotification(to: string, code: number): Promise<boolean> {
    const from = this.configService.get<string>('notifications.apiFrom') || ''
    const codeTTL = this.configService.get<number>('auth.code.ttl') || 0

    const message = await this.twilio.messages.create({
      body: `Your security code: ${code}. Code lifetime is ${codeTTL / 60} minutes`,
      from,
      to,
    })

    return message.errorCode === null
  }
}
