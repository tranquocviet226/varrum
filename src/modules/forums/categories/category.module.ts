import { PhotoRepository } from '@modules/photos/photo.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { ForumsCategoryRepository } from './repositories/category.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([ForumsCategoryRepository, PhotoRepository])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class ForumsCategoryModule {}
