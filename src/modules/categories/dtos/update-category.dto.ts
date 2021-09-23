import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches, ValidateIf } from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateCategoryDto {

    @IsNotEmpty()
    @ApiProperty({
        example: 'd3126ba5-bfcd-4c90-8941-eadf5dcb5e86'
    })
    id: string

    @ApiProperty({
        example: 'Game'
    })
    name: string

    @ApiProperty({
        example: 'd3126ba5-bfcd-4c90-8941-eadf5dcb5e86'
    })
    photo_id: string

    @ApiProperty({
        example: 'active'
    })
    @ValidateIf(val => val.status)
    @Matches(regex.statusRegex, {message: ErrorMessage.STATUS_REGEX})
    status: string
}
