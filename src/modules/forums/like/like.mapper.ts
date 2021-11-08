import { UserEntity } from '@modules/users/entities/user.entity'
import { ForumEntity } from '../posts/entities/forum.entity'
import { LikeRequestDto } from './dtos/like.request.dto'
import { LikeEntity } from './entities/like.entity'

export class LikeMapper {
  public static toCreateEntity(user: UserEntity, forum: ForumEntity) {
    const entity = new LikeEntity()
    entity.users = user
    entity.forums = forum
    return entity
  }
}
