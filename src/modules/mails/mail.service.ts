import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserEntity } from '../users/entities/user.entity'

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendMailConfirmation(user: UserEntity, token: string) {
    const MAIL_PATH = this.configService.get('MAIL_PATH')
    const url = `${MAIL_PATH}${token}`

    await this.mailerService.sendMail({
      to: user?.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Congratulation! Verify account.   ',
      template: './mailconfirm', // `.hbs` extension is appended automatically
      context: {
        name: user.fullname,
        url: url
      }
    })
  }

  async sendMailResetPasswordByCode(
    user: UserEntity,
    emailCode: number | string
  ) {
    await this.mailerService.sendMail({
      to: user?.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Password reset.   ',
      template: './mail-reset-password', // `.hbs` extension is appended automatically
      context: {
        name: user.fullname,
        emailCode: emailCode
      }
    })
  }

  async sendMailResetPasswordByLink(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user?.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Password reset.   ',
      template: './mail-reset-password', // `.hbs` extension is appended automatically
      context: {
        name: user.fullname
      }
    })
  }
}
