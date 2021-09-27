import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { MessageResponse } from '@common/interceptors/message.response'
import { PaginationRequest } from '@common/interfaces'
import { TokenService } from '@modules/auths'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { Injectable } from '@nestjs/common'
import { HashHelper, Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ERoles } from 'src/interfaces/enums/roles.enum'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { JwtPayload } from '../auths/dtos'
import { MailService } from '../mails/mail.service'
import { RolesRepository } from '../roles/role.repository'
import { UserResponseDto } from './dtos'
import { CreateUserRequestDto } from './dtos/create-user.request.dto'
import { EmailRequestDto } from './dtos/refresh-verify.request.dto'
import { ResetPasswordRequestDto } from './dtos/reset-password.request.dto'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UpdateUserRequestDto } from './dtos/update-user.request.dto'
import { VerifyCodeResetRequestDto } from './dtos/verify-code-reset.request.dto'
import { UserCodeEntity } from './entities/user-code.entity'
import { UserEntity } from './entities/user.entity'
import { UsersCodeRepository } from './repositories/user-code.repository'
import { UsersRepository } from './repositories/user.repository'
import { UserMapper } from './user.mapper'
import { UserValidate } from './user.validate'

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private photoRepository: PhotoRepository,
    private usersCodeRepository: UsersCodeRepository,
    private rolesRepository: RolesRepository,
    private mailService: MailService,
    private tokenService: TokenService,
    private userValidate: UserValidate
  ) {}

  public async listUser(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<UserEntity>> {
    try {
      const [list, count] = await this.usersRepository.getUsersAndCount(
        pagination
      )
      return Pagination.of<UserEntity>(pagination, count, list)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async createUser(
    userDto: CreateUserRequestDto
  ): Promise<UserResponseDto> {
    UserValidate.validateUser(userDto)

    const UserRole = await this.rolesRepository.findOne({ name: ERoles.USER })
    if (!UserRole)
      throw new CommonException(
        ErrorType.ROLE_DOES_NOT_EXISTS,
        ErrorMessage.ROLE_DOES_NOT_EXISTS
      )
    const photoEntity = await this.photoRepository.findOne({
      id: userDto.avatar_id
    })
    if (userDto.avatar_id && !photoEntity)
      throw new CommonException(
        ErrorType.AVATAR_ID_NOT_FOUND,
        ErrorMessage.AVATAR_ID_NOT_FOUND
      )

    try {
      let userEntity = UserMapper.toCreateEntity(userDto, [UserRole.id])
      userEntity.password = await HashHelper.encrypt(userEntity.password)
      userEntity = await this.usersRepository.save(userEntity)
      const payload: JwtPayload = {
        id: userEntity.id,
        email: userEntity.email
      }
      const token = this.tokenService.generateVerifyToken(payload)

      this.mailService.sendMailConfirmation(userEntity, token.verifyToken)
      return UserMapper.toDto(userEntity)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public getUsers(user: UserEntity): Promise<UserResponseDto> {
    try {
      return UserMapper.toDto(user)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new CommonException(
        ErrorType.USER_NOT_FOUND,
        ErrorMessage.USER_NOT_FOUND
      )
    }
    return UserMapper.toDto(user)
  }

  public async updateUser(
    currentUser: UserEntity,
    newUser: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    try {
      currentUser = UserMapper.toUpdateEntity(currentUser, newUser)
      if (currentUser.password) {
        currentUser.password = await HashHelper.encrypt(newUser.password)
      }
      await this.usersRepository.save(currentUser)
      const userResponse = await this.usersRepository.findOne({
        id: currentUser.id
      })
      return UserMapper.toDto(userResponse)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async updateUserById(
    id: number,
    newUser: UpdateUserIdRequestDto
  ): Promise<UserResponseDto> {
    let currentUser = await this.userValidate.validateUnique(id, newUser)
    try {
      currentUser = UserMapper.toUpdateEntityById(currentUser, newUser)
      if (currentUser.password) {
        currentUser.password = await HashHelper.encrypt(newUser.password)
      }
      await this.usersRepository.save(currentUser)
      const userResponse = await this.usersRepository.findOne({
        id: currentUser.id
      })
      return UserMapper.toDto(userResponse)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async sendCodeResetPassword(
    emailDto: EmailRequestDto
  ): Promise<MessageResponse> {
    const user = await this.usersRepository.findOne({ email: emailDto.email })
    if (user) {
      try {
        const emailCode = Math.floor(1000 + Math.random() * 8999)
        const oldDateObj = new Date()
        const expiresDate = new Date(oldDateObj.getTime() + 10 * 60000)

        this.mailService.sendMailResetPasswordByCode(user, emailCode)

        const userCode = new UserCodeEntity()
        userCode.email = user.email
        userCode.emailCode = emailCode.toString()
        userCode.expires = expiresDate
        userCode.verified = false

        const update = await this.usersCodeRepository.update(
          { email: userCode.email },
          userCode
        )
        if (update.affected === 0) {
          await this.usersCodeRepository.save(userCode)
        }

        return { message: MessageSuccesses.SEND_MAIL_CODE_SUCCESS }
      } catch (_error) {
        throw new CommonException(
          ErrorType.INTERNAL_SERVER,
          ErrorMessage.INTERNAL_SERVER
        )
      }
    } else {
      throw new CommonException(
        ErrorType.EMAIL_NOT_FOUND,
        ErrorMessage.EMAIL_NOT_FOUND
      )
    }
  }

  public async verifyCodeResetPassword(
    resetPasswordDto: VerifyCodeResetRequestDto
  ): Promise<MessageResponse> {
    const userCode = await this.usersCodeRepository.findOne({
      email: resetPasswordDto.email
    })
    if (userCode) {
      const expires = userCode.expires.getTime()
      const dateNow = Date.now()

      if (dateNow < expires) {
        if (userCode.emailCode === resetPasswordDto.code) {
          try {
            userCode.verified = true
            userCode.expires = new Date(Date.now() + 10 * 60000)
            await this.usersCodeRepository.save(userCode)
            return { message: MessageSuccesses.VERIFY_CODE_SUCCESS }
          } catch (_error) {
            throw new CommonException(
              ErrorType.INTERNAL_SERVER,
              ErrorMessage.INTERNAL_SERVER
            )
          }
        } else {
          throw new CommonException(
            ErrorType.INVALID_CODE,
            ErrorMessage.INVALID_CODE
          )
        }
      } else {
        throw new CommonException(
          ErrorType.CODE_EXPIRED,
          ErrorMessage.CODE_EXPIRED
        )
      }
    } else {
      throw new CommonException(
        ErrorType.EMAIL_NOT_FOUND,
        ErrorMessage.EMAIL_NOT_FOUND
      )
    }
  }

  public async resetPassword(
    resetPasswordDto: ResetPasswordRequestDto
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      email: resetPasswordDto.email
    })
    if (user) {
      const userCode = await this.usersCodeRepository.findOne({
        email: resetPasswordDto.email
      })
      const expires = userCode.expires.getTime()
      const dateNow = Date.now()
      if (userCode.verified) {
        if (dateNow < expires) {
          try {
            user.password = await HashHelper.encrypt(
              resetPasswordDto.newPassword
            )
            const newUser = await this.usersRepository.save(user)
            await this.usersCodeRepository.delete({
              email: resetPasswordDto.email
            })
            return UserMapper.toDto(newUser)
          } catch (_error) {
            throw new CommonException(
              ErrorType.INTERNAL_SERVER,
              ErrorMessage.INTERNAL_SERVER
            )
          }
        } else {
          throw new CommonException(
            ErrorType.CODE_EXPIRED,
            ErrorMessage.CODE_EXPIRED
          )
        }
      } else {
        throw new CommonException(
          ErrorType.VERIFY_CODE_RESET,
          ErrorMessage.VERIFY_CODE_RESET
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
