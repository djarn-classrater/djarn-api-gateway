import { LikeType } from './likes.dto'
import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class LikeInput implements Partial<LikeType> {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field()
  @IsNotEmpty()
  readonly reviewId: number
}
