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

  async getlike(id): Promise<LikeType> {
    return this.get(`likes/${id}`)
  }

  async createLike(like: LikeInput): Promise<LikeType> {
    return this.post('likes', { ...like })
  }
}
