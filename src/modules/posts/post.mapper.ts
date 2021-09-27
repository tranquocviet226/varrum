import { CategoryMapper } from '@modules/categories/category.mapper'
import { CategoryEntity } from '@modules/categories/entities/category.entity'
import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { PhotoMapper } from '@modules/photos/photo.mapper'
import { UserEntity } from '@modules/users/entities/user.entity'
import { UserMapper } from '@modules/users/user.mapper'
import { CreatePostDto } from './dtos/create-post.dto'
import { PostResponseDto } from './dtos/post-response.dto'
import { UpdatePostDto } from './dtos/update-post.dto'
import { PostEntity } from './entities/post.entity'

export class PostMapper {
  public static toCreateEntity(
    dto: CreatePostDto,
    currentUser: UserEntity
  ): PostEntity {
    const entity = new PostEntity()
    entity.title = dto.title
    entity.photo =
      dto.photo_id && Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.content = dto.content
    entity.author = Promise.resolve(new UserEntity(currentUser))
    entity.categories = Promise.resolve(
      dto.categories_id.map((id) => new CategoryEntity({ id: id }))
    )
    entity.hashTag = dto.hash_tag
    entity.date = dto.date
    return entity
  }

  public static toUpdateEntity(
    entity: PostEntity,
    dto: UpdatePostDto
  ): PostEntity {
    entity.title = dto.title
    entity.photo =
      dto.photo_id && Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.content = dto.content
    entity.categories =
      dto.categories_id &&
      Promise.resolve(
        dto.categories_id.map((id) => new CategoryEntity({ id: id }))
      )
    entity.hashTag = dto.hash_tag
    entity.date = dto.date
    return entity
  }

  public static async toDtoWithRelations(entity: PostEntity) {
    const dto = new PostResponseDto()
    dto.id = entity.id
    dto.title = entity.title
    dto.photo = PhotoMapper.toDto(await entity.photo)
    dto.content = entity.content
    dto.views = entity.views
    dto.author = await UserMapper.toDto(await entity.author)
    dto.categories = await Promise.all(
      (await entity.categories).map(CategoryMapper.toDto)
    )
    dto.hash_tag = entity.hashTag
    dto.date = entity.date
    return dto
  }
}
