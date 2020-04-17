import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import { RateType, RateSummary } from './rates.dto'
import { RateInput, UpdateRateArgs } from './rates.input'
import { IFilter, clean } from 'src/utils/clean'

@Injectable()
export class RatesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.RATE_HOST
  }

  async getRatings(filter?: IFilter): Promise<RateType[]> {
    return this.get('rates', clean(filter))
  }

  async getRating(id): Promise<RateType> {
    return this.get(`rates/${id}`)
  }

  async getRatingsummary(courseId: string): Promise<RateSummary> {
    return this.get(`rates/${courseId}/summary`)
  }

  async createRating(rates: RateInput): Promise<RateType> {
    return this.post('rates', { ...rates })
  }

  async updateRating({ id, rate }: UpdateRateArgs): Promise<void> {
    return this.patch(`rates/${id}`, { rating: rate })
  }
}
