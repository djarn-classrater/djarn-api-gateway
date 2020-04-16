import { RESTDataSource } from 'apollo-datasource-rest'
import { Injectable } from '@nestjs/common'
import { LikeType } from './likes.dto'
import { LikeInput } from './likes.input'
import { IFilter, clean } from 'src/utils/clean'

@Injectable()
export class LikesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.LIKE_HOST
  }

  async getlikes(filter?: IFilter): Promise<LikeType[]> {
    return this.get('likes', clean(filter))
  }

  async getlike(id: number): Promise<LikeType>
  async getlike(studentId: string, reviewId: number): Promise<LikeType>

  async getlike(id: number | string, reviewId?: number): Promise<LikeType> {
    switch (typeof id) {
      case 'number':
        return this.get(`likes/${id}`)
      case 'string':
        const likes = await this.getlikes({ studentId: id, reviewId })
        return likes[0]
    }
  }

  async getLikeCount(reviewId: number): Promise<number> {
    const res = await this.get<{ count: number }>('likes/count', { reviewId })
    return res.count
  }

  async createLike(like: LikeInput): Promise<LikeType> {
    return this.post('likes', { ...like })
  }

  async deleteLike(likeId: number): Promise<void> {
    await this.delete(`likes/${likeId}`)
  }
}
