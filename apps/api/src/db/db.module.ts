import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigsModule, DatabaseConfig, DATABASE_CONFIG } from '../configs'
import { User } from '../user'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigsModule],
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
  ],
  exports: [TypeOrmModule],
})
export class DBModule {}
