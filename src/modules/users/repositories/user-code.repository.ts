import { EntityRepository, Repository } from 'typeorm'
import { UserCodeEntity } from '../entities/user-code.entity'

@EntityRepository(UserCodeEntity)
export class UsersCodeRepository extends Repository<UserCodeEntity> {}
