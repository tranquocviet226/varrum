import { PhotoEntity } from './entities/photo.entity'

export class UploadMapper {
  public static toCreateEntity(name: string): PhotoEntity {
    const entity = new PhotoEntity()
    entity.name = name
    entity.active = true

    return entity
  }
}
