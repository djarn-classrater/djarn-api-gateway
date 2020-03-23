import { Injectable } from '@nestjs/common'
import { Resolver, Query, Context } from '@nestjs/graphql'
import { StudentInfo } from './cmu-reg.dto'
import { User } from '../cmu-reg/cmu-reg.decorator'
import { DataSources } from '../app.module'
import { UserType } from 'src/users/users.dto'

@Injectable()
@Resolver()
export class CMURegResolver {
  /**
   * Get student information with Authorization.
   * This method will intial student to users database.
   *
   * @param studentInfo - Student Information from CMU Registration
   * @returns Response GraphQL query
   */
  @Query(() => StudentInfo, { nullable: true })
  async me(
    @User() studentInfo: StudentInfo,
    @Context('dataSources') { usersAPI }: DataSources,
  ) {
    /**
     * Try to initial user informaion
     * 1. Query user information
     * 2. If doesn't have information try to post student information
     */
    let userInfo: UserType
    userInfo = await usersAPI.getUser(studentInfo.studentId)
    if (!userInfo) userInfo = await usersAPI.createUser(studentInfo as UserType)

    return userInfo
  }
}
