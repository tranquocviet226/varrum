import { EPermissions } from 'src/interfaces/enums/permissions.enum'

export const RolesPermissions = {
  Admin: [
    { slug: EPermissions.ADMIN_ACCESS_USERS_READ, description: 'Read users' },
    {
      slug: EPermissions.ADMIN_ACCESS_USERS_CREATE,
      description: 'Create users'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_USERS_UPDATE,
      description: 'Update users'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_USERS_UPDATE_ID,
      description: 'Update users by id'
    },

    { slug: EPermissions.ADMIN_ACCESS_ROLES_READ, description: 'Read Roles' },
    {
      slug: EPermissions.ADMIN_ACCESS_ROLES_CREATE,
      description: 'Create Roles'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_ROLES_UPDATE,
      description: 'Update Roles'
    },

    {
      slug: EPermissions.ADMIN_ACCESS_PERMISSIONS_CREATE,
      description: 'Read permissions'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_PERMISSIONS_READ,
      description: 'Create permissions'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_PERMISSIONS_UPDATE,
      description: 'Update permissions'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_CREATE_CATEGORY,
      description: 'Create category'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_UPDATE_CATEGORY,
      description: 'Update category'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_DELETE_CATEGORY,
      description: 'Delete category'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_CREATE_POST,
      description: 'Create post'
    }
  ],
  User: [
    { slug: EPermissions.ADMIN_ACCESS_USERS_READ, description: 'Read users' },
    {
      slug: EPermissions.ADMIN_ACCESS_USERS_CREATE,
      description: 'Create users'
    },
    {
      slug: EPermissions.ADMIN_ACCESS_USERS_UPDATE,
      description: 'Update users'
    }
  ]
}
