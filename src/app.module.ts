import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsAPI } from './reviews/reviews.service'
import { CoursesModule} from './courses/courses.module'
import { CourseAPI } from './courses/courses.service'

export type DataSources = {
  reviewsAPI: ReviewsAPI
  coursesAPI: CourseAPI
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      dataSources: (): DataSources => ({
        reviewsAPI: new ReviewsAPI,
        coursesAPI: new CourseAPI,
      }),
      tracing: true,
      autoSchemaFile: 'generate.gql',
      include: [
        PingModule,
        ReviewsModule,
        CoursesModule,
      ]
    }),
    PingModule,
    ReviewsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
