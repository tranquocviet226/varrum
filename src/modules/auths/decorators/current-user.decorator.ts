import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'src/modules/users/entities/user.entity'

export const CurrentUser = createParamDecorator<UserEntity>(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
