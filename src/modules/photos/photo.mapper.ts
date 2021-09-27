import { PhotoResponseDto } from './dtos/photo.response.dto'
import { PhotoEntity } from './entities/photo.entity'

export class PhotoMapper {
  public static toCreateEntity(name: string): PhotoEntity {
    const entity = new PhotoEntity()
    entity.name = name
    entity.active = true

    return entity
  }

  public static toDto(entity: PhotoEntity): PhotoResponseDto {
    const dto = new PhotoResponseDto()
    dto.id = entity?.id || ''
    dto.name = entity?.name || ''
    dto.active = entity?.active || false
    return dto
  }
}
