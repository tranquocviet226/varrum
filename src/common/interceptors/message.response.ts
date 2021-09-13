import { ApiProperty } from '@nestjs/swagger'

export class MessageResponse {
  @ApiProperty()
  message: string
}
