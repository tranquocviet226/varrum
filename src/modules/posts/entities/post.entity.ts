import { CategoryEntity } from '@modules/categories/entities/category.entity'
import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { UserEntity } from '@modules/users/entities/user.entity'
import { BaseEntity } from 'src/database/entities/base.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false
  })
  title: string

  @Column({
    name: 'content',
    type: 'longtext'
  })
  content: string

  @Column({
    name: 'description',
    type: 'longtext',
    nullable: true
  })
  description: string

  @Column({
    name: 'views',
    type: 'int',
    default: 0
  })
  views: number

  @Column({
    name: 'hash_tag',
    type: 'varchar',
    nullable: true
  })
  hashTag: string

  @Column({
    name: 'date',
    type: 'date',
    nullable: true
  })
  date: Date

  @ManyToOne(() => PhotoEntity, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({ name: 'photo_id' })
  photo: Promise<PhotoEntity>

  @ManyToOne(() => UserEntity, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({ name: 'author_id' })
  author: Promise<UserEntity>

  @ManyToMany(() => CategoryEntity, (category) => category.id, {
    lazy: true,
    cascade: true
  })
  @JoinTable({
    name: 'posts_categories',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id'
    }
  })
  categories: Promise<CategoryEntity[]>

  constructor(user?: Partial<PostEntity>) {
    super()
    Object.assign(this, user)
  }
}
