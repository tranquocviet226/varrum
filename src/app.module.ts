import { Unique } from '@common/validations/unique'
import { defaultConnection } from '@config'
import { CategoryModule } from '@modules/categories/category.module'
import { CommentModule } from '@modules/comments/comment.module'
import { ForumsCategoryModule } from '@modules/forums/categories/category.module'
import { LikeModule } from '@modules/forums/like/like.module'
import { ForumModule } from '@modules/forums/posts/forum.module'
import { MailModule } from '@modules/mails/mail.module'
import { PostModule } from '@modules/posts/post.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auths/auth.module'
import { BadgesModule } from './modules/badges/badges.module'
import { NotificationModule } from './modules/notifications/notification.module'
import { PermissionsModule } from './modules/permissions/permission.module'
import { UploadModule } from './modules/photos/photo.module'
import { RolesModule } from './modules/roles/role.module'
import { SearchModule } from './modules/search/search.module'
import { SeedModule } from './modules/seeds/seed.module'
import { UserModule } from './modules/users/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: defaultConnection,
      inject: [ConfigService]
    }),
    SeedModule,
    MailModule,
    UploadModule,
    AuthModule,
    UserModule,
    RolesModule,
    PermissionsModule,
    NotificationModule,
    SearchModule,
    BadgesModule,
    CategoryModule,
    PostModule,
    ForumModule,
    ForumsCategoryModule,
    LikeModule,
    CommentModule
  ],
  providers: [Unique]
})
export class AppModule {}
