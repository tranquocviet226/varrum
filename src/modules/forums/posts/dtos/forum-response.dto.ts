import { CategoryResponseDto } from '@modules/forums/categories/dtos/category-response.dto'
import { PhotoResponseDto } from '@modules/photos/dtos/photo.response.dto'
import { UserResponseDto } from '@modules/users/dtos'
import { ApiProperty } from '@nestjs/swagger'

export class ForumResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  views: number

  @ApiProperty()
  likes: number

  @ApiProperty()
  userLike?: boolean

  @ApiProperty()
  commentCount?: number

  @ApiProperty()
  photo?: PhotoResponseDto

  @ApiProperty()
  author?: UserResponseDto

  @ApiProperty()
  category?: CategoryResponseDto

  @ApiProperty()
  hash_tag: string

  @ApiProperty()
  createdAt: Date
}
