import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import { CourseType } from './courses.dto'

@Injectable()
export class CourseAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.COURSE_HOST
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
    if (!response.courseName) {
      throw Error(`Don't have any course at ${course_id}`)
    }
    return this.reducer({
      courseId: course_id,
      ...response,
    })
  }
}
