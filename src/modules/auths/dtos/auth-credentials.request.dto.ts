import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AuthCredentialsRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'tranquocviet226@gmail.com'
  })
  readonly email: string

  @IsNotEmpty()
  @ApiProperty({
    example: 'Khoqua226'
  })
  readonly password: string
}
