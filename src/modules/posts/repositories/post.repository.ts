import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { PostEntity } from '../entities/post.entity'

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  public getDataAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[userEntities: PostEntity[], totalUsers: number]> {
    const {
      skip,
      limit: take,
      order,
      condition,
      query: { search }
    } = pagination
    const query = this.createQueryBuilder('posts')

    query.leftJoinAndSelect('posts.photo', 'photo')
    query.leftJoinAndSelect('posts.categories', 'categories')

    if (condition) {
      query.where(condition)
    }

    query.skip(skip)
    query.take(take)
    query.orderBy(order)

    if (search) {
      query.where(
        `
        posts.title LIKE :search
            `,
        { search: `%${search}%` }
      )
    }

    return query.getManyAndCount()
  }
}
