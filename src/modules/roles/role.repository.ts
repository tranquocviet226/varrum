import { PaginationRequest } from '@common/interfaces'
import { SearchRequest } from 'src/interfaces/search.interface'
import { EntityRepository, Repository } from 'typeorm'
import { RoleEntity } from './role.entity'

@EntityRepository(RoleEntity)
export class RolesRepository extends Repository<RoleEntity> {
  /**
   * Get roles list
   * @param pagination {PaginationRequest}
   * @returns [roleEntities: RoleEntity[], totalRoles: number]
   */
  public getRolesAndCount(
    pagination: PaginationRequest<SearchRequest>
  ): Promise<[roleEntities: RoleEntity[], totalRoles: number]> {
    const {
      skip,
      limit: take,
      order,
      query: { search }
    } = pagination
    const query = this.createQueryBuilder('r')
      .innerJoinAndSelect('r.permissions', 'p')
      .skip(skip)
      .take(take)
      .orderBy(order)
    if (search) {
      query.where('name ILIKE :search', { search: `%${search}%` })
    }

    return query.getManyAndCount()
  }
}
