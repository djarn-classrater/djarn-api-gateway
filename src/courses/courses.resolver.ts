import { Resolver, Query, Args, Context } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { CourseType } from './courses.dto'

@Injectable()
@Resolver('Courses')
export class CoursesResolver {

  @Query(() => CourseType)
  async course(
    @Args('course_id') course_id: string,
    @Context('dataSources') { coursesAPI }
  ): Promise<CourseType> {
    return coursesAPI.getCourse(course_id)
  }
}