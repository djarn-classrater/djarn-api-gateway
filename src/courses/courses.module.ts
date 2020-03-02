import { Module } from '@nestjs/common'
import { CourseAPI } from './courses.service'
import { CoursesResolver } from './courses.resolver'
import { ReviewsService } from '../reviews/reviews.service'

@Module({
  providers: [CourseAPI, CoursesResolver, ReviewsService]
})
export class CoursesModule {}