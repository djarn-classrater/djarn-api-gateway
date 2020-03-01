import { ObjectType, Field, ID } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@ObjectType()
export class ReviewType {
  @Field(() => ID)
  readonly id?: string | number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly student_id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly course_id: string

  @Field()
  @IsString()
  readonly context: string

  @Field()
  @IsString()
  readonly date: string
}