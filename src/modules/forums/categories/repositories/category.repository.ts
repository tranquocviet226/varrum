import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { ForumsCategoryEntity } from '../entities/category.entity'

@EntityRepository(ForumsCategoryEntity)
export class ForumsCategoryRepository extends Repository<ForumsCategoryEntity> {
  public getDataAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[userEntities: ForumsCategoryEntity[], totalUsers: number]> {
    const {
      skip,
      limit: take,
      order,
      query: { search }
    } = pagination
    const query = this.createQueryBuilder('forums_categories')
      .innerJoinAndSelect('forums_categories.photo', 'photo')
      .leftJoinAndSelect('forums_categories.forums', 'forums')
      .skip(skip)
      .take(take)
      .orderBy('forums.createdAt', 'DESC')
    if (search) {
      query.where(`forums_categories.name LIKE :search`, {
        search: `%${search}%`
      })
    }

    return query.getManyAndCount()
  }

  async getOneOrFail(value: string): Promise<ForumsCategoryEntity> {
    return await this.createQueryBuilder('forums_categories')
      .where('forums_categories.id = :id OR forums_categories.name = :name', {
        id: value,
        name: value
      })
      .getOneOrFail()
  }

  async findByMultiId(ids: string[]) {
    return await this.createQueryBuilder('categories')
      .where('categories.id IN (:...ids)', { ids: ids })
      .getMany()
  }
}
