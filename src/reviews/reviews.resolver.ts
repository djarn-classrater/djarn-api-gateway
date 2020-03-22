import {
  Resolver,
  Query,
  Mutation,
  Context,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { DataSources } from '../app.module'
import { ReviewType } from './reviews.dto'
import {
  UpdateReviewArgs,
  CreateReviewInput,
  ReviewInput,
} from './reviews.input'
import { CourseType } from 'src/courses/courses.dto'
import { UserType } from 'src/users/users.dto'
import { LikeType } from 'src/likes/likes.dto'

@Injectable()
@Resolver(() => ReviewType)
export class ReviewsResolver {
  @Query(() => [ReviewType])
  async reviews(
    @Args({
      name: 'courseId',
      type: () => String,
      nullable: true,
    })
    courseId: string,
    @Args({
      name: 'studentId',
      type: () => String,
      nullable: true,
    })
    studentId: string,
    @Context('dataSources') { reviewsAPI }: DataSources,
  ): Promise<ReviewType[]> {
    return reviewsAPI.getReviews({
      courseId,
      studentId,
    })
  }

  @ResolveField('course', () => [CourseType])
  async course(
    @Parent() { courseId }: ReviewType,
    @Context('dataSources') { coursesAPI }: DataSources,
  ) {
    return coursesAPI.getCourse(courseId)
  }

  @ResolveField('user', () => [UserType])
  async user(
    @Parent() { studentId }: ReviewType,
    @Context('dataSources') { usersAPI }: DataSources,
  ) {
    return usersAPI.getUsers({ studentId })
  }

  @ResolveField('like', () => [LikeType])
  async like(
    @Parent() { studentId }: ReviewType,
    @Context('dataSources') { likesAPI }: DataSources,
  ) {
    return likesAPI.getlikes({ studentId })
  }

  @ResolveField('rate', () => Int, { nullable: true })
  async rate(
    @Parent() { studentId, courseId }: ReviewType,
    @Context('dataSources') { ratesAPI }: DataSources,
  ): Promise<number> {
    const response = await ratesAPI.getRatings({ studentId, courseId })
    return response[0] ? response[0].rating : null
  }

  @Mutation(() => ReviewType)
  async createReview(
    @Args({
      name: 'review',
      type: () => CreateReviewInput,
    })
    args: CreateReviewInput,
    @Context('dataSources') { reviewsAPI }: DataSources,
    @Context('dataSources') { ratesAPI }: DataSources,
  ) {
    const { rating, ...reviewArgs } = args
    const { context, ...ratingArgs } = args
    const newReview = await reviewsAPI.createReview(reviewArgs)
    const newRate = await ratesAPI.createRating(ratingArgs)
    return {
      ...newReview,
      rate: newRate.rating,
    }
  }

  @Mutation(() => ReviewType)
  async updateReview(
    @Args() reviewArgs: UpdateReviewArgs,
    @Context('dataSources') { reviewsAPI }: DataSources,
  ): Promise<ReviewType> {
    // return 204 status code
    reviewsAPI.updateReview(reviewArgs)
    return reviewsAPI.getReview(reviewArgs.id)
  }
}
