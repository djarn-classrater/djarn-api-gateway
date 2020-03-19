import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import _ from 'lodash'
import { RateType } from './rates.dto'
import { RateInput } from './rates.input'

@Injectable()
export class RatesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.RATE_HOST
  }

  clean(obj) {
    return _.pickBy(obj, _.identity)
  }

  async getRatings(filter): Promise<RateType[]> {
    return this.get('rates', this.clean(filter))
  }

  async getRating(id): Promise<RateType> {
    return this.get(`rates/${id}`)
  }

  async createRating(rates: RateInput): Promise<RateType> {
    return this.post('rates', { ...rates })
  }
}
