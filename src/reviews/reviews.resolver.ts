import { Resolver, Query, Context } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common'
import { ReviewType } from './reviews.dto'

@Injectable()
@Resolver('Reviews')
export class ReviewsResolver {

  @Query(() => [ReviewType])
  async reviews(@Context('dataSources') { reviewsAPI }): Promise<ReviewType[]> {
    return reviewsAPI.getReviews()
  }
}
