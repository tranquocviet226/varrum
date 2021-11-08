import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ForumRepository } from '../posts/repositories/forum.repository'
import { LikeController } from './like.controller'
import { LikeRepository } from './like.repository'
import { LikeService } from './like.service'

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository, ForumRepository])],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
