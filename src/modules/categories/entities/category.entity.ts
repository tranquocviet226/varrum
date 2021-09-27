import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { BaseEntity } from 'src/database/entities/base.entity'
import { Status } from 'src/interfaces/enums/status.enum'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  name: string

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
    default: Status.ACTIVE
  })
  status: string

  @ManyToOne(() => PhotoEntity, (photo) => photo.categories, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({ name: 'image_id' })
  photo: Promise<PhotoEntity>

  constructor(user?: Partial<CategoryEntity>) {
    super()
    Object.assign(this, user)
  }
}
