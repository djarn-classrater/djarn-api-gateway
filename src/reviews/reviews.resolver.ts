import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common'
import { DataSources } from '../app.module'
import { ReviewType } from './reviews.dto'
import { ReviewInput, UpdateReviewArgs } from './reviews.input'

@Injectable()
@Resolver('Reviews')
export class ReviewsResolver {

  @Query(() => [ReviewType])
  async reviews(
    @Args({ 
      name: 'courseId', 
      type: () => String, 
      nullable: true
    }) courseId: string,
    @Args({ 
      name: 'studentId', 
      type: () => String, 
      nullable: true
    }) studentId: string,
    @Context('dataSources') { reviewsAPI }: DataSources
  ): Promise<ReviewType[]> {
    return reviewsAPI.getReviews({
      courseId, 
      studentId
    })
  }

  @Mutation(() => ReviewType)
  async createReview(
    @Args({
      name: 'review',
      type: () => ReviewInput,
    }) review: ReviewInput,
    @Context('dataSources') { reviewsAPI }: DataSources,
  ): Promise<ReviewType> {
    return reviewsAPI.createReview(review)
  }

  @Mutation(() => ReviewType)
  async updateReview(
    @Args() reviewArgs: UpdateReviewArgs,
    @Context('dataSources') { reviewsAPI }: DataSources,
  ): Promise<ReviewType> {
    // return 204 status code
    reviewsAPI.updateReview(reviewArgs)
    return reviewsAPI.getReview(reviewArgs.id)
  }
}
