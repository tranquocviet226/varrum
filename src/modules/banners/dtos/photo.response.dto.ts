import { ApiProperty } from '@nestjs/swagger'

export class PhotoResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  active: boolean
}
