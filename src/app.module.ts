import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsService } from './reviews/reviews.service'
import { CoursesModule} from './courses/courses.module'
import { CourseAPI } from './courses/courses.service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      dataSources: () => ({
        reviewsAPI: new ReviewsService,
        coursesAPI: new CourseAPI,
      }),
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
