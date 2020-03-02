import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest'

@Injectable()
export class ReviewsService extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.REVIEW_HOST
  }

  async getReviews() {
    return this.get('reviews')
  }
}
