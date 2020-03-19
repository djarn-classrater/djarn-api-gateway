import { ObjectType, Field, ID, Int, Float } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@ObjectType()
export class RateType {
  @Field(() => ID)
  readonly id: number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field()
  @IsNotEmpty()
  readonly courseId: string

  @Field()
  @IsNotEmpty()
  readonly rating: number
}

@ObjectType()
class Rating {
  @Field(() => Int)
  readonly _1: number

  @Field(() => Int)
  readonly _2: number

  @Field(() => Int)
  readonly _3: number

  @Field(() => Int)
  readonly _4: number

  @Field(() => Int)
  readonly _5: number
}

@ObjectType()
export class RateSummary {
  @Field(() => Float, { nullable: true })
  readonly mean: number

  @Field(() => Int, { nullable: true })
  readonly reviewer: number

  @Field(() => Rating, { nullable: true })
  readonly rating: Rating
}
