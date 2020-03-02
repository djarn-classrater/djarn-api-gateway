import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
export class CourseType {
  @Field()
  readonly course_id?: string

  @Field()
  readonly faculty_name?: string

  @Field()
  readonly course_name?: string

  @Field()
  readonly course_description?: string

  @Field(() => Int)
  readonly course_credit?: number
}