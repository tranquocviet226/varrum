import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadController } from './photo.controller'
import { PhotoRepository } from './photo.repository'
import { UploadService } from './photo.service'

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
