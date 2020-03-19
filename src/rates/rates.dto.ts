import { ObjectType, Field, ID } from 'type-graphql'
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
