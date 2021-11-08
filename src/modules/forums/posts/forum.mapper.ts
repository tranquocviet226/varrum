import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { PhotoMapper } from '@modules/photos/photo.mapper'
import { UserEntity } from '@modules/users/entities/user.entity'
import { UserMapper } from '@modules/users/user.mapper'
import { CategoryMapper } from '../categories/category.mapper'
import { ForumsCategoryEntity } from '../categories/entities/category.entity'
import { CreateForumDto } from './dtos/create-forum.dto'
import { ForumResponseDto } from './dtos/forum-response.dto'
import { UpdateForumDto } from './dtos/update-fotum.dto'
import { ForumEntity } from './entities/forum.entity'

export class ForumMapper {
  public static toCreateEntity(
    dto: CreateForumDto,
    currentUser: UserEntity
  ): ForumEntity {
    const entity = new ForumEntity()
    entity.title = dto.title
    entity.photo =
      dto.photo_id && Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.content = dto.content
    entity.author = Promise.resolve(new UserEntity(currentUser))
    entity.category = Promise.resolve(
      new ForumsCategoryEntity({ id: dto.category_id })
    )
    entity.hashTag = dto.hash_tag
    return entity
  }

  public static toUpdateEntity(
    entity: ForumEntity,
    dto: UpdateForumDto
  ): ForumEntity {
    entity.title = dto.title
    entity.photo =
      dto.photo_id && Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.content = dto.content
    entity.category =
      dto.category_id &&
      Promise.resolve(new ForumsCategoryEntity({ id: dto.category_id }))
    entity.hashTag = dto.hash_tag
    return entity
  }

  public static async toDtoWithRelations(entity: ForumEntity, userId?: string) {
    const dto = new ForumResponseDto()
    const likeArr = await entity.like
    let isLike = false
    if (likeArr.length > 0 && userId) {
      const result = likeArr.find((item) => item?.users?.id === userId)
      if (result) isLike = true
    }
    dto.id = entity.id
    dto.title = entity.title
    dto.photo = PhotoMapper.toDto(await entity.photo)
    dto.content = entity.content
    dto.views = entity.views
    dto.likes = entity.likes
    dto.userLike = isLike
    dto.commentCount = (await entity.comments).length
    dto.author = await UserMapper.toDto(await entity.author)
    dto.category = await CategoryMapper.toDto(await entity.category)
    dto.hash_tag = entity.hashTag
    dto.createdAt = entity.createdAt
    return dto
  }
}
