import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AuthFbDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '1704041003117962'
  })
  readonly id: string

  @IsNotEmpty()
  @ApiProperty({
    example: 'vaq4WToABAD0jBZAbnDhZADIv8khdZCVAY7IfbXlMH9u'
  })
  readonly fb_token: string
}
