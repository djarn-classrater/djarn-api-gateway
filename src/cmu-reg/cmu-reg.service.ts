import { Injectable, HttpService, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { StudentInfo, StudentInfoResponse } from './cmu-reg.dto'

@Injectable()
export class CMURegService {
  constructor(private httpService: HttpService) {}

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

  async getStudentInfo(req: Request) {
    const { headers } = req
    try {
      const { data } = await this.httpService
        .get<StudentInfoResponse>(
          'https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo',
          {
            headers: {
              authorization: headers.authorization,
            },
          },
        )
        .toPromise()
      return this.reducer(data)
    } catch (e) {
      if (e.response.data.Message === 'Unauthorized')
        throw new UnauthorizedException()
    }
  }
}
