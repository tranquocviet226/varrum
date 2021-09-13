export class QueryRequest {
  search?: string
  order?: 'ASC' | 'DESC'
  page?: number
  limit?: number
  parentId?: number
}
