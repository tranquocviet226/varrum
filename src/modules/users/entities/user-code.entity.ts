import { BaseEntity } from 'src/database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'admin', name: 'users_codes' })
export class UserCodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  email: string

  @Column({
    name: 'email_code',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  emailCode: string

  @Column({
    name: 'phone_code',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  phoneCode: string

  @Column({
    name: 'expires',
    type: 'timestamp',
    nullable: true
  })
  expires: Date

  @Column({
    name: 'verified',
    nullable: false,
    default: false
  })
  verified: boolean

  constructor(user?: Partial<UserCodeEntity>) {
    super()
    Object.assign(this, user)
  }
}
