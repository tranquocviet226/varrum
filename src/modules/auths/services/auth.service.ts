import {
  CommonException,
  DisabledUserException,
  InvalidCredentialsException
} from '@common/exceptions'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HashHelper } from 'src/helpers'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { UserStatus } from 'src/interfaces/enums/user-status.enum'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { MailService } from '@modules/mails/mail.service'
import { EmailRequestDto } from 'src/modules/users/dtos/refresh-verify.request.dto'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UserMapper } from 'src/modules/users/user.mapper'
import { UsersRepository } from 'src/modules/users/repositories/user.repository'
import {
  AuthCredentialsRequestDto,
  JwtPayload,
  LoginResponseDto
} from '../dtos'
import { TokenService } from './token.service'
import { RefreshVerifyAccountResponseDto } from '../dtos/refresh-verify-account.response.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
    private mailService: MailService
  ) {}

  /**
   * User authentication
   * @param authCredentialsDto {AuthCredentialsRequestDto}
   * @returns {Promise<LoginResponseDto>}
   */
  public async login({
    email,
    password
  }: AuthCredentialsRequestDto): Promise<LoginResponseDto> {
    const user: UserEntity = await this.usersRepository.findUserByEmail(email)

    if (!user) {
      throw new CommonException(
        ErrorType.USER_NOT_FOUND,
        ErrorMessage.USER_NOT_FOUND
      )
    }

    const passwordMatch = await HashHelper.compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentialsException()
    }
    if (user.status === UserStatus.Blocked) {
      throw new DisabledUserException(ErrorType.BLOCKED_USER)
    }
    if (user.status === UserStatus.Inactive) {
      throw new DisabledUserException(ErrorType.INACTIVE_USER)
    }

    const payload: JwtPayload = { id: user.id, email: user.email }
    const token = await this.tokenService.generateAuthToken(payload)

    const userDto = await UserMapper.toDto(user)
    const { permissions, roles } = await UserMapper.toDtoWithRelations(user)
    const additionalPermissions = permissions.map(({ slug }) => slug)
    const mappedRoles = roles.map(({ name, permissions }) => {
      const rolePermissions = permissions.map(({ slug }) => slug)
      return {
        name: name,
        permissions: rolePermissions
      }
    })

    return {
      user: userDto,
      token: token,
      access: {
        additionalPermissions: additionalPermissions,
        roles: mappedRoles
      }
    }
  }

  public async refreshVerifyAccount(
    dto: EmailRequestDto
  ): Promise<RefreshVerifyAccountResponseDto> {
    const user = await this.usersRepository.findOne({ email: dto.email })
    if (user) {
      if (user.status === UserStatus.Inactive) {
        try {
          const payload: JwtPayload = {
            id: user.id,
            email: user.email
          }
          const token = this.tokenService.generateVerifyToken(payload)
          this.mailService.sendMailConfirmation(user, token.verifyToken)
          return { message: MessageSuccesses.REFRESH_VERIFY_SUCCESS }
        } catch (_error) {
          throw new CommonException(
            ErrorType.INTERNAL_SERVER,
            ErrorMessage.INTERNAL_SERVER
          )
        }
      } else if (user.status === UserStatus.Active) {
        throw new CommonException(
          ErrorType.ACTIVATED_EMAIL,
          ErrorMessage.ACTIVATED_EMAIL
        )
      } else {
        throw new CommonException(
          ErrorType.BLOCKED_EMAIL,
          ErrorMessage.BLOCKED_EMAIL
        )
      }
    } else {
      throw new CommonException(
        ErrorType.EMAIL_NOT_FOUND,
        ErrorMessage.EMAIL_NOT_FOUND
      )
    }
  }
}
