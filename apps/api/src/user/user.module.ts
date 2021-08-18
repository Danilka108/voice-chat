import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDBService } from './user-db.service'
import { User } from './user.entity'

@Module({
  providers: [UserDBService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserDBService],
})
export class UserModule {}
