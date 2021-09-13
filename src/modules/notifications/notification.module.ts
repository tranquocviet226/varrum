import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationController } from './notification.controller'
import { NotificationService } from './notification.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
