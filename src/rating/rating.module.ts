import { Module } from '@nestjs/common'
import { RatingAPI } from './rating.service'
import { RatingResolver } from './rating.resolver'

@Module({
  providers: [RatingAPI, RatingResolver],
})
export class RatingsModule {}
