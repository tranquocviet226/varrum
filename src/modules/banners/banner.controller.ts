import { TOKEN_NAME } from '@modules/auths'
import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Banner ads Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('banners')
export class BannerController {
  constructor() {}
}
