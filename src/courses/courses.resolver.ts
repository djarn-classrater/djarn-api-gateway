import { 
  Resolver, 
  ResolveProperty,
  Query, 
  Parent,
  Args, 
  Context 
} from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { CourseType } from './courses.dto'
import { ReviewType } from '../reviews/reviews.dto'

@Injectable()
@Resolver(() => CourseType)
export class CoursesResolver {

  @Query(() => CourseType)
  async course(
    @Args('course_id') course_id: string,
    @Context('dataSources') { coursesAPI }
  ): Promise<CourseType> {
    return coursesAPI.getCourse(course_id)
  }

  @ResolveProperty('reviews', () => [ReviewType])
  async reviews(
    @Parent() course: CourseType,
    @Context('dataSources') { reviewsAPI }
  ) {
    const { course_id } = course
    return reviewsAPI.getReviews({ course_id })
  }
}