import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id: number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string

  @Field()
  readonly firstNameTH: string

  @Field()
  readonly firstNameEN: string
}
