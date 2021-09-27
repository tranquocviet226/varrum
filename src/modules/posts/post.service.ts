import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { CategoryRepository } from '@modules/categories/repositories/category.repository'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CreatePostDto } from './dtos/create-post.dto'
import { DeletePostDto } from './dtos/delete-post.dto'
import { PostResponseDto } from './dtos/post-response.dto'
import { ShowPostDto } from './dtos/show-post.dto'
import { UpdatePostDto } from './dtos/update-post.dto'
import { PostMapper } from './post.mapper'
import { PostRepository } from './repositories/post.repository'

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private photoRepository: PhotoRepository,
    private categoryRepository: CategoryRepository
  ) {}

  public async listPosts(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<PostResponseDto>> {
    try {
      const [list, count] = await this.postRepository.getDataAndCount(
        pagination
      )
      const result = await Promise.all(list.map(PostMapper.toDtoWithRelations))
      return Pagination.of<PostResponseDto>(pagination, count, result)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async showPost(postDto: ShowPostDto) {
    try {
      let post = await this.postRepository.findOne({ id: postDto.id })
      post.views += 1
      post = await this.postRepository.save(post)
      return PostMapper.toDtoWithRelations(post)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async createPost(
    createPostDto: CreatePostDto,
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
    const categoreies = await this.categoryRepository.findByMultiId(
      createPostDto.categories_id
    )
    if (
      (createPostDto.categories_id && categoreies.length <= 0) ||
      (createPostDto.categories_id &&
        categoreies.length > 0 &&
        categoreies.length != createPostDto.categories_id.length)
    )
      throw new CommonException(
        ErrorType.CATEGORY_NOT_FOUND,
        ErrorMessage.CATEGORY_NOT_FOUND
      )
    try {
      let post = PostMapper.toCreateEntity(createPostDto, currentUser)
      post = await this.postRepository.save(post)
      post = await this.postRepository.findOne({ id: post.id })
      return PostMapper.toDtoWithRelations(post)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async updatePost(postDto: UpdatePostDto) {
    try {
      let postEntity = await this.postRepository.findOne({ id: postDto.id })
      const updatePost = PostMapper.toUpdateEntity(postEntity, postDto)
      await this.postRepository.save(updatePost)
      postEntity = await this.postRepository.findOne({ id: postDto.id })
      return PostMapper.toDtoWithRelations(postEntity)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  public async deletePost(postDto: DeletePostDto) {
    try {
      const post = await this.postRepository.delete({ id: postDto.id })
      return post
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }
}
