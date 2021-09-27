import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { TOKEN_NAME } from '@modules/auths'
import { SearchService } from './search.service'

@ApiTags('Search Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @ApiQuery({
    name: 'condition',
    required: false,
    description: 'chapters.id = 1'
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'orderBy', required: false, description: 'lessons.id' })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'ASC || DESC'
  })
  @ApiQuery({ name: 'search', required: false })
  public search() {
    return this.searchService.search()
  }
}
