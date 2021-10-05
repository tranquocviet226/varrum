import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { Status } from 'src/interfaces/enums/status.enum'
import { CategoryResponseDto } from './dtos/category-response.dto'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { CategoryEntity } from './entities/category.entity'

export class CategoryMapper {
  public static async toDto(entity: CategoryEntity) {
    const dto = new CategoryResponseDto()
    dto.id = entity.id
    dto.name = entity.name
    dto.color = entity.color
    dto.photo = await Promise.resolve(entity.photo)
    dto.status = entity.status
    return dto
  }

  public static toCreateEntity(dto: CreateCategoryDto): CategoryEntity {
    const entity = new CategoryEntity()
    entity.name = dto.name
    entity.color = dto.color
    entity.photo = Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.status = Status.ACTIVE
    return entity
  }

  public static toUpdateEntity(
    entity: CategoryEntity,
    dto: UpdateCategoryDto
  ): CategoryEntity {
    entity.name = dto.name
    entity.color = dto.color
    entity.photo = Promise.resolve(new PhotoEntity({ id: dto.photo_id }))
    entity.status = dto.status
    return entity
  }
}
