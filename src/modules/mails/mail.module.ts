import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MailService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule], // import module if not enabled globally
      useFactory: (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD')
          }
        },
        defaults: {
          from: `"Varrum support" <${config.get('MAIL_FROM')}>`
        },
        template: {
          dir: process.cwd() + '/src/modules/mails/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [MailService, ConfigService],
  exports: [MailService]
})
export class MailModule {}
