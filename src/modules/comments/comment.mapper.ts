import { ForumEntity } from '@modules/forums/posts/entities/forum.entity'
import { UserEntity } from '@modules/users/entities/user.entity'
import { UserMapper } from '@modules/users/user.mapper'
import { CommentRequestDto } from './dtos/comment.request.dto'
import { CommentResponseDto } from './dtos/comment.response.dto'
import { CommentEntity } from './entities/comment.entity'

export class CommentMapper {
  public static toCreateEntity(user: UserEntity, dto: CommentRequestDto) {
    const entity = new CommentEntity()
    entity.content = dto.content
    entity.parentId = new CommentEntity({ id: dto.parent_id })
    entity.user = user
    entity.forum = new ForumEntity({ id: dto.forum_id })
    return entity
  }

  public static async toDto(entity: CommentEntity) {
    const dto = new CommentResponseDto()
    dto.id = entity.id
    dto.content = entity.content
    dto.parentId = new CommentEntity(entity.parentId)
    dto.user = await UserMapper.toDto(entity.user)
    dto.createdAt = entity.createdAt
    dto.updatedAt = entity.updatedAt
    return dto
  }
}
