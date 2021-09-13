import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { BaseEntity } from 'src/database/entities/base.entity'
import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn
} from 'typeorm'
import { UserStatus } from '../../../interfaces/enums/user-status.enum'
import { PermissionEntity } from '../../permissions/permission.entity'
import { RoleEntity } from '../../roles/role.entity'

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'fullname',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  fullname: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: true,
    unique: true
  })
  email: string

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false
  })
  password: string

  @Column({
    name: 'is_super_user',
    type: 'boolean',
    nullable: false,
    default: false
  })
  isSuperUser: boolean

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
    default: UserStatus.Active
  })
  status: string

  @ManyToMany(() => RoleEntity, (role) => role.id, {
    lazy: true,
    cascade: true
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  roles: Promise<RoleEntity[]>

  @ManyToMany(() => PermissionEntity, (permission) => permission.id, {
    lazy: true,
    cascade: true
  })
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  permissions: Promise<PermissionEntity[]>

  @ManyToOne(() => PhotoEntity, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({name: 'avatar_id'})
  avatar: Promise<PhotoEntity>

  constructor(user?: Partial<UserEntity>) {
    super()
    Object.assign(this, user)
  }
}
