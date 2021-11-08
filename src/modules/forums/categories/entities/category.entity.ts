import { ForumEntity } from '@modules/forums/posts/entities/forum.entity'
import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { BaseEntity } from 'src/database/entities/base.entity'
import { Status } from 'src/interfaces/enums/status.enum'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'forums_categories' })
export class ForumsCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false
  })
  name: string

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true
  })
  description: string

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
    default: Status.ACTIVE
  })
  status: string

  @Column({
    name: 'color',
    type: 'varchar',
    nullable: true
  })
  color: string

  @ManyToOne(() => PhotoEntity, (photo) => photo.categories, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({ name: 'image_id' })
  photo: Promise<PhotoEntity>

  @OneToMany(() => ForumEntity, (forum) => forum.category)
  forums: Promise<ForumEntity[]>

  constructor(user?: Partial<ForumsCategoryEntity>) {
    super()
    Object.assign(this, user)
  }
}
