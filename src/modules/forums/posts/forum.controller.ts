import { PaginationParams } from '@common/decorators'
import { PaginationResponseDto } from '@common/dtos'
import { PaginationRequest } from '@common/interfaces'
import {
  CurrentUser,
  JwtAuthGuard,
  PermissionsGuard,
  TOKEN_NAME
} from '@modules/auths'
import { UserEntity } from '@modules/users/entities/user.entity'
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { QueryRequest } from 'src/helpers/query.request'
import { CreateForumDto } from './dtos/create-forum.dto'
import { DeleteForumDto } from './dtos/delete-forum.dto'
import { ForumResponseDto } from './dtos/forum-response.dto'
import { ShowForumDto } from './dtos/show-forum.dto'
import { UpdateForumDto } from './dtos/update-fotum.dto'
import { ForumService } from './forum.service'

@ApiTags('Forums Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('forums')
export class ForumController {
  constructor(private readonly postService: ForumService) {}

  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'forums.createdAt'
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'ASC || DESC'
  })
  @ApiQuery({
    name: 'condition',
    required: false,
    description: 'category.id = "d4afd93b-69dd-49d3-86fc-531372975957"'
  })
  @ApiQuery({
    name: 'random',
    required: false,
    description: 'false'
  })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  public listPosts(
    @Headers() headers,
    @PaginationParams() pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<ForumResponseDto>> {
    return this.postService.listPosts(pagination, headers)
  }

  @ApiParam({
    name: 'id',
    example: 'e92694a3-90a9-44f5-94a2-9cfe07e3c141',
    required: true
  })
  @Get(':id')
  public showPost(
    @Param(ValidationPipe) postDto: ShowForumDto,
    @Headers() headers
  ) {
    return this.postService.showPost(postDto, headers)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  public createPost(
    @CurrentUser() currentUser: UserEntity,
    @Body(ValidationPipe) postDto: CreateForumDto
  ) {
    return this.postService.createPost(postDto, currentUser)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public updatePost(@Body(ValidationPipe) postDto: UpdateForumDto) {
    return this.postService.updatePost(postDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public deletePost(@Body(ValidationPipe) postDto: DeleteForumDto) {
    return this.postService.deletePost(postDto)
  }
}
