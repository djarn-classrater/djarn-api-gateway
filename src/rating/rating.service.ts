import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import _ from 'lodash'
import { RatingType } from './rating.dto'

@Injectable()
export class RatingAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.RATE_HOST
  }

  clean(obj) {
    return _.pickBy(obj, _.identity)
  }

  async getRatings(filter): Promise<RatingType[]> {
    return this.get('ratings', this.clean(filter))
  }

  async getRaitng(id): Promise<RatingType> {
    return this.get(`ratings/${id}`)
  }
}
