import { Module } from '@nestjs/common'
import { ReviewsAPI } from './reviews.service'
import { ReviewsResolver } from './reviews.resolver'

@Module({
  providers: [ReviewsAPI, ReviewsResolver],
})
export class ReviewsModule {}
