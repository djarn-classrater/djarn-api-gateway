import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import { ReviewType } from './reviews.dto'
import { ReviewInput, UpdateReviewArgs } from './reviews.input'
import { clean, IFilter } from 'src/utils/clean'

@Injectable()
export class ReviewsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.REVIEW_HOST
  }

  async getReviews(filter?: IFilter): Promise<ReviewType[]> {
    return this.get('reviews', clean(filter))
  }

  async getReview(id): Promise<ReviewType> {
    return this.get(`reviews/${id}`)
  }

  async createReview(review: ReviewInput): Promise<ReviewType> {
    console.log(review)
    return this.post('reviews', { ...review })
  }

  async updateReview({ id, review }: UpdateReviewArgs): Promise<void> {
    return this.patch(`reviews/${id}`, { ...review })
  }
}
