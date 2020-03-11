import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common'
import { ReviewType } from './reviews.dto'

@Injectable()
@Resolver('Reviews')
export class ReviewsResolver {

  @Query(() => [ReviewType])
  async reviews(
    @Args({ 
      name: 'course_id', 
      type: () => String, 
      nullable: true
    }) courseId: string,
    @Args({ 
      name: 'student_id', 
      type: () => String, 
      nullable: true
    }) studentId: string,
    @Context('dataSources') { reviewsAPI }
  ): Promise<ReviewType[]> {
    return reviewsAPI.getReviews({
      courseId, 
      studentId
    })
  }
}
