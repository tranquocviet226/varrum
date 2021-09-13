import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  Length,
  Matches,
  MaxLength,
  ValidateIf
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateUserRequestDto {
  @ValidateIf((val) => val.fullname)
  @MaxLength(100, { message: ErrorMessage.FULLNAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van B'
  })
  fullname: string

  @ValidateIf((val) => val.imageName)
  @ApiProperty({
    example: 'abc.png'
  })
  avatar: string

  @ValidateIf((val) => val.birthday)
  @IsDateString(undefined, { message: ErrorMessage.BIRTHDAY_STRING })
  @ApiProperty({
    example: new Date()
  })
  birthday: Date

  @ValidateIf((val) => val.password)
  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @ApiProperty({
    example: 'Khoqua227'
  })
  password: string
}
