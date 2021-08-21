import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './common'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppConfig, APP_CONFIG } from './configs'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  const port = app.get<AppConfig>(APP_CONFIG).port
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port)
  })
}

bootstrap()
