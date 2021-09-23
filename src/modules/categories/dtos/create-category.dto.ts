import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    @ApiProperty({
        example: 'Game'
    })
    name: string

    @ApiProperty({
        example: 'd3126ba5-bfcd-4c90-8941-eadf5dcb5e86'
    })
    photo_id: string
}
