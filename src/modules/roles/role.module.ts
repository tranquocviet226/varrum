import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesController } from './role.controller'
import { RolesRepository } from './role.repository'
import { RolesService } from './role.service'

@Module({
  imports: [TypeOrmModule.forFeature([RolesRepository])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
