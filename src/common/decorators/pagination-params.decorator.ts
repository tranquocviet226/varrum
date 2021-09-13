import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { DefaultPagination } from '../interfaces/default-pagination.interface'

/**
 * Decorator intended for building a PaginationRequest object based on the query string parameters
 */
export const PaginationParams = createParamDecorator(
  (
    data: DefaultPagination<unknown> = {
      defaultSkip: 0,
      defaultPage: 0,
      defaultLimit: 10,
      defaultOrder: {},
      defaultOrderDirection: 'ASC',
      maxAllowedSize: 20
    },
    ctx: ExecutionContext
  ) => {
    let {
      query: { skip, page, limit }
    } = ctx.switchToHttp().getRequest()
    const {
      query: { orderBy, orderDirection, condition, ...query }
    } = ctx.switchToHttp().getRequest()
    const {
      defaultSkip,
      defaultPage,
      defaultLimit,
      defaultOrder,
      defaultOrderDirection,
      maxAllowedSize
    } = data

    const order = orderBy
      ? {
          [orderBy]: orderDirection ? orderDirection : defaultOrderDirection
        }
      : defaultOrder
    limit = limit && limit > 0 ? +limit : defaultLimit

    if (!skip) {
      if (page) {
        skip = (+page - 1) * +limit
        skip = skip >= 0 ? skip : 0
      } else {
        page = defaultPage
        skip = defaultSkip
      }
    } else {
      page = Math.floor(+skip / limit)
    }

    limit = +limit < +maxAllowedSize ? limit : maxAllowedSize
    return {
      ...(data ? data : {}),
      skip: skip,
      page: page,
      limit: limit,
      order: order,
      query: query,
      condition: condition
    }
  }
)
