import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async sendAuthNotification(to: string, code: number): Promise<boolean> {
    const apiURL = this.configService.get<string>('notifications.apiURL') || ''
    const apiID = this.configService.get<string>('notifications.apiID') || ''

    const result = await this.httpService
      .get(apiURL, {
        params: {
          api_id: apiID,
          json: 1,
          to: to.slice(1, to.length),
          msg: `Your security code is: ${code}`,
        },
      })
      .pipe(
        map((v) => v.status === 200),
        catchError(() => of(false))
      )
      .toPromise()

    return result
  }
}
