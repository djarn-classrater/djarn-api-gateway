import { Module, HttpService } from '@nestjs/common'
import { RedisCache } from 'apollo-server-cache-redis'
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
import { UsersAPI } from './users/users.service'
import { UsersModule } from './users/users.module'
import { RatesAPI } from './rates/rates.service'
import { RatesModule } from './rates/rates.module'
import { CMURegModule } from './cmu-reg/cmu-reg.module'
import { CMURegService } from './cmu-reg/cmu-reg.service'

import { ApolloServerExpressConfig } from 'apollo-server-express'

export type DataSources = {
  reviewsAPI: ReviewsAPI
  coursesAPI: CourseAPI
  likesAPI: LikesAPI
  ratesAPI: RatesAPI
  usersAPI: UsersAPI
}

// Extract ExpressContext interface
type ExpressContextConfig = Pick<ApolloServerExpressConfig, 'context'>
type ExpressContextFunction = Extract<ExpressContextConfig['context'], Function>
type ExpressContext = Parameters<ExpressContextFunction>[0]

export interface TContext extends DataSources, ExpressContext {
  cmuRegService: CMURegService
}

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
        ratesAPI: new RatesAPI(),
        usersAPI: new UsersAPI(),
      }),
      context: ({ req }) => ({
        req,
        cmuRegService: new CMURegService(new HttpService()),
      }),
      cache: new RedisCache({
        host: 'cache',
        port: 6379,
      }),
      cacheControl: {
        defaultMaxAge: 60,
      },
      tracing: true,
      autoSchemaFile: 'generate.gql',
      include: [
        PingModule,
        ReviewsModule,
        CoursesModule,
        LikesModule,
        RatesModule,
        UsersModule,
        CMURegModule,
      ],
    }),
    PingModule,
    ReviewsModule,
    CoursesModule,
    LikesModule,
    RatesModule,
    UsersModule,
    CMURegModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
