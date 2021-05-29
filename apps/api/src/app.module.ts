import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { environment } from './environments/environment'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import databaseConfig from './config/database.config'
import appConfig from './config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment.envFileName,
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          synchronize: true,
          entities: ['dist/**/*.entity.{ts,js}'],
        } as TypeOrmModuleOptions
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
