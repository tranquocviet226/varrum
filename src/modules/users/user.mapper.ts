import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { RoleMapper } from 'src/modules/roles/role.mapper'
import { UserStatus } from '../../interfaces/enums/user-status.enum'
import { PermissionMapper } from '../permissions/permission.mapper'
import { RoleEntity } from '../roles/role.entity'
import { CreateUserRequestDto, UserResponseDto } from './dtos'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UpdateUserRequestDto } from './dtos/update-user.request.dto'
import { UserEntity } from './entities/user.entity'

export class UserMapper {

  public static async toDto(entity: UserEntity): Promise<UserResponseDto> {
    const dto = new UserResponseDto()
    dto.id = entity.id
    dto.avatar = (await Promise.resolve(entity.avatar))
    dto.fullname = entity.fullname
    dto.email = entity.email
    dto.roles = await Promise.all((await entity.roles).map(RoleMapper.toDto))
    dto.status = entity.status
    dto.isSuperUser = entity.isSuperUser
    return dto
  }

  public static async toDtoWithRelations(
    entity: UserEntity
  ): Promise<UserResponseDto> {
    const dto = new UserResponseDto()
    dto.id = entity.id
    dto.fullname = entity.fullname
    dto.email = entity.email
    dto.avatar = (await entity.avatar)
    dto.permissions = await Promise.resolve(entity.permissions)
    dto.roles = await Promise.all(
      (await entity.roles).map(RoleMapper.toDtoWithRelations)
    )
    dto.isSuperUser = entity.isSuperUser
    dto.status = entity.status
    return dto
  }

  public static toCreateEntity(
    dto: CreateUserRequestDto,
    UserRoleId: [number]
  ): UserEntity {
    const entity = new UserEntity()
    entity.fullname = dto.fullname
    entity.avatar = dto.avatar_id && Promise.resolve(new PhotoEntity({ id: dto.avatar_id }))
    entity.email = dto.email || null
    entity.password = dto.password
    entity.roles = Promise.resolve(
      UserRoleId.map((id) => new RoleEntity({ id: id }))
    )
    entity.status = UserStatus.Inactive
    entity.isSuperUser = false
    return entity
  }

  public static toUpdateEntity(
    entity: UserEntity,
    dto: UpdateUserRequestDto
  ): UserEntity {
    entity.fullname = dto.fullname
    entity.password = dto.password
    return entity
  }

  public static toUpdateEntityById(
    entity: UserEntity,
    dto: UpdateUserIdRequestDto
  ): UserEntity {
    entity.fullname = dto.fullname
    entity.email = dto.avatar
    entity.password = dto.password
    entity.status = dto.status
    return entity
  }
}
