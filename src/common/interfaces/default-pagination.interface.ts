/**
 * Interface designed to assign default parameters to pagination
 */
export interface DefaultPagination<T> {
  defaultSkip?: number
  defaultPage?: number
  defaultLimit?: number
  defaultOrder?: T
  defaultOrderDirection?: string
  maxAllowedSize?: number
}
