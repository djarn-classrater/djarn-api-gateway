import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest'

@Injectable()
export class ReviewsService extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3001/'
  }

  async getReviews() {
    return this.get('reviews')
  }
}
