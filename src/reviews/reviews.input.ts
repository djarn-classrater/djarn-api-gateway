import { ReviewType } from './reviews.dto'
import { Field, InputType, ID, ArgsType } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber, IsEmpty } from 'class-validator'

@InputType()
export class CreateReviewInput {
  @Field()
  @IsString()
  @IsEmpty()
  readonly studentId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly courseId: string

  @Field({ nullable: true })
  @IsString()
  readonly context?: string

  @Field()
  @IsNotEmpty()
  readonly rating: number
}

@InputType()
export class ReviewInput implements Partial<ReviewType> {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly courseId: string

  @Field({ nullable: true })
  @IsString()
  readonly context?: string
}

@InputType()
class UpdateReviewInput implements Partial<ReviewType> {
  @Field()
  @IsString()
  readonly context?: string
}

@ArgsType()
export class UpdateReviewArgs {
  @Field(() => ID)
  @IsNumber()
  @IsNotEmpty()
  readonly id: number

  @Field(() => UpdateReviewInput)
  readonly review: UpdateReviewInput
}
