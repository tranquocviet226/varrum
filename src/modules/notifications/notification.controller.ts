import { TOKEN_NAME } from '@modules/auths'
import { Controller } from '@nestjs/common'
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger'
import { NotificationService } from './notification.service'

@ApiTags('Notification Controller')
@ApiBasicAuth(TOKEN_NAME)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
}
