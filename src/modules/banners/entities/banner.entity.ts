import { BaseEntity } from '@database/entities'
import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'banners' })
export class BannerEntity extends BaseEntity {
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

  @ManyToOne(() => PhotoEntity, {
    lazy: true,
    cascade: true
  })
  @JoinColumn({ name: 'photo_id' })
  photo: Promise<PhotoEntity>

  constructor(banner?: Partial<BannerEntity>) {
    super()
    Object.assign(this, banner)
  }
}
