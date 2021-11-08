import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { ForumEntity } from '../entities/forum.entity'

@EntityRepository(ForumEntity)
export class ForumRepository extends Repository<ForumEntity> {
  public getDataAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[userEntities: ForumEntity[], totalUsers: number]> {
    const {
      skip,
      limit: take,
      order,
      condition,
      random,
      query: { search }
    } = pagination
    const query = this.createQueryBuilder('forums')

    query.leftJoinAndSelect('forums.photo', 'photo')
    query.leftJoinAndSelect('forums.category', 'category')
    query.leftJoinAndSelect('forums.author', 'author')
    query.leftJoinAndSelect('forums.like', 'like')
    query.leftJoinAndSelect('like.users', 'users')
    query.leftJoinAndSelect('forums.comments', 'comments')
    if (condition) {
      query.where(condition)
    }

    query.skip(skip)
    query.take(take)
    if (random) {
      query.orderBy('RAND()')
    } else {
      query.orderBy(order)
    }

    if (search) {
      query.where(
        `
        forums.title LIKE :search
        OR
        category.name LIKE :search
            `,
        { search: `%${search}%` }
      )
    }

    return query.getManyAndCount()
  }
}
