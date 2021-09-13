import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  ValidationPipe
} from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { EmailRequestDto } from '../users/dtos/refresh-verify.request.dto'
import {
  AuthCredentialsRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  TokenDto,
  ValidateTokenRequestDto,
  ValidateTokenResponseDto
} from './dtos'
import { RefreshVerifyAccountResponseDto } from './dtos/refresh-verify-account.response.dto'
import { VerifyAccountRequestDto } from './dtos/verify-account.request.dto'
import { VerifyAccountResponseDto } from './dtos/verify-account.response.dto'
import { AuthService, TokenService } from './services'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/login')
  login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsRequestDto
  ): Promise<LoginResponseDto> {
    return this.authService.login(authCredentialsDto)
  }

  @ApiOperation({ description: 'Renew access in the application' })
  @ApiOkResponse({ description: 'token successfully renewed' })
  @ApiUnauthorizedResponse({
    description: 'Refresh token invalid or expired'
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/refresh')
  getNewToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenRequestDto
  ): TokenDto {
    const { refreshToken } = refreshTokenDto
    return this.tokenService.generateRefreshToken(refreshToken)
  }

  @ApiOperation({ description: 'Validate token' })
  @ApiOkResponse({ description: 'Validation was successful' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/validate')
  validateToken(
    @Body(ValidationPipe) validateToken: ValidateTokenRequestDto
  ): Promise<ValidateTokenResponseDto> {
    const { token } = validateToken
    return this.tokenService.validateToken(token)
  }

  @Get('/token/verify')
  @Render('verify-email')
  verifyAccount(
    @Query() query: VerifyAccountRequestDto
  ): Promise<VerifyAccountResponseDto> {
    return this.tokenService.verifyAccount(query)
  }

  @Post('/token/verify-refresh')
  refreshVerifyAccount(
    @Body() dto: EmailRequestDto
  ): Promise<RefreshVerifyAccountResponseDto> {
    return this.authService.refreshVerifyAccount(dto)
  }
}
