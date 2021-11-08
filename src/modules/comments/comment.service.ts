import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { PostResponseDto } from '@modules/posts/dtos/post-response.dto'
import { UserEntity } from '@modules/users/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CommentMapper } from './comment.mapper'
import { CommentRepository } from './comment.repository'
import { CommentRequestDto } from './dtos/comment.request.dto'
import { CommentResponseDto } from './dtos/comment.response.dto'
import { ListCommentRequestDto } from './dtos/list-comment.request.dto'
import { CommentEntity } from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async comment(user: UserEntity, dto: CommentRequestDto) {
    try {
      let comment = CommentMapper.toCreateEntity(user, dto)
      comment = await this.commentRepository.save(comment)
      return comment
    } catch (_error) {
      console.log(_error)
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  async listComments(
    id: ListCommentRequestDto,
    pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<CommentResponseDto>> {
    try {
      const [list, count] = await this.commentRepository.getDataAndCount(
        id.id,
        pagination
      )
      const result = await Promise.all(list.map(CommentMapper.toDto))
      return Pagination.of<CommentResponseDto>(pagination, count, result)
    } catch (_error) {
      // console.log(_error)
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }
}
