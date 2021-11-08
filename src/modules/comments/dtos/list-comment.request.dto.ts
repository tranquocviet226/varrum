import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ListCommentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string
}
