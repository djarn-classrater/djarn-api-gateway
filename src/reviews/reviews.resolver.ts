import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common'
import { DataSources } from '../app.module'
import { ReviewType } from './reviews.dto'

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
}
