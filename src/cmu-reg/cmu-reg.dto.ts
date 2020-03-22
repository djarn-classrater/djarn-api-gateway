import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class StudentInfo {
  @Field()
  readonly studentId: string

  @Field()
  readonly firstNameTH: string

  @Field()
  readonly firstNameEN: string

  @Field()
  readonly lastNameTH: string

  @Field()
  readonly lastNameEN: string

  @Field()
  readonly organizationTH: string

  @Field()
  readonly organizationEN: string
}

export interface StudentInfoResponse {
  cmuitaccount_name: string
  cmuitaccount: string
  student_id: string
  prename_id: string
  prename_TH: string
  prename_EN: string
  firstname_TH: string
  firstname_EN: string
  lastname_TH: string
  lastname_EN: string
  organization_code: string
  organization_name_TH: string
  organization_name_EN: string
  itaccounttype_id: string
  itaccounttype_TH: string
  itaccounttype_EN: string
}
