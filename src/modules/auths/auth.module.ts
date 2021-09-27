import { MailService } from '@modules/mails/mail.service'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from 'src/modules/users/repositories/user.repository'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './services/auth.service'
import { TokenService } from './services/token.service'

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService, MailService],
  exports: [JwtStrategy, PassportModule, TokenService, AuthService]
})
export class AuthModule {}
