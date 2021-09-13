import { Injectable } from '@nestjs/common'

@Injectable()
export class NotificationService {
  getNotification() {
    return 'hrllo'
  }
}
