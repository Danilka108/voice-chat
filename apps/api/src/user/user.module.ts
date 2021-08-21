import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDBService } from './shared'
import { User } from './user.entity'
import { ConfigsModule } from '../configs'

@Module({
  providers: [UserDBService],
  imports: [ConfigsModule, TypeOrmModule.forFeature([User])],
  exports: [UserDBService],
})
export class UserModule {}
