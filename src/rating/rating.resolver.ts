import {
  Resolver,
  Query,
  Context,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { DataSources } from '../app.module'
import { RatingType } from './rating.dto'
import { CourseType } from 'src/courses/courses.dto'

@Injectable()
@Resolver(() => RatingType)
export class RatingResolver {
  @Query(() => [RatingType])
  async ratings(
    @Args({
      name: 'studentId',
      type: () => String,
      nullable: true,
    })
    studentId: string,
    @Args({
      name: 'courseId',
      type: () => String,
      nullable: true,
    })
    courseId: string,
    @Args({
      name: 'rating',
      type: () => String,
      nullable: true,
    })
    rating: string,
    @Context('dataSources') { ratingsAPI }: DataSources,
  ): Promise<RatingType[]> {
    return ratingsAPI.getRatings({ studentId, courseId, rating })
  }

  @ResolveProperty('course', () => [CourseType])
  async course(
    @Parent() { courseId }: RatingType,
    @Context('dataSources') { coursesAPI }: DataSources,
  ) {
    return coursesAPI.getCourse(courseId)
  }
}
