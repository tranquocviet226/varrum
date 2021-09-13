import { ErrorType } from 'src/interfaces/enums'
import { UnauthorizedException } from '@nestjs/common'

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({ errorType: ErrorType.INVALID_TOKEN, message: 'Invalid token' })
  }
}
