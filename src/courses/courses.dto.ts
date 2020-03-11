import { ObjectType, Field, Int } from 'type-graphql'
import { ReviewType } from '../reviews/reviews.dto'

@ObjectType()
export class CourseType {
  @Field()
  readonly courseId?: string

  @Field()
  readonly facultyName?: string

  @Field()
  readonly courseName?: string

  @Field()
  readonly courseDescription?: string

  @Field(() => Int)
  readonly courseCredit?: number

  @Field(() => [ReviewType], { nullable: true })
  reviews?: ReviewType[]
}