import { ObjectType, Field, ID } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'
import { CourseType } from '../courses/courses.dto'

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
  readonly course: CourseType

  @Field()
  @IsString()
  readonly context: string

  @Field()
  @IsString()
  readonly date: string
}
