import { Module } from '@nestjs/common'
import { appConfigProvider } from './app.config'
import { cacheConfigProvider } from './cache.config'
import { codeConfigProvider } from './code.config'
import { databaseConfigProvider } from './database.config'
import { initProfileConfigProvider } from './init-profile.config'
import { notificationsConfigProvider } from './notifications.config'
import { sessionConfigProvider } from './session.config'
import { tokenConfigProvider } from './token.config'
import { userConfigProvider } from './user.config'

const configs = [
  userConfigProvider,
  appConfigProvider,
  cacheConfigProvider,
  codeConfigProvider,
  databaseConfigProvider,
  notificationsConfigProvider,
  sessionConfigProvider,
  tokenConfigProvider,
  initProfileConfigProvider,
]

@Module({
  providers: configs,
  exports: configs,
})
export class ConfigsModule {}
