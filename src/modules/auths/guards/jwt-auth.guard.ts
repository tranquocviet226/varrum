import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { TokenType } from '../enums'
import { TokenService } from '../services'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private tokenService: TokenService) {
    super()
  }

  /**
   * Verify the token is valid
   * @param context {ExecutionContext}
   * @returns super.canActivate(context)
   */
  canActivate(context: ExecutionContext) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest()
    )
    if (!accessToken) {
      throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED)
    }

    const payload = this.tokenService.verifyToken(
      accessToken,
      TokenType.AccessToken
    )
    if (!payload) {
      throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED)
    }
    return super.canActivate(context)
  }

  /**
   * Handle request and verify if exist an error or there's not user
   * @param error
   * @param user
   * @returns user || error
   */
  handleRequest(error, user) {
    if (error || !user) {
      throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED)
    }
    return user
  }
}
