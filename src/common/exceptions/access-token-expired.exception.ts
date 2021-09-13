import { UnauthorizedException } from '@nestjs/common'
import { ErrorType } from '../../interfaces/enums'

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.ACCESS_TOKEN_EXPIRED,
      message: 'Access token has expired'
    })
  }
}
