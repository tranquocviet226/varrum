import { PhotoRepository } from '@modules/photos/photo.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BannerController } from './banner.controller'
import { BannerService } from './banner.service'

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository])],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
