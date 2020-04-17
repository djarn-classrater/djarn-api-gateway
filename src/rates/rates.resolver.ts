import {
  Resolver,
  Query,
  Context,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { DataSources } from '../app.module'
import { RateType } from './rates.dto'
import { CourseType } from 'src/courses/courses.dto'
import { RateInput, UpdateRateArgs } from './rates.input'

@Injectable()
@Resolver(() => RateType)
export class RatesResolver {
  @Query(() => [RateType])
  async rates(
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
    @Context('dataSources') { ratesAPI }: DataSources,
  ): Promise<RateType[]> {
    return ratesAPI.getRatings({ studentId, courseId })
  }

  @Mutation(() => RateType)
  async createRates(
    @Args({
      name: 'rate',
      type: () => RateInput,
    })
    rate: RateInput,
    @Context('dataSources') { ratesAPI }: DataSources,
  ): Promise<RateType> {
    return ratesAPI.createRating(rate)
  }

  @Mutation(() => RateType)
  async updateRate(
    @Args() rateArgs: UpdateRateArgs,
    @Context('dataSources') { ratesAPI }: DataSources,
  ): Promise<RateType> {
    return ratesAPI.getRating(rateArgs.id)
  }

  @ResolveField('course', () => [CourseType])
  async course(
    @Parent() { courseId }: RateType,
    @Context('dataSources') { coursesAPI }: DataSources,
  ) {
    return coursesAPI.getCourse(courseId)
  }
}
