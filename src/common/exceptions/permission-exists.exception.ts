import { ConflictException } from '@nestjs/common'
import { ErrorType } from '../../interfaces/enums'

export class PermissionExistsException extends ConflictException {
  constructor(slug: string) {
    super({
      errorType: ErrorType.PermissionExists,
      message: `There's a permission with slug '${slug}'`
    })
  }
}
