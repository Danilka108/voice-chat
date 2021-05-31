import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { User } from './user/user.entity'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [
    ConfigModule.register(),
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
          entities: [User],
        } as TypeOrmModuleOptions
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}
