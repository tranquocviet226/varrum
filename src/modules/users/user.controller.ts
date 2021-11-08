import { ApiGlobalResponse, PaginationParams } from '@common/decorators'
import { PaginationResponseDto } from '@common/dtos'
import { MessageResponse } from '@common/interceptors/message.response'
import { PaginationRequest } from '@common/interfaces'
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from '@modules/auths'
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { QueryRequest } from 'src/helpers/query.request'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import { UserResponseDto } from './dtos'
import { CreateFbUserRequestDto } from './dtos/create-fb-user.request.dto'
import { CreateUserRequestDto } from './dtos/create-user.request.dto'
import { EmailRequestDto } from './dtos/refresh-verify.request.dto'
import { ResetPasswordRequestDto } from './dtos/reset-password.request.dto'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UpdateUserRequestDto } from './dtos/update-user.request.dto'
import { VerifyCodeResetRequestDto } from './dtos/verify-code-reset.request.dto'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('User Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ description: 'Get list user' })
  @ApiGlobalResponse(UserResponseDto)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ACCESS_USERS_LIST)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'users.createdAt'
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'ASC || DESC'
  })
  @ApiQuery({ name: 'search', required: false })
  @Get('list')
  public listUser(
    @PaginationParams() pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<UserEntity>> {
    return this.usersService.listUser(pagination)
  }

  @ApiOperation({ description: 'Create new user' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiConflictResponse({ description: 'User already exists' })
  @Post()
  public createUser(
    @Body(ValidationPipe) userDto: CreateUserRequestDto
  ): Promise<UserResponseDto> {
    return this.usersService.createUser(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get user infomation' })
  @ApiGlobalResponse(UserResponseDto)
  @Get()
  public getUsers(@CurrentUser() user: UserEntity): Promise<UserResponseDto> {
    return this.usersService.getUsers(user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get user infomation by id' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  public getUserById(@Param() id: string): Promise<UserResponseDto> {
    return this.usersService.getUserById(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Update user' })
  @ApiGlobalResponse(UserResponseDto)
  @Patch()
  public updateUser(
    @CurrentUser() currentUser: UserEntity,
    @Body(ValidationPipe) newUser: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(currentUser, newUser)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ACCESS_USERS_UPDATE_ID)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update user by id' })
  @Patch(':id')
  public updateUserById(
    @Param() id: number,
    @Body(ValidationPipe) newUser: UpdateUserIdRequestDto
  ): Promise<UserResponseDto> {
    return this.usersService.updateUserById(id, newUser)
  }

  @Post('reset-password/send-code')
  public sendCodeResetPassword(
    @Body() emailDto: EmailRequestDto
  ): Promise<MessageResponse> {
    return this.usersService.sendCodeResetPassword(emailDto)
  }

  @Post('reset-password/verify')
  public verifyCodeResetPassword(
    @Body() resetPasswordDto: VerifyCodeResetRequestDto
  ): Promise<MessageResponse> {
    return this.usersService.verifyCodeResetPassword(resetPasswordDto)
  }

  @Post('reset-password')
  public resetPassword(
    @Body() resetPasswordDto: ResetPasswordRequestDto
  ): Promise<UserResponseDto> {
    return this.usersService.resetPassword(resetPasswordDto)
  }

  @ApiOperation({ description: 'Create fb user' })
  @Post('fb-register')
  public createFbUser(@Body(ValidationPipe) userDto: CreateFbUserRequestDto) {
    return this.usersService.createFbUser(userDto)
  }
}
