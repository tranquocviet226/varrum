import { ApiProperty } from '@nestjs/swagger'

/**
 * Dto for the response
 */
export class ResponseDto<T> {
  @ApiProperty()
  payload: T
  @ApiProperty({ example: '2021-06-23T14:08:14.933Z' })
  timestamp: string
}
