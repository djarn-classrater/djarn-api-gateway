import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'

@Injectable()
export class CourseAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.COURSE_HOST
  }

  reducer(response) {
    return {
      courseId: response.courseId,
      facultyName: response.facultyName,
      courseName: response.courseNameThai,
      courseDescription: response.courseDescriptionThai,
      courseCredit: response.courseCredit,
    }
  }

  async getCourse(courseId: string) {
    const response = await this.get(`course/${courseId}`)
    if (!response.courseName) {
      throw Error(`Don't have any course at ${courseId}`)
    }
    return this.reducer({
      courseId,
      ...response,
    })
  }
}
