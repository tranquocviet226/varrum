import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class EmailRequestDto {
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_NOT_EMPTY })
  @ApiProperty({
    example: 'abc@gmail.com'
  })
  email: string
}
