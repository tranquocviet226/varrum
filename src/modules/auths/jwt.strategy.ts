import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './dtos'
import {
  DisabledUserException,
  InvalidCredentialsException
} from '@common/exceptions'
import { ErrorType } from 'src/interfaces/enums'
import { UsersRepository } from 'src/modules/users/repositories/user.repository'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UserStatus } from 'src/interfaces/enums/user-status.enum'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private consigService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: consigService.get('TOKEN_SECRET')
    })
  }

  async validate({ email }: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new InvalidCredentialsException()
    }
    if (user.status === UserStatus.Inactive) {
      throw new DisabledUserException(ErrorType.INACTIVE_USER)
    }
    if (user.status === UserStatus.Blocked) {
      throw new DisabledUserException(ErrorType.BLOCKED_USER)
    }
    return user
  }
}
