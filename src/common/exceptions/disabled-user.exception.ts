import { UnauthorizedException } from '@nestjs/common'
import { ErrorType } from '../../interfaces/enums'

export class DisabledUserException extends UnauthorizedException {
  constructor(errorType: ErrorType) {
    super({
      errorType: errorType,
      message: 'User not authorized to login'
    })
  }
}
