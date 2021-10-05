import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { CategoriesVerify } from '../validate/categories-verify'
import { IdVerify } from '../validate/id-verify'
import { PhotoIdVerify } from '../validate/photo-id-verify'

export class UpdatePostDto {
  @ApiProperty({
    example: '7715d151-d798-416a-b3cb-399b1f1d6693'
  })
  @IsNotEmpty()
  @IdVerify({
    message: 'id not found'
  })
  id: string

  @ApiProperty({
    example: 'Game GTA V full crack (Viet hoa)'
  })
  @IsOptional()
  title?: string

  @ApiProperty({
    example: '7715d151-d798-416a-b3cb-399b1f1d6693'
  })
  @IsOptional()
  @PhotoIdVerify({
    message: 'photo_id not found'
  })
  photo_id?: string

  @ApiProperty({
    example: 'Download game GTA V full crack'
  })
  @IsOptional()
  content?: string

  @ApiProperty({
    example:
      'Với việc VCS không có đại diện tham dự CKTG 2021, nhà vô địch khu vực PCS - PSG Talon quyết định mang huy hiệu của giải đấu LMHT Việt Nam đến với giải đấu.'
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    example: `["fec9ba8d-f01d-46b6-8652-a621da375d0f", "fc51f754-061d-4988-ae52-44e6e520fe85"]`
  })
  @IsOptional()
  @IsArray()
  @CategoriesVerify({ message: 'categories_id not found' })
  categories_id?: string[]

  @ApiProperty({
    example: `GAME, The-gioi-mo`
  })
  @IsOptional()
  hash_tag?: string

  @ApiProperty({
    example: `2021-09-25 16:18:07.923485`
  })
  @IsOptional()
  date: Date
}
