import { CommonException } from '@common/exceptions'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ForumRepository } from '../posts/repositories/forum.repository'
import { LikeRequestDto } from './dtos/like.request.dto'
import { LikeMapper } from './like.mapper'
import { LikeRepository } from './like.repository'

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private forumRepository: ForumRepository
  ) {}

  async like(user: UserEntity, dto: LikeRequestDto) {
    const forum = await this.forumRepository.findOne({ id: dto.forum_id })
    if (!forum)
      throw new CommonException(
        ErrorType.ID_NOT_FOUND,
        ErrorMessage.ID_NOT_FOUND
      )
    let like = await this.likeRepository.findOne({
      users: user,
      forums: forum
    })

    if (like) {
      // unlike
      await this.likeRepository.remove(like)
      forum.likes = forum.likes - 1
      await this.forumRepository.save(forum)
      return { like: false }
    } else {
      // like
      like = LikeMapper.toCreateEntity(user, forum)
      like = await this.likeRepository.save(like)
      forum.likes = forum.likes + 1
      await this.forumRepository.save(forum)
      return { like: true }
    }
  }
}
