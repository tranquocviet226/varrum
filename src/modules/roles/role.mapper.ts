import { PermissionEntity } from '../permissions/permission.entity'
import { PermissionMapper } from '../permissions/permission.mapper'
import { CreateRoleRequestDto, RoleResponseDto } from './dtos'
import { RoleEntity } from './role.entity'

export class RoleMapper {
  public static toDto(entity: RoleEntity): RoleResponseDto {
    const dto = new RoleResponseDto()
    dto.id = entity.id
    dto.name = entity.name
    dto.active = entity.active
    return dto
  }

  public static async toDtoWithRelations(
    entity: RoleEntity
  ): Promise<RoleResponseDto> {
    const dto = new RoleResponseDto()
    dto.id = entity.id
    dto.name = entity.name
    dto.permissions = await Promise.all(
      (await entity.permissions).map(PermissionMapper.toDto)
    )
    dto.active = entity.active
    return dto
  }

  public static toCreateEntity(dto: CreateRoleRequestDto): RoleEntity {
    const entity = new RoleEntity()
    entity.name = dto.name
    entity.permissions = Promise.resolve(
      dto.permissions.map((id) => new PermissionEntity({ id: id }))
    )
    entity.active = true
    return entity
  }
}
