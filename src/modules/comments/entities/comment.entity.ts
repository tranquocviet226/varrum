import { BaseEntity } from '@database/entities'
import { ForumEntity } from '@modules/forums/posts/entities/forum.entity'
import { UserEntity } from '@modules/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'content',
    type: 'varchar',
    nullable: false
  })
  content: string

  //   @Column({
  //     name: 'parent_id',
  //     type: 'varchar',
  //     nullable: true
  //   })
  //   parentId: string

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @ManyToOne(() => ForumEntity, (forum) => forum.comments, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'forum_id' })
  forum: ForumEntity

  @ManyToOne(() => CommentEntity, (comment) => comment.parentId, {
    nullable: true
  })
  @JoinColumn({ name: 'parent_id' })
  parentId?: CommentEntity

  constructor(comments?: Partial<CommentEntity>) {
    super()
    Object.assign(this, comments)
  }
}
