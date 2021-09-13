import { Unique } from '@common/validations/unique'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
  Validate,
  ValidateIf
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { UserEntity } from '../entities/user.entity'

export class CreateUserRequestDto {
  @MaxLength(100, { message: ErrorMessage.FULLNAME_MAX_LENGTH })
  @IsNotEmpty({ message: ErrorMessage.FULL_NOT_EMPTY })
  @ApiProperty({
    example: 'Nguyen Van A'
  })
  fullname: string

  @ValidateIf((val) => val.email)
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @Validate(Unique, [UserEntity])
  @ApiProperty({
    example: 'viettq@vnext.com.vn'
  })
  email: string

  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @IsNotEmpty({ message: ErrorMessage.PASSWORD_NOT_EMPTY })
  @ApiProperty({
    example: 'Khoqua226'
  })
  password: string

  @ApiProperty({
    example: 'd3126ba5-bfcd-4c90-8941-eadf5dcb5e86'
  })
  avatar_id: string
}
