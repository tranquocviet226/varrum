import { PaginationParams } from '@common/decorators'
import { PaginationResponseDto } from '@common/dtos'
import { PaginationRequest } from '@common/interfaces'
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from '@modules/auths'
import { UserEntity } from '@modules/users/entities/user.entity'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { QueryRequest } from 'src/helpers/query.request'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import { CreatePostDto } from './dtos/create-post.dto'
import { DeletePostDto } from './dtos/delete-post.dto'
import { PostResponseDto } from './dtos/post-response.dto'
import { ShowPostDto } from './dtos/show-post.dto'
import { UpdatePostDto } from './dtos/update-post.dto'
import { PostService } from './post.service'

@ApiTags('Post Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
  @Get()
  public listPosts(
    @PaginationParams() pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<PostResponseDto>> {
    return this.postService.listPosts(pagination)
  }

  @ApiParam({
    name: 'id',
    example: 'e92694a3-90a9-44f5-94a2-9cfe07e3c141',
    required: true
  })
  @Get(':id')
  public showPost(@Param(ValidationPipe) postDto: ShowPostDto) {
    return this.postService.showPost(postDto)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ACCESS_CREATE_POST)
  @Post()
  public createPost(
    @CurrentUser() currentUser: UserEntity,
    @Body(ValidationPipe) postDto: CreatePostDto
  ) {
    return this.postService.createPost(postDto, currentUser)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public updatePost(@Body(ValidationPipe) postDto: UpdatePostDto) {
    return this.postService.updatePost(postDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public deletePost(@Body(ValidationPipe) postDto: DeletePostDto) {
    return this.postService.deletePost(postDto)
  }
}
