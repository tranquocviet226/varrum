import { PaginationRequest } from '@common/interfaces'
import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { CategoryEntity } from '../entities/category.entity'

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
    public getDataAndCount(
        pagination: PaginationRequest<QueryRequest>
    ): Promise<[userEntities: CategoryEntity[], totalUsers: number]> {
        const {
            skip,
            limit: take,
            order,
            query: { search }
        } = pagination
        const query = this.createQueryBuilder('categories')
            .innerJoinAndSelect('categories.photo', 'photo')
            .skip(skip)
            .take(take)
            .orderBy(order)
        if (search) {
            query.where(
                `categories.name LIKE :search`,
                { search: `%${search}%` }
            )
        }

        return query.getManyAndCount()
    }

    async getOneOrFail(value: string): Promise<CategoryEntity> {
        return await this.createQueryBuilder('categories')
            .where('categories.id = :id OR categories.name = :name', {
                id: value,
                name: value
            })
            .getOneOrFail()
    }
}
