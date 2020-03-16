import {
  Resolver,
  ResolveProperty,
  Query,
  Parent,
  Args,
  Context,
} from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { DataSources } from 'src/app.module'
import { CourseType } from './courses.dto'
import { ReviewType } from '../reviews/reviews.dto'

@Injectable()
@Resolver(() => CourseType)
export class CoursesResolver {
  @Query(() => CourseType)
  async course(
    @Args('courseId') courseId: string,
    @Context('dataSources') { coursesAPI },
  ): Promise<CourseType> {
    return coursesAPI.getCourse(courseId)
  }

  @ResolveProperty('reviews', () => [ReviewType])
  async reviews(
    @Parent() { courseId }: CourseType,
    @Context('dataSources') { reviewsAPI }: DataSources,
  ) {
    return reviewsAPI.getReviews({ courseId })
  }
}
