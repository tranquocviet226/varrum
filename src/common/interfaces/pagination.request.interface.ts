/**
 * Interface intended for requesting results paginated
 */
export interface PaginationRequest<T> {
  // Number of records to skip (where the pagination shall start)
  skip: number
  /**
   * The index of the page where the pagination should start from.
   *
   * Its intended for the same purpose that `skip`, but the latter represents an amount of
   * records that should be skipped.
   *
   * Should be used only when needed to handle the pagination by the current page index.
   */
  page?: number

  // Page size
  limit: number

  // Sort order
  order?: { [field: string]: 'ASC' | 'DESC' }

  condition?: string

  random?: boolean

  // Other params of type T
  query?: T
}
