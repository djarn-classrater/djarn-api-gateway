import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import { CourseType } from './courses.dto'

@Injectable()
export class CourseAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:8080'
  }

  reducer(response): CourseType {
    return {
      course_id: response.courseId,
      faculty_name: response.facultyName,
      course_name: response.courseNameThai,
      course_description: response.courseDescriptionThai,
      course_credit: response.courseCredit,
    }
  }

  async getCourse(course_id) {
    const response = await this.get(`course/${course_id}`)
    return this.reducer({
      courseId: course_id,
      ...response,
    })
  }
}
