import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class ResetPasswordRequestDto {
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_NOT_EMPTY })
  @ApiProperty({
    example: 'abc@gmail.com'
  })
  email: string

  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @IsNotEmpty({ message: ErrorMessage.PASSWORD_NOT_EMPTY })
  @ApiProperty({
    example: 'Khoqua226'
  })
  newPassword: string
}
