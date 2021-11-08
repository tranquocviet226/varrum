import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { CommentEntity } from './entities/comment.entity'

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  public getDataAndCount(
    id: string,
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[photosEntities: CommentEntity[], totalPhotos: number]> {
    const {
      skip,
      limit: take,
      order,
      condition,
      query: { search }
    } = pagination

    const query = this.createQueryBuilder('comments')
    query.leftJoin('comments.forum', 'forum')
    query.leftJoinAndSelect('comments.parentId', 'parentId')
    query.leftJoinAndSelect('comments.user', 'user')
    query.leftJoinAndSelect('user.avatar', 'avatar')
    query.where('forum.id = :id', { id: id })
    if (condition) {
      query.andWhere(condition)
    }
    query.skip(skip)
    query.take(take)
    query.orderBy(order)

    if (search) {
      query.andWhere(
        `
        comments.name LIKE :search
                    `,
        { search: `%${search}%` }
      )
    }

    return query.getManyAndCount()
  }
}
