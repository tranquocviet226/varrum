import { BaseEntity } from '@database/entities'
import { ForumEntity } from '@modules/forums/posts/entities/forum.entity'
import { UserEntity } from '@modules/users/entities/user.entity'
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'likes' })
export class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => UserEntity, (user) => user.like)
  @JoinColumn({ name: 'user_id' })
  users: UserEntity

  @ManyToOne(() => ForumEntity, (forum) => forum.like, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'forum_id' })
  forums: ForumEntity

  constructor(likes?: Partial<LikeEntity>) {
    super()
    Object.assign(this, likes)
  }
}
