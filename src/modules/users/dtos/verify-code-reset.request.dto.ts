import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class VerifyCodeResetRequestDto {
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_NOT_EMPTY })
  @ApiProperty({
    example: 'abc@gmail.com'
  })
  email: string

  @IsNotEmpty({ message: ErrorMessage.VERIFY_CODE_RESET_PASS_NOT_EMPTY })
  @ApiProperty({
    example: '1996'
  })
  code: string
}
