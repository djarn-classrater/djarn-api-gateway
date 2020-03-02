import { Module } from '@nestjs/common'
import { CourseAPI } from './courses.service'
import { CoursesResolver } from './courses.resolver'

@Module({
  providers: [CourseAPI, CoursesResolver]
})
export class CoursesModule {}