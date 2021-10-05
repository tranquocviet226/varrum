import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { BannerEntity } from './entities/banner.entity'

@EntityRepository(BannerEntity)
export class BannerRepository extends Repository<BannerEntity> {
  public getPhotosAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[bannerEntities: BannerEntity[], totalPhotos: number]> {
    const {
      skip,
      limit: take,
      order,
      condition,
      query: { search }
    } = pagination

    const query = this.createQueryBuilder('banners')
    if (condition) {
      query.where(condition)
    }
    query.skip(skip)
    query.take(take)
    query.orderBy(order)

    if (search) {
      query.where(
        `
        banners.name LIKE :search
        `,
        { search: `%${search}%` }
      )
    }

    return query.getManyAndCount()
  }
}
