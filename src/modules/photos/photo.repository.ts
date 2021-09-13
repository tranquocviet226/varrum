import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { PhotoEntity } from './entities/photo.entity'

@EntityRepository(PhotoEntity)
export class PhotoRepository extends Repository<PhotoEntity> {
    public getPhotosAndCount(
        pagination: PaginationRequest<QueryRequest>
    ): Promise<[photosEntities: PhotoEntity[], totalPhotos: number]> {
        const {
            skip,
            limit: take,
            order,
            condition,
            query: { search }
        } = pagination

        const query = this.createQueryBuilder('photos')
        if (condition) {
            query.where(condition)
        }
        query.skip(skip)
        query.take(take)
        query.orderBy(order)

        if (search) {
            query.where(
                `
                    photos.name LIKE :search
                    `,
                { search: `%${search}%` }
            )
        }

        return query.getManyAndCount()
    }
}
