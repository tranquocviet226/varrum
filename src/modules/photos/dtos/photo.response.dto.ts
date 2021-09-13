import { ApiProperty } from '@nestjs/swagger'

export class PhotoResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  path: string

  @ApiProperty()
  active: boolean
}
