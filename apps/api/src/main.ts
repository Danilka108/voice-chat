import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const config = app.get(ConfigService)
  const port = config.get('API_PORT') || 3333
  console.log(config.get('API_PORT'))
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
  })
}

bootstrap()
