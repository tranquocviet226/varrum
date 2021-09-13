import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionsController } from './permission.controller'
import { PermissionsRepository } from './permission.repository'
import { PermissionsService } from './permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsRepository])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
