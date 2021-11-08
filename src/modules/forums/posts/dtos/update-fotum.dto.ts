import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { CategoriesVerify } from '../validate/categories-verify'
import { IdVerify } from '../validate/id-verify'
import { PhotoIdVerify } from '../validate/photo-id-verify'

export class UpdateForumDto {
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
    example: 'fec9ba8d-f01d-46b6-8652-a621da375d0f'
  })
  @IsOptional()
  category_id?: string

  @ApiProperty({
    example: `GAME, The-gioi-mo`
  })
  @IsOptional()
  hash_tag?: string
}
