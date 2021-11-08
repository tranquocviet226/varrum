import { ForumEntity } from '@modules/forums/posts/entities/forum.entity'
import { PhotoResponseDto } from '@modules/photos/dtos/photo.response.dto'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  color: string

  @ApiProperty()
  photo?: PhotoResponseDto

  @ApiProperty()
  forumsCount?: number

  @ApiProperty()
  forum?: ForumEntity

  @ApiProperty()
  views: number

  @ApiProperty()
  status: string
}
