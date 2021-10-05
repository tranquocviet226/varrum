import { ApiProperty } from '@nestjs/swagger'

export class UploadPhotoResponseDto {
  @ApiProperty()
  fileName: string

  @ApiProperty()
  link: string

  @ApiProperty()
  fileType: string
}
