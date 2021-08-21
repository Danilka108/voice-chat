import { Module } from '@nestjs/common'
import { ConfigsModule } from '../configs'
import { NotificationsDevService, NotificationsService } from './shared'
import { twilioProvider } from './providers'

@Module({
  imports: [ConfigsModule],
  providers: [
    {
      provide: NotificationsService,
      useClass: NotificationsDevService,
    },
    twilioProvider,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
