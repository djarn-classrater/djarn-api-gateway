import { Module } from '@nestjs/common'
import { UsersAPI } from './users.service'
import { UserRessolver } from './users.resolver'

@Module({
  providers: [UsersAPI, UserRessolver],
})
export class UsersModule {}
