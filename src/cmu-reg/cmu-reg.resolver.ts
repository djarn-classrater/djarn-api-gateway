import { Injectable } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'
import { StudentInfo } from './cmu-reg.dto'
import { User } from '../cmu-reg/cmu-reg.decorator'

@Injectable()
@Resolver()
export class CMURegResolver {
  @Query(() => StudentInfo, { nullable: true })
  me(@User() studentInfo: StudentInfo) {
    return studentInfo
  }
}
