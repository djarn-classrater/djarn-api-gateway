import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id?: string

  @Field({ nullable: true })
  readonly studentId?: string

  @Field()
  readonly firstNameTH: string

  @Field()
  readonly firstNameEN: string

  @Field()
  readonly lastNameTH: string

  @Field()
  readonly lastNameEN: string

  @Field()
  readonly organizationNameTH: string

  @Field()
  readonly organizationNameEN: string

  constructor() {
    this.studentId = null
  }
}
