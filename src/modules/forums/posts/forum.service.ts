import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { TokenService } from '@modules/auths'
import { TokenType } from '@modules/auths/enums'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ForumsCategoryRepository } from '../categories/repositories/category.repository'
import { CreateForumDto } from './dtos/create-forum.dto'
import { DeleteForumDto } from './dtos/delete-forum.dto'
import { ForumResponseDto } from './dtos/forum-response.dto'
import { ShowForumDto } from './dtos/show-forum.dto'
import { UpdateForumDto } from './dtos/update-fotum.dto'
import { ForumMapper } from './forum.mapper'
import { ForumRepository } from './repositories/forum.repository'

@Injectable()
export class ForumService {
  constructor(
    private postRepository: ForumRepository,
    private photoRepository: PhotoRepository,
    private categoryRepository: ForumsCategoryRepository,
    private tokenService: TokenService
  ) {}

  public async listPosts(
    pagination: PaginationRequest<QueryRequest>,
    headers: any
  ): Promise<PaginationResponseDto<ForumResponseDto>> {
    const token = headers?.authorization?.slice(7)
    let userId: string
    if (token !== 'undefined' && token !== undefined) {
      const user = this.tokenService.verifyToken(token, TokenType.AccessToken)
      userId = user?.id
    }
    try {
      let [list, count] = await this.postRepository.getDataAndCount(pagination)
      const result = await Promise.all(
        list.map((entity) => ForumMapper.toDtoWithRelations(entity, userId))
      )
      return Pagination.of<ForumResponseDto>(pagination, count, result)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async showPost(postDto: ShowForumDto, headers: any) {
    try {
      const token = headers?.authorization?.slice(7)
      let userId: string
      if (token !== 'undefined' && token) {
        const user = this.tokenService.verifyToken(token, TokenType.AccessToken)
        userId = user?.id
      }

      let post = await this.postRepository.findOne(
        { id: postDto.id },
        { relations: ['like', 'like.users'] }
      )
      post.views += 1
      post = await this.postRepository.save(post)
      return ForumMapper.toDtoWithRelations(post, userId)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async createPost(
    createPostDto: CreateForumDto,
    currentUser: UserEntity
  ) {
    const photo = await this.photoRepository.findOne({
      id: createPostDto.photo_id
    })
    if (createPostDto.photo_id && !photo)
      throw new CommonException(
        ErrorType.IMAGE_NOT_FOUND,
        ErrorMessage.IMAGE_NOT_FOUND
      )
    const category = await this.categoryRepository.findOne(
      createPostDto.category_id
    )
    if (!category)
      throw new CommonException(
        ErrorType.CATEGORY_NOT_FOUND,
        ErrorMessage.CATEGORY_NOT_FOUND
      )
    try {
      let post = ForumMapper.toCreateEntity(createPostDto, currentUser)
      post = await this.postRepository.save(post)
      post = await this.postRepository.findOne({ id: post.id })
      return ForumMapper.toDtoWithRelations(post)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async updatePost(postDto: UpdateForumDto) {
    try {
      let postEntity = await this.postRepository.findOne({ id: postDto.id })
      const updatePost = ForumMapper.toUpdateEntity(postEntity, postDto)
      await this.postRepository.save(updatePost)
      postEntity = await this.postRepository.findOne({ id: postDto.id })
      return ForumMapper.toDtoWithRelations(postEntity)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async deletePost(postDto: DeleteForumDto) {
    try {
      const post = await this.postRepository.delete({ id: postDto.id })
      return post
    } catch (_error) {
      console.log(_error)
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }
}
