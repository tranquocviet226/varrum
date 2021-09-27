import { CommonException } from '@common/exceptions'
import { Injectable } from '@nestjs/common'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

@Injectable()
export class SearchService {
  public async search() {
    try {
      return ''
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }
}
