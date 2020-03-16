import { RESTDataSource } from 'apollo-datasource-rest'
import { Injectable } from '@nestjs/common'
import { LikeType } from './likes.dto'
import _ from 'lodash'
import { LikeInput } from './likes.input'

@Injectable()
export class LikesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.LIKE_HOST
  }

  clean(obj) {
    return _.pickBy(obj, _.identity)
  }

  async getlikes(filter?): Promise<LikeType[]> {
    return this.get('likes', this.clean(filter))
  }

  async getlike(id): Promise<LikeType> {
    return this.get(`likes/${id}`)
  }

  async createLike(like: LikeInput): Promise<LikeType> {
    return this.post('likes', { ...like })
  }
}
