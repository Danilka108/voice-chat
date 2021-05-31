import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule as NativeConfigModule } from '@nestjs/config'
import { environment } from '../environments/environment'
import {
  appConfig,
  authConfig,
  cacheConfig,
  databaseConfig,
  httpConfig,
  notificationsConfig,
  tokenConfig,
} from './configs'

@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    const nativeConfigModule = NativeConfigModule.forRoot({
      envFilePath: environment.envFileName,
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
        cacheConfig,
        databaseConfig,
        httpConfig,
        notificationsConfig,
        tokenConfig,
      ],
    })

    return {
      module: ConfigModule,
      exports: [nativeConfigModule],
      imports: [nativeConfigModule],
    }
  }
}
