import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppConfig, APP_CONFIG } from './config/app.config'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  const port = app.get<AppConfig>(APP_CONFIG).port
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port)
  })
}

bootstrap()
