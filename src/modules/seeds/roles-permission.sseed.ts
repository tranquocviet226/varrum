import { EPermissions } from "src/interfaces/enums/permissions.enum";

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
            slug: EPermissions.ADMIN_ACCESS_CLASSES_LIST,
            description: 'List classes'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CLASSES_CREATE,
            description: 'Create classes'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CLASSES_READ,
            description: 'Read classes'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CLASSES_UPDATE,
            description: 'Update classes'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CLASSES_DELETE,
            description: 'Delete classes'
        },

        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_LIST,
            description: 'List subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_CREATE,
            description: 'Create subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_READ,
            description: 'Read subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_UPDATE,
            description: 'Update subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_DELETE,
            description: 'Delete subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_LIST,
            description: 'List chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_CREATE,
            description: 'Create chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_READ,
            description: 'Read chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_UPDATE,
            description: 'Update chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_DELETE,
            description: 'Delete chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_LIST,
            description: 'List chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_CREATE,
            description: 'Create chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_READ,
            description: 'Read chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_UPDATE,
            description: 'Update chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_DELETE,
            description: 'Delete chapter'
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
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CLASSES_LIST,
            description: 'List classes'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CLASSES_READ,
            description: 'Read classes'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_LIST,
            description: 'List subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_SUBJECTS_READ,
            description: 'Read subject'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_LIST,
            description: 'List chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_CHAPTERS_READ,
            description: 'Read chapter'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_LIST,
            description: 'List lesson'
        },
        {
            slug: EPermissions.ADMIN_ACCESS_LESSONS_READ,
            description: 'Read lesson'
        }
    ]
}