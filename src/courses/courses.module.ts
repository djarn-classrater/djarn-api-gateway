import { Module } from '@nestjs/common'
import { CourseAPI } from './courses.service'
import { CoursesResolver } from './courses.resolver'
import { ReviewsAPI } from '../reviews/reviews.service'

@Module({
  providers: [CourseAPI, CoursesResolver, ReviewsAPI],
})
export class CoursesModule {}
