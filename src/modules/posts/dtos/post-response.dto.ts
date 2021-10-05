import { CategoryResponseDto } from '@modules/categories/dtos/category-response.dto'
import { PhotoResponseDto } from '@modules/photos/dtos/photo.response.dto'
import { UserResponseDto } from '@modules/users/dtos'
import { ApiProperty } from '@nestjs/swagger'

export class PostResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  description: string

  @ApiProperty()
  views: number

  @ApiProperty()
  photo?: PhotoResponseDto

  @ApiProperty()
  author?: UserResponseDto

  @ApiProperty({ type: [CategoryResponseDto] })
  categories?: CategoryResponseDto[]

  @ApiProperty()
  hash_tag: string

  @ApiProperty()
  date: Date
}
