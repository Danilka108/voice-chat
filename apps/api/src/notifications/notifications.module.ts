import { Module } from '@nestjs/common'
import * as twilio from 'twilio'
import { ConfigModule } from '../config/config.module'
import { NotificationsConfig, NOTIFICATIONS_CONFIG } from '../config/notifications.config'
import { NotificationsDevService } from './notifications-dev.service'
import { NotificationsService } from './notifications.service'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: NotificationsService,
      useClass: NotificationsDevService,
    },
    {
      provide: 'twilio',
      useFactory: (config: NotificationsConfig) => {
        const sid = config.apiSID
        const token = config.apiToken
        return twilio(sid, token)
      },
      inject: [NOTIFICATIONS_CONFIG],
    },
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
