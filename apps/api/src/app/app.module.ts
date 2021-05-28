import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { environment } from '../environments/environment'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment.envFileName,
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
