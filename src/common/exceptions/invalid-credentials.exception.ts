import { UnauthorizedException } from '@nestjs/common'
import { ErrorType } from '../../interfaces/enums'

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.InvalidCredentials,
      message: 'Invalid credentials'
    })
  }
}
