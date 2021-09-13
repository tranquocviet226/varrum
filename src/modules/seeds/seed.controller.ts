import { MessageResponse } from '@common/interceptors/message.response'
import { Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TOKEN_NAME } from '@modules/auths'
import { SeedService } from './seed.service'

@ApiTags('Seed Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

  @ApiOperation({ description: 'Create roles, permissions seed ' })
  @Post()
  public createSeed(): Promise<MessageResponse> {
    return this.seedService.createSeed()
  }
}
