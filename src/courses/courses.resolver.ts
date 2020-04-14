import {
  Resolver,
  ResolveField,
  Query,
  Parent,
  Args,
  Context,
} from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { DataSources } from 'src/app.module'
import { CourseType } from './courses.dto'
import { ReviewType } from '../reviews/reviews.dto'
import { RateType, RateSummary } from 'src/rates/rates.dto'

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

  @ResolveField('reviews', () => [ReviewType])
  async reviews(
    @Parent() { courseId }: CourseType,
    @Args({
      name: 'includeMe',
      type: () => Boolean,
      description: 'Include reiviews has logged in with user',
      defaultValue: true,
    })
    includeMe: boolean,
    @Context('dataSources') { reviewsAPI, cmuRegAPI }: DataSources,
  ) {
    const excludeId = !includeMe && (await cmuRegAPI.getStudentInfo()).studentId
    return reviewsAPI.getReviews({ courseId, excludeStudentIds: [excludeId] })
  }

  @ResolveField('rating', () => [RateType])
  async ratings(
    @Parent() { courseId }: CourseType,
    @Context('dataSources') { ratesAPI }: DataSources,
  ) {
    return ratesAPI.getRatings({ courseId })
  }

  @ResolveField('ratingSummary', () => RateSummary)
  async ratingSummary(
    @Parent() { courseId }: CourseType,
    @Context('dataSources') { ratesAPI }: DataSources,
  ): Promise<RateSummary> {
    return ratesAPI.getRatingsummary(courseId)
  }
}
