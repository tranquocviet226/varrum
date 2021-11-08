import { PaginationParams } from '@common/decorators'
import { PaginationResponseDto } from '@common/dtos'
import { PaginationRequest } from '@common/interfaces'
import {
  CurrentUser,
  JwtAuthGuard,
  PermissionsGuard,
  TOKEN_NAME
} from '@modules/auths'
import { PostResponseDto } from '@modules/posts/dtos/post-response.dto'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { QueryRequest } from 'src/helpers/query.request'
import { CommentService } from './comment.service'
import { CommentRequestDto } from './dtos/comment.request.dto'
import { CommentResponseDto } from './dtos/comment.response.dto'
import { ListCommentRequestDto } from './dtos/list-comment.request.dto'
import { CommentEntity } from './entities/comment.entity'

@ApiTags('Comment Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  comment(
    @CurrentUser() currentUser: UserEntity,
    @Body() request: CommentRequestDto
  ) {
    return this.commentService.comment(currentUser, request)
  }

  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'posts.createdAt'
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'ASC || DESC'
  })
  @ApiQuery({
    name: 'condition',
    required: false,
    description: 'categories.id = "d4afd93b-69dd-49d3-86fc-531372975957"'
  })
  @ApiQuery({
    name: 'random',
    required: false,
    description: 'false'
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiParam({
    name: 'id',
    example: '072ae93f-75ec-4544-b264-8c5e37e80acc',
    required: true
  })
  @Get(':id')
  public listComment(
    @Param() id: ListCommentRequestDto,
    @PaginationParams() pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<CommentResponseDto>> {
    return this.commentService.listComments(id, pagination)
  }
}
