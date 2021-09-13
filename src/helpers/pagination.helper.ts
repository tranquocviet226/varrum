import { PaginationResponseDto } from '../common/dtos/pagination-response.dto'
import { PaginationRequest } from '../common/interfaces/pagination.request.interface'
import { QueryRequest } from './query.request'

export class Pagination {
  /**
   * Return pagination response
   * @param PaginationRequest {PaginationRequest}
   * @param totalRecords {number}
   * @param dtos {t[]}
   * @returns {PaginationResponseDto}
   */
  static of<T>(
    { limit, page, skip }: PaginationRequest<QueryRequest>,
    totalRecords: number,
    dtos: T[]
  ): PaginationResponseDto<T> {
    const totalPages =
      Math.floor(totalRecords / limit) + (totalRecords % limit > 0 ? 1 : 0)
    const currentPage = +page > 0 ? +page : 1
    const hasNext = currentPage <= totalPages - 1

    return {
      totalPages: totalPages,
      payloadSize: dtos.length,
      hasNext: hasNext,
      content: dtos,
      currentPage: currentPage,
      skippedRecords: skip,
      totalRecords: totalRecords
    }
  }
}
