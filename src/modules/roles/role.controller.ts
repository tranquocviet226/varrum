import { ApiGlobalResponse } from '@common/decorators'
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import {
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from '@modules/auths'
import { CreateRoleRequestDto, RoleResponseDto } from './dtos'
import { RolesService } from './role.service'

@ApiTags('Role Controller')
@ApiBearerAuth(TOKEN_NAME)
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('access/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ description: 'Create new role' })
  @ApiGlobalResponse(RoleResponseDto)
  @ApiConflictResponse({ description: 'Role already exists' })
  @Permissions(EPermissions.ADMIN_ACCESS_ROLES_CREATE)
  @Post()
  public createRole(
    @Body(ValidationPipe) roleDto: CreateRoleRequestDto
  ): Promise<RoleResponseDto> {
    return this.rolesService.createRole(roleDto)
  }
}
