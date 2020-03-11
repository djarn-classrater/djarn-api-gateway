import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest'
import { ReviewType } from './reviews.dto'
import { ReviewInput } from './reviews.input'
import _ from 'lodash'

@Injectable()
export class ReviewsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.REVIEW_HOST
  }

  // remove undefined property in object
  clean(obj) {
    return _.pickBy(obj, _.identity)
  }

  async getReviews(filter): Promise<ReviewType[]> {
    return this.get('reviews', this.clean(filter))
  }

  async createReview(review: ReviewInput): Promise<ReviewType> {
    return this.post('reviews', { ...review })
  }
}
