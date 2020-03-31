import { Injectable, UnauthorizedException } from '@nestjs/common'
import { StudentInfo, StudentInfoResponse } from './cmu-reg.dto'
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { TContext } from 'src/app.module'

@Injectable()
export class CMURegService extends RESTDataSource<TContext> {
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
  async getStudentInfo() {
    try {
      const res = await this.get<StudentInfoResponse>(
        'https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo',
      )
      return this.reducer(res)
    } catch (e) {
      if (e.response.data.Message === 'Unauthorized')
        throw new UnauthorizedException()
    }
  }
}
