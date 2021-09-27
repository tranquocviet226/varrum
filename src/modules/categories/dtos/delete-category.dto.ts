import { ApiProperty } from '@nestjs/swagger'

export class DeleteCategoryDto {
  @ApiProperty()
  id: string
}
