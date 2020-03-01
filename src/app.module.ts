import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsService } from './reviews/reviews.service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      dataSources: () => ({
        reviewsAPI: new ReviewsService
      }),
      autoSchemaFile: 'generate.gql',
      include: [
        PingModule,
        ReviewsModule,
      ]
    }),
    PingModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
