import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CommentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  forum_id: string

  @ApiProperty()
  @IsNotEmpty()
  content: string

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  parent_id: string
}
