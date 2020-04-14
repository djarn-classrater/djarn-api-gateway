import { Injectable, UnauthorizedException } from '@nestjs/common'
import { StudentInfo, StudentInfoResponse } from './cmu-reg.dto'
import { DataSourceConfig } from 'apollo-datasource'
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { TContext } from 'src/app.module'

@Injectable()
export class CMURegService extends RESTDataSource<TContext> {
  private studentInfo: StudentInfo
  private status: number

  constructor() {
    super()
    this.baseURL = 'https://misapi.cmu.ac.th/cmuitaccount/v1/api/'
  }

  async initialize(config: DataSourceConfig<TContext>) {
    super.initialize(config)
    await this.authorization()
  }

  protected reducer(studentInfo: StudentInfoResponse): StudentInfo {
    return {
      studentId: studentInfo.student_id,
      firstNameTH: studentInfo.firstname_TH,
      firstNameEN: studentInfo.firstname_EN,
      lastNameTH: studentInfo.lastname_TH,
      lastNameEN: studentInfo.lastname_EN,
      organizationNameTH: studentInfo.organization_name_TH,
      organizationNameEN: studentInfo.organization_name_EN,
    }
  }

  willSendRequest(request: RequestOptions): void {
    const { authorization } = this.context.req.headers
    request.headers.set('Authorization', authorization)
  }

  /**
   * Retrive student information form cmu registration
   * @param req - Express request object
   * @requires authorization - bearer token type
   * @returns Student information
   * @throws Unauthorized exception when token expires
   */
  private async authorization() {
    try {
      if (this.context.req.headers.authorization) {
        const res = await this.get<StudentInfoResponse>(
          'cmuitaccount/basicinfo',
        )
        this.studentInfo = this.reducer(res)
      }
    } catch (e) {}
  }

  async getStudentInfo() {
    if (!this.studentInfo) throw new UnauthorizedException()
    return this.studentInfo
  }
}
