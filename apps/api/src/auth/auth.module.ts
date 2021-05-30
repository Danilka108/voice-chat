import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from '../cache/cache.module'
import { NotificationsModule } from '../notifications/notifications.module'
import { SessionModule } from '../session/session.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [CacheModule, SessionModule, NotificationsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
