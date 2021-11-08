import { AuthModule } from '@modules/auths/auth.module'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ForumsCategoryRepository } from '../categories/repositories/category.repository'
import { ForumController } from './forum.controller'
import { ForumService } from './forum.service'
import { ForumRepository } from './repositories/forum.repository'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PhotoRepository,
      ForumRepository,
      ForumsCategoryRepository
    ])
  ],
  providers: [ForumService],
  controllers: [ForumController]
})
export class ForumModule {}
