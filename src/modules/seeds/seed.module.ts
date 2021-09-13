import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedController } from './seed.controller'
import { SeedService } from './seed.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
