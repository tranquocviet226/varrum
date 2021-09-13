import { HttpExceptionFilter } from '@common/exceptions'
import { HttpResponseInterceptor } from '@common/interceptors'
import { configSwagger } from '@config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { useContainer } from 'class-validator'
import * as compression from 'compression'
import * as helmet from 'helmet'
import { join } from 'path'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('API_PORT')
  const prefix = configService.get<string>('API_PREFIX')

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')

  configSwagger(app, configService)

  app.use(helmet())
  app.use(compression())
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new HttpResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(prefix)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(port)
  return port
}

bootstrap().then((port: number) => {
  Logger.log(` 🌍  Application running on port: ${port}`, 'Main')
})
