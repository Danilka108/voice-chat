import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { DBModule } from './db'

@Module({
  imports: [DBModule, AuthModule],
})
export class AppModule {}
