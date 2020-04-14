import { LikeType } from './likes.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Resolver, Query, Args, Context, Mutation, Int } from '@nestjs/graphql'
import { DataSources } from '../app.module'
import { User } from 'src/cmu-reg/cmu-reg.decorator'
import { StudentInfo } from 'src/cmu-reg/cmu-reg.dto'

@Injectable()
@Resolver(() => LikeType)
export class LikeResolver {
  @Query(() => [LikeType])
  async likes(
    @Args({
      name: 'studentId',
      type: () => String,
      nullable: true,
    })
    studentId: string,
    @Args({
      name: 'reviewId',
      type: () => String,
      nullable: true,
    })
    reviewId: string,
    @Context('dataSources') { likesAPI }: DataSources,
  ): Promise<LikeType[]> {
    return likesAPI.getlikes({ studentId, reviewId })
  }

  @Mutation(() => LikeType)
  async createLike(
    @Args({
      name: 'reviewId',
      type: () => Int,
    })
    reviewId: number,
    @User() { studentId }: StudentInfo,
    @Context('dataSources') { likesAPI }: DataSources,
  ): Promise<LikeType> {
    return likesAPI.createLike({ reviewId, studentId })
  }

  @Mutation(() => LikeType)
  async deleteLike(
    @Args({
      name: 'reviewId',
      type: () => Int,
    })
    reviewId: number,
    @User() { studentId }: StudentInfo,
    @Context('dataSources') { likesAPI }: DataSources,
  ): Promise<LikeType> {
    const like = await likesAPI.getlike(studentId, reviewId)
    if (!like) throw new NotFoundException()
    await likesAPI.deleteLike(like.id)
    return like
  }
}
