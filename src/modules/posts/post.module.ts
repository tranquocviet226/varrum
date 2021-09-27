import { CategoryRepository } from '@modules/categories/repositories/category.repository'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auths/auth.module'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostRepository } from './repositories/post.repository'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PhotoRepository,
      PostRepository,
      CategoryRepository
    ])
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
