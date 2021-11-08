import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { PhotoMapper } from '@modules/photos/photo.mapper'
import { Status } from 'src/interfaces/enums/status.enum'
import { CategoryResponseDto } from './dtos/category-response.dto'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { ForumsCategoryEntity } from './entities/category.entity'

export class CategoryMapper {
  public static async toDto(entity: ForumsCategoryEntity) {
    const forums = await entity.forums
    const dto = new CategoryResponseDto()
    dto.id = entity.id
    dto.name = entity.name
    dto.description = entity.description
    dto.color = entity.color
    dto.forumsCount = forums.length
    dto.forum = forums[0]
    dto.photo = PhotoMapper.toDto(await entity.photo)
    dto.status = entity.status
    return dto
  }

  public static toCreateEntity(dto: CreateCategoryDto): ForumsCategoryEntity {
    const entity = new ForumsCategoryEntity()
    entity.name = dto.name
    entity.description = dto.description
    entity.color = dto.color
    entity.photo = Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.status = Status.ACTIVE
    return entity
  }

  public static toUpdateEntity(
    entity: ForumsCategoryEntity,
    dto: UpdateCategoryDto
  ): ForumsCategoryEntity {
    entity.name = dto.name
    entity.color = dto.color
    entity.photo = Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.status = dto.status
    return entity
  }
}
