import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreatePostDto {
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
    example:
      'Mới đây, Play Together đã xuất hiện một số phân cảnh của Squid Game, đây là sản phẩm sáng tạo của một nhóm game thủ khiến cộng đồng vô cùng thích thú!'
  })
  @IsString()
  description: string

  @ApiProperty({
    example: `["fec9ba8d-f01d-46b6-8652-a621da375d0f", "fc51f754-061d-4988-ae52-44e6e520fe85"]`
  })
  @ArrayNotEmpty()
  @IsArray()
  categories_id: string[]

  @ApiProperty({
    example: 'GAME, The-gioi-mo'
  })
  hash_tag: string

  @ApiProperty({
    example: `2021-09-25 16:18:07.923485`
  })
  @IsNotEmpty()
  date: Date
}
