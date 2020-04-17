import { Field, InputType, Int, ArgsType } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class ReviewInput {
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
class UpdateReviewInput {
  @Field()
  @IsString()
  readonly context?: string
}

@ArgsType()
export class UpdateReviewArgs {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  readonly id: number

  @Field(() => UpdateReviewInput)
  readonly review: UpdateReviewInput
}
