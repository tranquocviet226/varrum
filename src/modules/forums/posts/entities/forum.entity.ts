import { CommentEntity } from '@modules/comments/entities/comment.entity'
import { ForumsCategoryEntity } from '@modules/forums/categories/entities/category.entity'
import { LikeEntity } from '@modules/forums/like/entities/like.entity'
import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { UserEntity } from '@modules/users/entities/user.entity'
import { BaseEntity } from 'src/database/entities/base.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'forums' })
export class ForumEntity extends BaseEntity {
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
    name: 'views',
    type: 'int',
    default: 0
  })
  views: number

  @Column({
    name: 'likes',
    type: 'int',
    default: 0
  })
  likes: number

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

  @ManyToOne(() => ForumsCategoryEntity, (category) => category.id, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({ name: 'category_id' })
  category: Promise<ForumsCategoryEntity>

  @OneToMany(() => LikeEntity, (like) => like.forums)
  @JoinColumn({ name: 'id' })
  like: Promise<LikeEntity[]>

  @OneToMany(() => CommentEntity, (comments) => comments.forum)
  @JoinColumn({ name: 'id' })
  comments: Promise<CommentEntity[]>

  constructor(forums?: Partial<ForumEntity>) {
    super()
    Object.assign(this, forums)
  }
}
