import { BaseEntity } from '@database/entities'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'photos' })
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false
  })
  name: string

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true
  })
  active: boolean

  constructor(photos?: Partial<PhotoEntity>) {
    super()
    Object.assign(this, photos)
  }
}
