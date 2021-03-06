import { Injectable } from '@nestjs/common'
import {
  Resolver,
  Query,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { DataSources } from '../app.module'
import { UserType } from './users.dto'
import { ReviewType } from 'src/reviews/reviews.dto'

@Injectable()
@Resolver(() => UserType)
export class UserRessolver {
  @Query(() => [UserType])
  async users(
    @Args({
      name: 'studentId',
      type: () => String,
      nullable: true,
    })
    studentId: string,
    @Context('dataSources') { usersAPI }: DataSources,
  ): Promise<UserType[]> {
    return usersAPI.getUsers({ studentId })
  }

  @ResolveField('reviews', () => [ReviewType])
  async reviews(
    @Parent() { studentId }: UserType,
    @Args({
      name: 'courseId',
      type: () => String,
      nullable: true,
    })
    courseId: string,
    @Context('dataSources') { reviewsAPI }: DataSources,
  ) {
    return reviewsAPI.getReviews({ studentId, courseId })
  }
}
