import {
  Resolver,
  Query,
  ResolveField,
  Context,
  Args,
  Parent,
  Int,
} from '@nestjs/graphql'
import { SearchService } from './search.service'
import { CourseResponse } from './search.dto'
import { CourseType } from 'src/courses/courses.dto'
import { DataSources } from 'src/app.module'

@Resolver(() => CourseResponse)
export class SearchResolver {
  constructor(private searchService: SearchService) {}

  @Query(() => [CourseResponse])
  async search(
    @Args({
      name: 'query',
      type: () => String,
    })
    query: string,
    @Args({
      name: 'size',
      type: () => Int,
    })
    size: number,
  ) {
    return this.searchService.search({ query, size })
  }

  @ResolveField('course', () => CourseType, { nullable: true })
  async course(
    @Parent() { _id }: CourseResponse,
    @Context('dataSources') { coursesAPI }: DataSources,
  ) {
    return coursesAPI.getCourse(_id)
  }
}
