import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { ApiProperty } from '@nestjs/swagger'
import { PermissionResponseDto } from '../../permissions/dtos'
import { RoleResponseDto } from '../../roles/dtos'

export class UserResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  fullname: string

  @ApiProperty()
  email: string

  @ApiProperty()
  avatar?: PhotoEntity

  @ApiProperty({ type: [RoleResponseDto] })
  roles?: RoleResponseDto[]

  @ApiProperty({ type: [PermissionResponseDto] })
  permissions?: PermissionResponseDto[]

  @ApiProperty()
  isSuperUser: boolean

  @ApiProperty()
  status: string
}
