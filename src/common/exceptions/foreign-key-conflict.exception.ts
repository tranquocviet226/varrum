import { ConflictException } from '@nestjs/common'
import { ErrorType } from '../../interfaces/enums'

export class ForeignKeyConflictException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.ForeignKeyConflict,
      message: `Foreign key conflict`
    })
  }
}
