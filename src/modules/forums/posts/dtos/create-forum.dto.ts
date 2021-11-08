import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreateForumDto {
  @ApiProperty({
    example: 'Game GTA V full crack (Viet hoa)'
  })
  @IsString()
  @IsNotEmpty({ message: ErrorMessage.FULL_NOT_EMPTY })
  title: string

  @ApiProperty({
    example: '7715d151-d798-416a-b3cb-399b1f1d6693'
  })
  @IsString()
  @IsNotEmpty()
  photo_id: string

  @ApiProperty({
    example: 'Download game GTA V full crack'
  })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({
    example: 'fec9ba8d-f01d-46b6-8652-a621da375d0f'
  })
  @IsNotEmpty()
  category_id: string

  @ApiProperty({
    example: 'GAME, The-gioi-mo'
  })
  hash_tag: string
}
