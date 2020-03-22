import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PingModule } from './ping/ping.module'
import { ReviewsModule } from './reviews/reviews.module'
import { ReviewsAPI } from './reviews/reviews.service'
import { CoursesModule } from './courses/courses.module'
import { CourseAPI } from './courses/courses.service'
import { LikesAPI } from './likes/likes.service'
import { LikesModule } from './likes/likes.module'

import { ApolloServerExpressConfig } from 'apollo-server-express'

export type DataSources = {
  reviewsAPI: ReviewsAPI
  coursesAPI: CourseAPI
  likesAPI: LikesAPI
}

// Extract ExpressContext interface
type ExpressContextConfig = Pick<ApolloServerExpressConfig, 'context'>
type ExpressContextFunction = Extract<ExpressContextConfig['context'], Function>
type ExpressContext = Parameters<ExpressContextFunction>[0]

export interface TContext extends DataSources, ExpressContext {}

interface Options
  extends Omit<GqlModuleOptions, 'context'>,
    ExpressContextConfig {}

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot(<Options>{
      dataSources: (): DataSources => ({
        reviewsAPI: new ReviewsAPI(),
        coursesAPI: new CourseAPI(),
        likesAPI: new LikesAPI(),
      }),
      tracing: true,
      autoSchemaFile: 'generate.gql',
      include: [PingModule, ReviewsModule, CoursesModule, LikesModule],
    }),
    PingModule,
    ReviewsModule,
    CoursesModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
