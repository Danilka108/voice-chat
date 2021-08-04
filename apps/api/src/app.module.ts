import { Inject, Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { User } from './user/user.entity'
import { ConfigModule } from './config/config.module'
import { DatabaseConfig, DATABASE_CONFIG } from './config/database.config'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (databaseConfig: DatabaseConfig) => {
        return <TypeOrmModuleOptions>{
          type: databaseConfig.type,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          synchronize: databaseConfig.synchronize,
          entities: [User],
        }
      },
      inject: [DATABASE_CONFIG],
    }),
    AuthModule,
  ],
})
export class AppModule {}
