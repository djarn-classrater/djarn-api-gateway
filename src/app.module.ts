import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PingModule } from './ping/ping.module'
import { ReviewsModule } from './reviews/reviews.module'
import { ReviewsAPI } from './reviews/reviews.service'
import { CoursesModule } from './courses/courses.module'
import { CourseAPI } from './courses/courses.service'
import { LikesAPI } from './likes/likes.service'
import { LikesModule } from './likes/likes.module'
import { UsersAPI } from './users/users.service'
import { UsersModule } from './users/users.module'
import { RatingAPI } from './rating/rating.service'
import { RatingsModule } from './rating/rating.module'

export type DataSources = {
  reviewsAPI: ReviewsAPI
  coursesAPI: CourseAPI
  likesAPI: LikesAPI
  ratingsAPI: RatingAPI
  usersAPI: UsersAPI
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      dataSources: (): DataSources => ({
        reviewsAPI: new ReviewsAPI(),
        coursesAPI: new CourseAPI(),
        likesAPI: new LikesAPI(),
        ratingsAPI: new RatingAPI(),
        usersAPI: new UsersAPI(),
      }),
      tracing: true,
      autoSchemaFile: 'generate.gql',
      include: [
        PingModule,
        ReviewsModule,
        CoursesModule,
        LikesModule,
        RatingsModule,
        UsersModule,
      ],
    }),
    PingModule,
    ReviewsModule,
    CoursesModule,
    LikesModule,
    RatingsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
