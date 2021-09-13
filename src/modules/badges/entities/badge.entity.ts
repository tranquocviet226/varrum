import { BaseEntity } from 'src/database/entities/base.entity'
import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm'
import { UserStatus } from '../../../interfaces/enums/user-status.enum'

@Entity({ name: 'badges' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'name',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name: string

    @Column({
        name: 'status',
        type: 'varchar',
        nullable: false,
        default: UserStatus.Active
    })
    status: string

    constructor(user?: Partial<UserEntity>) {
        super()
        Object.assign(this, user)
    }
}
