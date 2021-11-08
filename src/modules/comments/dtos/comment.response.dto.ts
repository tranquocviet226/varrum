import { CategoryResponseDto } from '@modules/categories/dtos/category-response.dto'
import { PhotoResponseDto } from '@modules/photos/dtos/photo.response.dto'
import { UserResponseDto } from '@modules/users/dtos'
import { ApiProperty } from '@nestjs/swagger'
import { CommentEntity } from '../entities/comment.entity'

export class CommentResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  content: string

  @ApiProperty()
  user?: UserResponseDto

  @ApiProperty()
  parentId?: CommentEntity

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
