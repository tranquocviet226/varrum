import { DBErrorCode } from 'src/interfaces/enums'
import { PermissionExistsException } from '@common/exceptions'
import {
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TimeoutError } from 'rxjs'
import { CreatePermissionRequestDto, PermissionResponseDto } from './dtos'
import { PermissionMapper } from './permission.mapper'
import { PermissionsRepository } from './permission.repository'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsRepository)
    private permissionsRepository: PermissionsRepository
  ) {}

  /**
   * Create new permission
   * @param permissionDto {CreatePermissionRequestDto}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async createPermission(
    permissionDto: CreatePermissionRequestDto
  ): Promise<PermissionResponseDto> {
    try {
      let permissionEntity = PermissionMapper.toCreateEntity(permissionDto)
      permissionEntity = await this.permissionsRepository.save(permissionEntity)
      return PermissionMapper.toDto(permissionEntity)
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new PermissionExistsException(permissionDto.slug)
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException()
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
