import { BadRequestException, HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async sendAuthNotification(to: string, code: number) {
    const apiURL = this.configService.get<string>('notifications.apiURL') ?? ''
    const apiID = this.configService.get<string>('notifications.apiID') ?? ''

    try {
      await this.httpService
        .get(apiURL, {
          params: {
            api_id: apiID,
            json: 1,
            to: to.slice(1, to.length),
            msg: `Your security code is: ${code}`,
          },
        })
        .toPromise()
    } catch (_: unknown) {
      throw new BadRequestException('Failed auth message sending')
    }
  }
}
