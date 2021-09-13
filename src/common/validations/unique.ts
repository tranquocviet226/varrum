import { ValidatorConstraint } from 'class-validator'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UniqueValidator } from './unique.validate'

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class Unique extends UniqueValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection)
  }
}
