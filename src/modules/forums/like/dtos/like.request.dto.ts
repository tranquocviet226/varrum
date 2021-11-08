import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LikeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  forum_id: string
}
