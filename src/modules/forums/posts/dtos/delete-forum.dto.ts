import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IdVerify } from '../validate/id-verify'

export class DeleteForumDto {
  @ApiProperty({
    example: '7715d151-d798-416a-b3cb-399b1f1d6693'
  })
  @IsNotEmpty()
  @IdVerify({
    message: 'id not found'
  })
  id: string
}
