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
      random,
      query: { search }
    } = pagination
    const query = this.createQueryBuilder('posts')

    query.leftJoinAndSelect('posts.photo', 'photo')
    query.leftJoinAndSelect('posts.categories', 'categories')
    query.leftJoinAndSelect('posts.author', 'author')

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
        posts.title LIKE :search
        OR
        categories.name LIKE :search
            `,
        { search: `%${search}%` }
      )
    }

    return query.getManyAndCount()
  }
}
