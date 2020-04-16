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
import { UpdateReviewArgs } from './reviews.input'
import { CourseType } from 'src/courses/courses.dto'
import { UserType } from 'src/users/users.dto'
import { LikeType } from 'src/likes/likes.dto'
import { User } from 'src/cmu-reg/cmu-reg.decorator'
import { StudentInfo } from 'src/cmu-reg/cmu-reg.dto'

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
    @Args({
      name: 'includeMe',
      type: () => Boolean,
      description: 'Include reiviews has logged in with user',
      defaultValue: true,
    })
    includeMe: boolean,
    @Context('dataSources')
    { reviewsAPI, cmuRegAPI }: DataSources,
  ): Promise<ReviewType[]> {
    const excludeId = !includeMe && (await cmuRegAPI.getStudentInfo()).studentId
    return reviewsAPI.getReviews({
      courseId,
      studentId,
      excludeStudentIds: [excludeId],
    })
  }

  @ResolveField('course', () => [CourseType])
  async course(
    @Parent() { courseId }: ReviewType,
    @Context('dataSources') { coursesAPI }: DataSources,
  ) {
    return coursesAPI.getCourse(courseId)
  }

  /**
   * @warn review and user database not sync right now
   */
  @ResolveField('user', () => UserType, { nullable: true })
  async user(
    @Parent() { studentId }: ReviewType,
    @Context('dataSources') { usersAPI }: DataSources,
  ) {
    return usersAPI.getUser(studentId)
  }

  @ResolveField('like', () => Boolean, { nullable: true })
  async like(
    @User() { studentId }: StudentInfo,
    @Parent() { id: reviewId }: ReviewType,
    @Context('dataSources') { likesAPI }: DataSources,
  ): Promise<boolean> {
    if (!studentId) return null
    const like = await likesAPI.getlike(studentId, reviewId)
    return !!like
  }

  /**
   * Number of likes in this review
   */
  @ResolveField('likes', () => Int)
  async likes(
    @Parent() { id: reviewId }: ReviewType,
    @Context('dataSources') { likesAPI }: DataSources,
  ): Promise<number> {
    return likesAPI.getLikeCount(reviewId)
  }

  @ResolveField('rate', () => Int, { nullable: true })
  async rate(
    @Parent() { studentId, courseId }: ReviewType,
    @Context('dataSources') { ratesAPI }: DataSources,
  ): Promise<number> {
    const response = await ratesAPI.getRatings({ studentId, courseId })
    return response[0] ? response[0].rating : null
  }

  /**
   * Create review and rating course
   * @remarks this mutation will post to review and rate database
   */
  @Mutation(() => ReviewType)
  async createReview(
    @Args({
      name: 'courseId',
      type: () => String,
    })
    courseId: string,
    @Args({
      name: 'context',
      type: () => String,
      nullable: true,
    })
    context: string,
    @Args({
      name: 'rate',
      type: () => Int,
    })
    rating: number,
    @User() { studentId }: StudentInfo,
    @Context('dataSources') { reviewsAPI, ratesAPI }: DataSources,
  ) {
    const newReview = await reviewsAPI.createReview({
      studentId,
      courseId,
      context,
    })
    const newRate = await ratesAPI.createRating({
      studentId,
      courseId,
      rating,
    })
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
