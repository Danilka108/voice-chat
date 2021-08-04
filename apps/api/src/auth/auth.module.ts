import { Module } from '@nestjs/common'
import { CodeModule } from '../code/code.module'
import { InitProfileModule } from '../init-profile/init-profile.module'
import { NotificationsModule } from '../notifications/notifications.module'
import { SessionModule } from '../session/session.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [SessionModule, NotificationsModule, UserModule, CodeModule, InitProfileModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
