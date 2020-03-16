import { LikeType } from './likes.dto'
import { Injectable } from '@nestjs/common'
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql'
import { DataSources } from '../app.module'
import { LikeInput } from './likes.input'

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
    return likesAPI.getlikes({
      studentId,
      reviewId,
    })
  }

  @Mutation(() => LikeType)
  async createLike(
    @Args({
      name: 'likeInput',
      type: () => LikeInput,
    })
    like: LikeInput,
    @Context('dataSources') { likesAPI }: DataSources,
  ): Promise<LikeType> {
    return likesAPI.createLike(like)
  }
}
