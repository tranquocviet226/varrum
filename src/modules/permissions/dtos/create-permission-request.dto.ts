import { IsNotEmpty, Length, Matches, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { regex } from 'src/helpers/regex.helper'

export class CreatePermissionRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(regex.slugRegex)
  @MaxLength(60)
  slug: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 160)
  description: string
}
