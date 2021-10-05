import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class DeletePhotoRequestDto {
  @IsNotEmpty({ message: ErrorMessage.ID_NOT_EMPTY })
  @ApiProperty({
    example: '7b11785f7a575df7f6d6c471a3ec11bc.jpg'
  })
  filename: string
}
