import { Module } from '@nestjs/common'
import { LikesAPI } from './likes.service'
import { LikeResolver } from './likes.resolver'

@Module({
  providers: [LikesAPI, LikeResolver]
})
export class LikesModule { }