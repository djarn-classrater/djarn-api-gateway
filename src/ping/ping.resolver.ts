import { Resolver, Query } from '@nestjs/graphql'

@Resolver('Ping')
export class PingResolver {
  @Query(() => String)
  async ping() {
    return 'hello world'
  }
}
