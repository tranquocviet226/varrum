import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false
  })
  updatedAt: Date
}
