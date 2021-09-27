import { IsNotEmpty } from 'class-validator'
import { IdVerify } from '../validate/id-verify'

export class ShowPostDto {
  @IsNotEmpty()
  @IdVerify({
    message: 'id not found'
  })
  id: string
}
