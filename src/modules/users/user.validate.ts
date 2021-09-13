import { CommonException } from '@common/exceptions'
import { Injectable } from '@nestjs/common'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CreateUserRequestDto } from './dtos'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UsersRepository } from './repositories/user.repository'

@Injectable()
export class UserValidate {
  constructor(private usersRepository: UsersRepository) { }

  public static validateUser(userDto: CreateUserRequestDto) {
    if (!userDto.email) {
      throw new CommonException(
        ErrorType.EMAIL_NOT_EMPTY,
        ErrorMessage.EMAIL_NOT_EMPTY
      )
    }
  }

  public async validateUnique(id: number, newUser: UpdateUserIdRequestDto) {
    const currentUser = await this.usersRepository.findOne(id)
    if (!currentUser) {
      throw new CommonException(
        ErrorType.USER_NOT_FOUND,
        ErrorMessage.USER_NOT_FOUND
      )
    }

    if (newUser.email !== currentUser.email) {
      const checkEmail = await this.usersRepository.count({
        where: { email: newUser.email }
      })
      if (checkEmail > 0) {
        throw new CommonException(
          ErrorType.EMAIL_EXISTS,
          ErrorMessage.EMAIL_EXISTS
        )
      }
    }

    return currentUser
  }
}
