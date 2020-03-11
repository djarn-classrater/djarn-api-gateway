import { ObjectType, Field, ID } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@ObjectType()
export class ReviewType {
  @Field(() => ID)
  readonly id?: string | number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly courseId: string

  @Field()
  @IsString()
  readonly context: string

  @Field()
  @IsString()
  readonly date: string
}