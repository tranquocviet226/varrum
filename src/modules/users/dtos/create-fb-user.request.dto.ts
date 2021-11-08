import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreateFbUserRequestDto {
  @MaxLength(100, { message: ErrorMessage.FULLNAME_MAX_LENGTH })
  @IsNotEmpty({ message: ErrorMessage.FULL_NOT_EMPTY })
  @ApiProperty({
    example: 'Nguyen Van A'
  })
  fullname: string

  @IsNotEmpty()
  @ApiProperty({
    example: '1704041003117962'
  })
  fb_id: string

  @IsNotEmpty()
  @ApiProperty({
    example: 'EAAFvaq4WToABAD0jBZAbnDhZADIv8khdZCVAY7IfbXlMH9u'
  })
  fb_token: string

  @IsNotEmpty()
  @ApiProperty({
    example: 1642350195
  })
  fb_expiration_time: number

  @ApiProperty({
    example: 'https://graph.facebook.com/207537292916369/picture?type=large'
  })
  fb_avatar: string
}
