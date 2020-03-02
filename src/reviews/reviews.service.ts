import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest'
import _ from 'lodash'

@Injectable()
export class ReviewsService extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.REVIEW_HOST
  }

  // remove undefined property in object
  clean(obj) {
    return _.pickBy(obj, _.identity)
  }

  async getReviews(filter) {
    return this.get('reviews', this.clean(filter))
  }
}
