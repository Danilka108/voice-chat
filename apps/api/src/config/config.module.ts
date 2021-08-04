import { Module } from '@nestjs/common'
import { appConfigProvider } from './app.config'
import { cacheConfigProvider } from './cache.config'
import { codeConfigProvider } from './code.config'
import { databaseConfigProvider } from './database.config'
import { notificationsConfigProvider } from './notifications.config'
import { sessionConfigProvider } from './session.config'
import { tokenConfigProvider } from './token.config'

@Module({
  providers: [
    appConfigProvider,
    cacheConfigProvider,
    codeConfigProvider,
    databaseConfigProvider,
    notificationsConfigProvider,
    sessionConfigProvider,
    tokenConfigProvider,
  ],
  exports: [
    appConfigProvider,
    cacheConfigProvider,
    codeConfigProvider,
    databaseConfigProvider,
    notificationsConfigProvider,
    sessionConfigProvider,
    tokenConfigProvider,
  ],
})
export class ConfigModule {}
