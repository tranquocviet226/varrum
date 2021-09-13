import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { AUTH_OPTIONS, TOKEN_NAME } from '@modules/auths'
import { ConfigService } from '@nestjs/config'

const title = 'Education Api Swagger'
const description = 'Education app'
const version = '1.0'

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const configSwagger = (
  app: INestApplication,
  configService: ConfigService
) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .addServer(configService.get('BASE_URL'))
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('swagger', app, document)
}
