import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class CourseResponse {
  @Field()
  _id: string
}

export class SearchPayload {
  query: string
  size: number
}
