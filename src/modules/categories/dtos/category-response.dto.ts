import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  photo?: PhotoEntity

  @ApiProperty()
  status: string
}
