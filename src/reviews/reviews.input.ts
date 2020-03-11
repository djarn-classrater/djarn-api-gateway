import { Field, InputType } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

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
  readonly context: string
}