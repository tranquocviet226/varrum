import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
  ValidateIf
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateUserIdRequestDto {
  @ValidateIf((val) => val.fullname || val.fullname === '')
  @MaxLength(100, { message: ErrorMessage.FULLNAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van B'
  })
  fullname: string

  @ValidateIf((val) => val.avatar || val.avatar === '')
  @ApiProperty({
    example: 'abc.png'
  })
  avatar: string

  @ValidateIf((val) => val.birthday || val.birthday === '')
  @IsDateString(undefined, { message: ErrorMessage.BIRTHDAY_STRING })
  @ApiProperty({
    example: new Date()
  })
  birthday: Date

  @ValidateIf((val) => val.phone || val.phone === '')
  @Matches(regex.phoneRegex, { message: ErrorMessage.PHONE_REGEX })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_PHONE_NOT_EMPTY })
  @ApiProperty({
    example: '0346718110'
  })
  phone: string

  @ValidateIf((val) => val.email || val.email === '')
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_PHONE_NOT_EMPTY })
  @ApiProperty({
    example: 'abc@gmail.com'
  })
  email: string

  @ValidateIf((val) => val.password || val.password === '')
  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @ApiProperty({
    example: 'Khoqua227'
  })
  password: string

  @ValidateIf((val) => val.status || val.status === '')
  @Matches(regex.statusRegex, { message: ErrorMessage.STATUS_REGEX })
  @ApiProperty({
    example: 'block'
  })
  status: string
}
