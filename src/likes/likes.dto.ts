import { Field, ObjectType, Int } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@ObjectType()
export class LikeType {
  @Field(() => Int)
  readonly id?: number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field(() => Int)
  @IsNotEmpty()
  readonly reviewId: number

  @Field()
  readonly date: string
}
