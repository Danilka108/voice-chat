import { Module } from '@nestjs/common'
import { CodeModule } from '../code'
import { InitProfileModule } from '../init-profile'
import { NotificationsModule } from '../notifications'
import { SessionModule } from '../session'
import { UserModule } from '../user'
import { AuthController } from './auth.controller'
import { AuthService } from './shared'

@Module({
  imports: [
    SessionModule,
    NotificationsModule,
    UserModule,
    CodeModule,
    InitProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
