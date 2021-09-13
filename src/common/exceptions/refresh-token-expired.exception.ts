import { UnauthorizedException } from '@nestjs/common'
import { ErrorType } from '../../interfaces/enums'

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.REFRESH_TOKEN_EXPIRED,
      message: 'Refresh token has expired'
    })
  }
}
