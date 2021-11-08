import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { LikeEntity } from './entities/like.entity'

@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {
  public getPhotosAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[photosEntities: LikeEntity[], totalPhotos: number]> {
    const {
      skip,
      limit: take,
      order,
      condition,
      query: { search }
    } = pagination

    const query = this.createQueryBuilder('likes')
    if (condition) {
      query.where(condition)
    }
    query.skip(skip)
    query.take(take)
    query.orderBy(order)

    if (search) {
      query.where(
        `
        likes.name LIKE :search
                    `,
        { search: `%${search}%` }
      )
    }

    return query.getManyAndCount()
  }
}
