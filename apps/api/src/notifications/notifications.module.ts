import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as twilio from 'twilio'
import { NotificationsDevService } from './notifications-dev.service'
import { NotificationsService } from './notifications.service'

@Module({
  providers: [
    {
      provide: NotificationsService,
      useClass: NotificationsService,
    },
    {
      provide: 'twilio',
      useFactory: (configService: ConfigService) => {
        const sid = configService.get<string>('notifications.apiSID') || ''
        const token = configService.get<string>('notifications.apiToken') || ''
        return twilio(sid, token)
      },
      inject: [ConfigService],
    },
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
