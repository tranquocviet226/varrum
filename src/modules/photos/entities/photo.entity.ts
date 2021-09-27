import { BaseEntity } from '@database/entities'
import { CategoryEntity } from '@modules/categories/entities/category.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'photos' })
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false
  })
  name: string

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true
  })
  active: boolean

  @OneToMany(() => CategoryEntity, (category) => category.photo)
  categories: CategoryEntity[]

  constructor(photos?: Partial<PhotoEntity>) {
    super()
    Object.assign(this, photos)
  }
}
