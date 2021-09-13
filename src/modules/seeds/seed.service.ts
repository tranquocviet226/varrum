import { CommonException } from '@common/exceptions'
import { MessageResponse } from '@common/interceptors/message.response'
import { Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { HashHelper } from 'src/helpers'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { Connection, In } from 'typeorm'
import { UserStatus } from '../../interfaces/enums/user-status.enum'
import { PermissionEntity } from '../permissions/permission.entity'
import { RoleEntity } from '../roles/role.entity'
import { UserEntity } from '../users/entities/user.entity'
import { RolesPermissions } from './roles-permission.sseed'

const users = [
  {
    email: 'tranquocviet226@gmail.com',
    password: 'Khoqua226',
    fullname: 'Admin',
    isSuperUser: true,
    status: UserStatus.Active
  }
]

@Injectable()
export class SeedService {
  constructor(private readonly connection: Connection) { }

  public async createSeed(): Promise<MessageResponse> {
    try {
      const roleNames = Object.keys(RolesPermissions)
      // Distinct permissions contained in all roles
      const permissions = _.uniqBy(
        roleNames.reduce((acc, roleName) => {
          return acc.concat(RolesPermissions[roleName])
        }, []),
        'slug'
      )
      // Getting slugs form permissions
      const permissionSlugs = permissions.map((p) => p.slug)
      // Getting existing permissions from the DB
      const existingPermissions = await this.connection.manager.find(
        PermissionEntity,
        { where: { slug: In(permissionSlugs) } }
      )
      // Mapping all permissions to permission entities
      const validPermissions = permissions.map((p) => {
        const existing = existingPermissions.find((e) => e.slug === p.slug)
        if (existing) {
          return existing
        }
        return new PermissionEntity(p)
      })
      // Creating / updating permissions
      const savedPermissions = (
        await this.connection.manager.save(validPermissions)
      ).reduce((acc, p) => {
        return { ...acc, [p.slug]: p }
      }, {})

      // Creating roles
      const roles = roleNames.map((name) => {
        const permissions = Promise.resolve(
          RolesPermissions[name].map((p) => savedPermissions[p.slug])
        )
        return new RoleEntity({ name: name, permissions: permissions })
      })
      const savedRoles = await this.connection.manager.save(roles)
      // Creating users
      const entities = await Promise.all(
        users.map(async (u) => {
          const roles = Promise.resolve(savedRoles)
          const password = await HashHelper.encrypt(u.password)
          const user = new UserEntity({
            ...u,
            password: password,
            roles: roles
          })
          return user
        })
      )
      await this.connection.manager.save(entities)
      return { message: MessageSuccesses.SUECCESS }
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }
}
