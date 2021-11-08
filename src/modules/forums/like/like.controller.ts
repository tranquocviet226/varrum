import { MessageResponse } from '@common/interceptors/message.response'
import {
  CurrentUser,
  JwtAuthGuard,
  PermissionsGuard,
  TOKEN_NAME
} from '@modules/auths'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { LikeRequestDto } from './dtos/like.request.dto'
import { LikeService } from './like.service'

@ApiTags('Like Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('likes')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  like(
    @CurrentUser() currentUser: UserEntity,
    @Body() request: LikeRequestDto
  ) {
    return this.likeService.like(currentUser, request)
  }
}
